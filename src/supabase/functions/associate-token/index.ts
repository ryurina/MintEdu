import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { loanId } = await req.json()
    console.log('Getting token association info for loan:', loanId)

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get loan token ID
    const { data: loan, error: loanError } = await supabaseClient
      .from('loans')
      .select('token_id, student_name, amount')
      .eq('id', loanId)
      .single()

    if (loanError || !loan?.token_id) {
      throw new Error('Loan token not found')
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        tokenId: loan.token_id,
        loanInfo: {
          student: loan.student_name,
          amount: loan.amount
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
