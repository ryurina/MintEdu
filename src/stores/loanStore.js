import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../composables/useSupabase'
import { useWalletStore } from './walletStore'


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
    const response = await supabase.functions.invoke('process-investment', {
      body: { loanId, amount, investorId, walletAddress }
    })

    console.log('=== RAW RESPONSE ===')
    console.log('response.data:', response.data)
    console.log('response.error:', response.error)
    console.log('response.response:', response.response)
    console.log('===================')

    // When Edge Function returns 400, we need to extract the JSON body
    if (response.error) {
      console.log('Error detected, extracting response body...')
      
      let errorBody = null
      
      // The actual response body is in response.response
      if (response.response) {
        try {
          // Clone the response to read it (can only read once)
          const responseClone = response.response.clone()
          errorBody = await responseClone.json()
          console.log('✅ Extracted error body:', errorBody)
        } catch (e) {
          console.error('Failed to parse response body:', e)
        }
      }

      // Check if we found the needsAssociation flag
      if (errorBody?.needsAssociation) {
        console.log('✅ ASSOCIATION NEEDED! Returning to show modal...')
        return { 
          success: false, 
          needsAssociation: true, 
          tokenId: errorBody.tokenId,
          error: errorBody.message || 'Token association required'
        }
      }

      // If we couldn't extract association info, throw the error
      console.log('❌ Could not extract association info, throwing error')
      throw response.error
    }

    // Success case - insert investment record
    console.log('✅ Investment successful, recording in database...')
    await supabase.from('investments').insert({
      loan_id: loanId,
      investor_id: investorId,
      amount,
      tokens_received: amount,
      transaction_id: response.data.transactionId
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
    console.error('Investment error caught:', error)
    return { success: false, error: error.message || 'Investment failed' }
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