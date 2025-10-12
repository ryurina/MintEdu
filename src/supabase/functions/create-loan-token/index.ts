import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import {
  Client,
  PrivateKey,
  AccountId,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType
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
    const { loanId, amount } = await req.json()

    // Initialize Hedera client
    const operatorId = AccountId.fromString(Deno.env.get('HEDERA_OPERATOR_ID')!)
    const operatorKey = PrivateKey.fromString(Deno.env.get('HEDERA_OPERATOR_KEY')!)
    
    const client = Client.forTestnet()
    client.setOperator(operatorId, operatorKey)

    // Create HTS token
    const tokenCreateTx = await new TokenCreateTransaction()
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
      .sign(operatorKey)

    const tokenCreateSubmit = await tokenCreateTx.execute(client)
    const tokenCreateRx = await tokenCreateSubmit.getReceipt(client)
    const tokenId = tokenCreateRx.tokenId.toString()

    return new Response(
      JSON.stringify({ tokenId, success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
