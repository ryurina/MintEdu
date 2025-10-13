import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import {
  Client,
  PrivateKey,
  AccountId,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType
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
    const { loanId, amount } = await req.json()
    console.log('Creating token for loan:', loanId, 'amount:', amount)

    // Initialize Hedera client
    const operatorId = AccountId.fromString(Deno.env.get('HEDERA_OPERATOR_ID')!)
    const operatorKey = PrivateKey.fromStringDer(Deno.env.get('HEDERA_OPERATOR_KEY')!)
    
    const client = Client.forTestnet()
    client.setOperator(operatorId, operatorKey)

    // Create HTS token
    const tokenCreateTx = new TokenCreateTransaction()
      .setTokenName(`StudentLoan-${loanId.substring(0, 8)}`)
      .setTokenSymbol('SLOAN')
      .setTokenType(TokenType.FungibleCommon)
      .setDecimals(0)
      .setInitialSupply(amount)
      .setTreasuryAccountId(operatorId)
      .setSupplyType(TokenSupplyType.Finite)
      .setMaxSupply(amount)
      .setAdminKey(operatorKey)
      .setSupplyKey(operatorKey)
      .freezeWith(client)

    const signedTx = await tokenCreateTx.sign(operatorKey)
    const tokenCreateSubmit = await signedTx.execute(client)
    const tokenCreateRx = await tokenCreateSubmit.getReceipt(client)
    const tokenId = tokenCreateRx.tokenId?.toString()

    console.log('Token created successfully:', tokenId)

    return new Response(
      JSON.stringify({ tokenId, success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Token creation error:', error)
    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})