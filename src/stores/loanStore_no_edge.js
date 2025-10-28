import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../composables/useSupabase'

// SET THIS TO true FOR TESTING WITHOUT EDGE FUNCTIONS
const MOCK_MODE = true

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

      if (MOCK_MODE) {
        // Mock token creation for testing
        console.log('MOCK MODE: Simulating token creation...')
        const mockTokenId = `0.0.${Math.floor(Math.random() * 100000)}`
        
        // Update loan with mock token_id
        await supabase
          .from('loans')
          .update({ token_id: mockTokenId })
          .eq('id', loan.id)
        
        console.log('Mock token created:', mockTokenId)
      } else {
        // Call edge function to create HTS token
        const { data: tokenData, error: tokenError } = await supabase.functions.invoke('create-loan-token', {
          body: { loanId: loan.id, amount: loan.amount }
        })

        if (tokenError) {
          console.error('Token creation error:', tokenError)
          throw tokenError
        }

        // Update loan with token_id
        if (tokenData?.tokenId) {
          await supabase
            .from('loans')
            .update({ token_id: tokenData.tokenId })
            .eq('id', loan.id)
        }
      }

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
      if (MOCK_MODE) {
        // Mock investment for testing
        console.log('MOCK MODE: Simulating investment...')
        const mockTransactionId = `0.0.${Math.floor(Math.random() * 100000)}@${Date.now()}`
        
        // Insert investment record
        await supabase.from('investments').insert({
          loan_id: loanId,
          investor_id: investorId,
          amount,
          tokens_received: amount,
          transaction_id: mockTransactionId
        })
        
        console.log('Mock investment created:', mockTransactionId)
      } else {
        // Call edge function to process investment
        const { data, error } = await supabase.functions.invoke('process-investment', {
          body: { loanId, amount, investorId, walletAddress }
        })

        if (error) throw error

        // Check if token association is needed
        if (data?.needsAssociation) {
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
      }

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
      
      // Check for token association error
      if (error.message?.includes('TOKEN_NOT_ASSOCIATED') || error.message?.includes('needsAssociation')) {
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
