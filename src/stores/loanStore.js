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
    console.log('=== STARTING INVESTMENT ===')
    console.log('Loan ID:', loanId)
    console.log('Amount: $', amount)

    // Step 1: Check if payment is required
    const checkResponse = await supabase.functions.invoke('process-investment', {
      body: { loanId, amount, investorId, walletAddress }
    })

    console.log('Check response:', checkResponse.data)

    // Handle errors
    if (checkResponse.error) {
      const responseClone = checkResponse.response?.clone()
      if (responseClone) {
        const errorBody = await responseClone.json()
        
        if (errorBody?.needsAssociation) {
          return { 
            success: false, 
            needsAssociation: true, 
            tokenId: errorBody.tokenId,
            error: errorBody.message
          }
        }
      }
      throw checkResponse.error
    }

    // Step 2: If payment required, process HBAR payment
    if (checkResponse.data?.requiresPayment) {
      const { hbarAmount, treasuryAccount } = checkResponse.data
      
      console.log(`💰 Payment required: ${hbarAmount} HBAR (~$${amount} USD)`)
      
      // Import wallet store
      const { useWalletStore } = await import('./walletStore')
      const walletStore = useWalletStore()
      
      // Send HBAR payment
      console.log('Requesting HBAR payment...')
      const paymentResult = await walletStore.sendHbarPayment(hbarAmount, treasuryAccount)
      
      if (!paymentResult.success) {
        throw new Error(paymentResult.error || 'Payment failed')
      }
      
      console.log('✅ Payment successful:', paymentResult.transactionId)
      
      // Step 3: Complete investment with payment proof
      console.log('Completing investment with payment proof...')
      const completeResponse = await supabase.functions.invoke('process-investment', {
        body: { 
          loanId, 
          amount, 
          investorId, 
          walletAddress,
          paymentTxId: paymentResult.transactionId
        }
      })
      
      if (completeResponse.error) {
        throw completeResponse.error
      }
      
      console.log('✅ Investment complete!')
      console.log('Payment TX:', paymentResult.transactionId)
      console.log('Token Transfer TX:', completeResponse.data.transactionId)
    } else {
      console.log('✅ Investment successful (no payment required)')
    }

    // Refresh loans
    await fetchLoans()

    console.log('=== INVESTMENT COMPLETE ===')
    return { success: true }
  } catch (error) {
    console.error('❌ Investment error:', error)
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