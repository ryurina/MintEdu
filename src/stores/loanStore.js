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
      loans.value = data
    } catch (error) {
      console.error('Error fetching loans:', error)
    } finally {
      loading.value = false
    }
  }

  const createLoan = async (loanData) => {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('loans')
        .insert(loanData)
        .select()
        .single()

      if (error) throw error

      // Call edge function to create HTS token
      const { data: tokenData } = await supabase.functions.invoke('create-loan-token', {
        body: { loanId: data.id, amount: data.amount }
      })

      // Update loan with token_id
      if (tokenData?.tokenId) {
        console.log("Add token_id to supabase")
        await supabase
          .from('loans')
          .update({ token_id: tokenData.tokenId })
          .eq('id', data.id)
      }

      await fetchLoans()
      return { success: true, data }
    } catch (error) {
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

      if (error) throw error

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
        const newAmountRaised = loan.amount_raised + amount
        await supabase
          .from('loans')
          .update({ 
            amount_raised: newAmountRaised,
            status: newAmountRaised >= loan.amount ? 'funded' : 'funding'
          })
          .eq('id', loanId)
      }

      await fetchLoans()
      return { success: true }
    } catch (error) {
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
