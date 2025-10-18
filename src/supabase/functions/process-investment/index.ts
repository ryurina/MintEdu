import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import {
  Client,
  PrivateKey,
  AccountId,
  TransferTransaction,
  TokenId,
  AccountInfoQuery
} from 'npm:@hashgraph/sdk@^2.40.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// HBAR/USD rate - Update this regularly or fetch from an oracle
const HBAR_USD_RATE = 0.15 // 1 HBAR = $0.05 USD

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { loanId, amount, investorId, walletAddress, paymentTxId } = await req.json()
    console.log('Processing investment:', { loanId, amount, walletAddress, paymentTxId })

    // Calculate HBAR amount
    const hbarAmount = amount / HBAR_USD_RATE
    console.log(`Investment: $${amount} USD = ${hbarAmount} HBAR`)

    // Initialize Supabase client with SERVICE ROLE KEY
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get loan data
    const { data: loan, error: loanError } = await supabaseClient
      .from('loans')
      .select('token_id, amount, amount_raised')
      .eq('id', loanId)
      .single()

    if (loanError || !loan?.token_id) {
      throw new Error('Loan token not found')
    }

    // Initialize Hedera client
    const operatorId = AccountId.fromString(Deno.env.get('HEDERA_OPERATOR_ID')!)
    const operatorKey = PrivateKey.fromStringDer(Deno.env.get('HEDERA_OPERATOR_KEY')!)
    
    const client = Client.forTestnet()
    client.setOperator(operatorId, operatorKey)

    const tokenId = TokenId.fromString(loan.token_id)
    const investorAccountId = AccountId.fromString(walletAddress)

    // Check token association
    let isAssociated = false
    try {
      const accountInfo = await new AccountInfoQuery()
        .setAccountId(investorAccountId)
        .execute(client)
      
      for (const [tokenKey] of accountInfo.tokenRelationships) {
        if (tokenKey.toString() === loan.token_id) {
          isAssociated = true
          break
        }
      }
    } catch (error) {
      console.error('Error checking token association:', error.message)
    }

    if (!isAssociated) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          needsAssociation: true,
          tokenId: loan.token_id,
          hbarAmount,
          message: 'Please associate the token in your wallet first'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // If no payment transaction ID provided, return payment details
    if (!paymentTxId) {
      console.log('No payment yet, returning payment details')
      return new Response(
        JSON.stringify({ 
          success: false,
          requiresPayment: true,
          hbarAmount,
          tokenAmount: amount,
          tokenId: loan.token_id,
          treasuryAccount: operatorId.toString(),
          message: 'Payment required'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // If payment transaction provided, verify it and process investment
    console.log('Payment transaction provided:', paymentTxId)
    // TODO: Verify the payment transaction actually happened and amount is correct
    // For now, we trust the frontend (not production-ready)

    // Transfer tokens from treasury to investor
    console.log('Transferring tokens...')
    const tokenTransferTx = new TransferTransaction()
      .addTokenTransfer(tokenId, operatorId, -amount)
      .addTokenTransfer(tokenId, investorAccountId, amount)
      .freezeWith(client)

    const signedTx = await tokenTransferTx.sign(operatorKey)
    const tokenTransferSubmit = await signedTx.execute(client)
    await tokenTransferSubmit.getReceipt(client)
    const transactionId = tokenTransferSubmit.transactionId.toString()

    console.log('Token transfer successful:', transactionId)

    // Record investment
    await supabaseClient.from('investments').insert({
      loan_id: loanId,
      investor_id: investorId,
      amount: amount,
      tokens_received: amount,
      transaction_id: `${paymentTxId}|${transactionId}` // Store both payment and token transfer
    })

    // Update loan
    const currentRaised = parseFloat(loan.amount_raised) || 0
    const newAmountRaised = currentRaised + parseFloat(amount)
    const newStatus = newAmountRaised >= parseFloat(loan.amount) ? 'funded' : 'funding'

    await supabaseClient
      .from('loans')
      .update({ amount_raised: newAmountRaised, status: newStatus })
      .eq('id', loanId)

    console.log('Investment complete!')

    return new Response(
      JSON.stringify({ 
        transactionId, 
        paymentTxId,
        success: true,
        newAmountRaised,
        newStatus
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Investment error:', error)
    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})