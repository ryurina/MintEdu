import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../composables/useSupabase'

export const useLoanStore = defineStore('loan', () => {
  const loans = ref([])
  const loading = ref(false)

  const fetchLoans = async () => {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('loans')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      loans.value = data || []
    } catch (error) {
      console.error('Error fetching loans:', error)
    } finally {
      loading.value = false
    }
  }

  const createLoan = async (loanData) => {
    loading.value = true
    try {
      // Insert loan first
      const { data: loan, error: loanError } = await supabase
        .from('loans')
        .insert(loanData)
        .select()
        .single()

      if (loanError) throw loanError

      // Call edge function to create token and update database
      const { data: tokenData, error: tokenError } = await supabase.functions.invoke('create-loan-token', {
        body: { loanId: loan.id, amount: loan.amount }
      })

      if (tokenError) {
        console.error('Token creation error:', tokenError)
        throw tokenError
      }

      console.log('Edge function completed:', tokenData)

      await fetchLoans()
      return { success: true, data: loan }
    } catch (error) {
      console.error('Create loan error:', error)
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  const investInLoan = async (loanId, amount, investorId, walletAddress) => {
    loading.value = true
    try {
      // Call edge function to process investment
      const { data, error } = await supabase.functions.invoke('process-investment', {
        body: { loanId, amount, investorId, walletAddress }
      })

      console.log('Edge function response:', { data, error })

      // Check error.context for needsAssociation flag
      if (error) {
        console.error('Edge function error:', error)
        
        // Try to parse the error context
        let errorData = null
        try {
          if (error.context) {
            errorData = typeof error.context === 'string' 
              ? JSON.parse(error.context) 
              : error.context
          }
        } catch (e) {
          console.error('Failed to parse error context:', e)
        }

        console.log('Parsed error data:', errorData)

        // Check if token association is needed
        if (errorData?.needsAssociation) {
          console.log('Token association required')
          return { 
            success: false, 
            needsAssociation: true, 
            tokenId: errorData.tokenId,
            error: errorData.message || 'Token association required'
          }
        }

        throw error
      }

      // Check data for needsAssociation (shouldn't happen with 400, but just in case)
      if (data?.needsAssociation) {
        console.log('Token association required (from data)')
        return { 
          success: false, 
          needsAssociation: true, 
          tokenId: data.tokenId,
          error: data.message || 'Token association required'
        }
      }

      // Insert investment record
      await supabase.from('investments').insert({
        loan_id: loanId,
        investor_id: investorId,
        amount,
        tokens_received: amount,
        transaction_id: data.transactionId
      })

      // Update loan amount_raised
      const loan = loans.value.find(l => l.id === loanId)
      if (loan) {
        const newAmountRaised = (loan.amount_raised || 0) + amount
        const newStatus = newAmountRaised >= loan.amount ? 'funded' : 'funding'
        
        await supabase
          .from('loans')
          .update({ 
            amount_raised: newAmountRaised,
            status: newStatus
          })
          .eq('id', loanId)
      }

      await fetchLoans()
      return { success: true }
    } catch (error) {
      console.error('Investment error:', error)
      
      // Try one more time to parse error for association info
      let errorData = null
      try {
        if (error.context) {
          errorData = typeof error.context === 'string' 
            ? JSON.parse(error.context) 
            : error.context
        }
      } catch (e) {
        // Ignore parse errors
      }

      if (errorData?.needsAssociation) {
        return { 
          success: false, 
          needsAssociation: true,
          tokenId: errorData.tokenId,
          error: errorData.message || 'Token association required'
        }
      }
      
      // Check for token association error in the error message
      if (error.message?.includes('TOKEN_NOT_ASSOCIATED') || 
          error.message?.includes('needsAssociation')) {
        return { 
          success: false, 
          needsAssociation: true,
          error: 'Please associate the loan token with your wallet first'
        }
      }
      
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  return {
    loans,
    loading,
    fetchLoans,
    createLoan,
    investInLoan
  }
})