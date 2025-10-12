import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import {
  Client,
  PrivateKey,
  AccountId,
  TransferTransaction,
  TokenId
} from 'https://esm.sh/@hashgraph/sdk@2.40.0'

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

    // Initialize Hedera client
    const operatorId = AccountId.fromString(Deno.env.get('HEDERA_OPERATOR_ID')!)
    const operatorKey = PrivateKey.fromString(Deno.env.get('HEDERA_OPERATOR_KEY')!)
    
    const client = Client.forTestnet()
    client.setOperator(operatorId, operatorKey)

    // Get loan token ID from database
    // In real implementation, fetch from Supabase
    const tokenId = TokenId.fromString('0.0.12345') // Replace with actual query

    // Transfer tokens from treasury to investor
    const tokenTransferTx = await new TransferTransaction()
      .addTokenTransfer(tokenId, operatorId, -amount)
      .addTokenTransfer(tokenId, AccountId.fromString(walletAddress), amount)
      .freezeWith(client)
      .sign(operatorKey)

    const tokenTransferSubmit = await tokenTransferTx.execute(client)
    const tokenTransferRx = await tokenTransferSubmit.getReceipt(client)
    const transactionId = tokenTransferSubmit.transactionId.toString()

    return new Response(
      JSON.stringify({ transactionId, success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
