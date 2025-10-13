import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import {
  Client,
  PrivateKey,
  AccountId,
  TransferTransaction,
  TokenId,
  TokenAssociateTransaction
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

    // Check if investor has associated the token, if not skip (they need to do it first)
    // In production, you'd want to handle token association here

    // Transfer tokens from treasury to investor
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
    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})