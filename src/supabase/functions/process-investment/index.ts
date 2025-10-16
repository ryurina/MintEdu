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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { loanId, amount, investorId, walletAddress } = await req.json()
    console.log('Processing investment:', { loanId, amount, walletAddress })

    // Initialize Supabase client with SERVICE ROLE KEY (bypasses RLS)
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get loan token ID and current amount
    const { data: loan, error: loanError } = await supabaseClient
      .from('loans')
      .select('token_id, amount, amount_raised')
      .eq('id', loanId)
      .single()

    if (loanError || !loan?.token_id) {
      throw new Error('Loan token not found')
    }

    console.log('Current loan data:', loan)

    // Initialize Hedera client
    const operatorId = AccountId.fromString(Deno.env.get('HEDERA_OPERATOR_ID')!)
    const operatorKey = PrivateKey.fromStringDer(Deno.env.get('HEDERA_OPERATOR_KEY')!)
    
    const client = Client.forTestnet()
    client.setOperator(operatorId, operatorKey)

    const tokenId = TokenId.fromString(loan.token_id)
    const investorAccountId = AccountId.fromString(walletAddress)

    // Check if token is associated
    let isAssociated = false
    try {
      console.log('Checking token association for:', walletAddress)
      const accountInfo = await new AccountInfoQuery()
        .setAccountId(investorAccountId)
        .execute(client)
      
      const tokenRelationships = accountInfo.tokenRelationships
      
      for (const [tokenKey] of tokenRelationships) {
        if (tokenKey.toString() === loan.token_id) {
          isAssociated = true
          console.log('Token is associated!')
          break
        }
      }
    } catch (error) {
      console.error('Error checking token association:', error.message)
    }

    if (!isAssociated) {
      console.log('Token not associated - returning error')
      return new Response(
        JSON.stringify({ 
          success: false, 
          needsAssociation: true,
          tokenId: loan.token_id,
          message: 'Please associate the token in your wallet first'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: 400 
        }
      )
    }

    // Transfer tokens from treasury to investor
    console.log('Transferring tokens...')
    const tokenTransferTx = new TransferTransaction()
      .addTokenTransfer(tokenId, operatorId, -amount)
      .addTokenTransfer(tokenId, investorAccountId, amount)
      .freezeWith(client)

    const signedTx = await tokenTransferTx.sign(operatorKey)
    const tokenTransferSubmit = await signedTx.execute(client)
    const tokenTransferRx = await tokenTransferSubmit.getReceipt(client)
    const transactionId = tokenTransferSubmit.transactionId.toString()

    console.log('Token transfer successful:', transactionId)

    // Record investment in database
    console.log('Recording investment...')
    const { error: investmentError } = await supabaseClient
      .from('investments')
      .insert({
        loan_id: loanId,
        investor_id: investorId,
        amount: amount,
        tokens_received: amount,
        transaction_id: transactionId
      })

    if (investmentError) {
      console.error('Failed to record investment:', investmentError)
      throw new Error(`Investment record failed: ${investmentError.message}`)
    }

    console.log('Investment recorded successfully')

    // Update loan amount_raised and status
    console.log('Updating loan amount_raised...')
    const currentRaised = parseFloat(loan.amount_raised) || 0
    const newAmountRaised = currentRaised + parseFloat(amount)
    const loanAmount = parseFloat(loan.amount)
    const newStatus = newAmountRaised >= loanAmount ? 'funded' : 'funding'

    console.log('Current raised:', currentRaised)
    console.log('New amount raised:', newAmountRaised)
    console.log('New status:', newStatus)

    const { data: updatedLoan, error: updateError } = await supabaseClient
      .from('loans')
      .update({ 
        amount_raised: newAmountRaised,
        status: newStatus
      })
      .eq('id', loanId)
      .select()

    if (updateError) {
      console.error('Failed to update loan:', updateError)
      throw new Error(`Loan update failed: ${updateError.message}`)
    }

    console.log('Loan updated successfully:', updatedLoan)

    return new Response(
      JSON.stringify({ 
        transactionId, 
        success: true,
        newAmountRaised,
        newStatus
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Investment error:', error)
    
    if (error.message?.includes('TOKEN_NOT_ASSOCIATED_TO_ACCOUNT') || 
        error.status?._code === 184) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          needsAssociation: true,
          message: 'Token not associated with your account.'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: 400 
        }
      )
    }

    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 400 
      }
    )
  }
})