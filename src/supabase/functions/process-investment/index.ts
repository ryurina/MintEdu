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

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get loan token ID
    const { data: loan, error: loanError } = await supabaseClient
      .from('loans')
      .select('token_id')
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

    // Check if token is already associated
    let isAssociated = false
    try {
      console.log('Checking token association for:', walletAddress)
      const accountInfo = await new AccountInfoQuery()
        .setAccountId(investorAccountId)
        .execute(client)
      
      const tokenRelationships = accountInfo.tokenRelationships
      
      // Iterate through the Map to find our token
      for (const [tokenKey, relationship] of tokenRelationships) {
        if (tokenKey.toString() === loan.token_id) {
          isAssociated = true
          console.log('Token is associated!')
          break
        }
      }
      
      console.log('Association check result:', isAssociated)
    } catch (error) {
      console.error('Error checking token association:', error.message)
    }

    // If not associated, return error with flag
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

    console.log('Investment processed:', transactionId)

    return new Response(
      JSON.stringify({ transactionId, success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Investment error:', error)
    
    // Check if error is due to token not associated
    if (error.message?.includes('TOKEN_NOT_ASSOCIATED_TO_ACCOUNT') || 
        error.status?._code === 184) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          needsAssociation: true,
          message: 'Token not associated with your account. Please associate it in your wallet first.'
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