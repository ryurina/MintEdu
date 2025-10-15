import { defineStore } from 'pinia'
import { ref } from 'vue'
import { HashConnect, HashConnectConnectionState } from 'hashconnect'
import { LedgerId, Client } from '@hashgraph/sdk'

const appMetadata = {
  name: 'MintEdu',
  description: 'Decentralized student loan platform powered by Hedera',
  icons: ['https://hedera.com/favicon.ico'],
  url: window.location.origin
}

export const useWalletStore = defineStore('wallet', () => {
  const pairingData = ref(null)
  const connectionStatus = ref(HashConnectConnectionState.Disconnected)
  const hashconnect = ref(null)
  const isInitialized = ref(false)
  const loading = ref(false)

  const connected = ref(false)
  const accountId = ref(null)

  const init = async () => {
    if (isInitialized.value && hashconnect.value) {
      console.log('HashConnect already initialized')
      return
    }

    try {
      console.log('Initializing HashConnect...')
      loading.value = true
      
      // Create the hashconnect instance
      const hc = new HashConnect(
        LedgerId.TESTNET,
        import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
        appMetadata,
        true // debug mode
      )

      // Register events
      hc.pairingEvent.on((newPairing) => {
        console.log('Pairing event:', newPairing)
        pairingData.value = newPairing
        connected.value = true
        accountId.value = newPairing.accountIds[0]
      })

      hc.disconnectionEvent.on((data) => {
        console.log('Disconnection event:', data)
        pairingData.value = null
        connected.value = false
        accountId.value = null
      })

      hc.connectionStatusChangeEvent.on((status) => {
        console.log('Connection status changed:', status)
        connectionStatus.value = status
        
        if (status === HashConnectConnectionState.Paired) {
          connected.value = true
        } else if (status === HashConnectConnectionState.Disconnected) {
          connected.value = false
          accountId.value = null
        }
      })

      // Initialize
      await hc.init()
      
      // Set the instance AFTER successful initialization
      hashconnect.value = hc
      isInitialized.value = true
      
      console.log('HashConnect initialized successfully')

      // Check for existing pairings
      const savedPairings = hc.pairings
      if (savedPairings && savedPairings.length > 0) {
        console.log('Found existing pairings:', savedPairings)
        pairingData.value = savedPairings[0]
        connected.value = true
        accountId.value = savedPairings[0].accountIds[0]
      }
    } catch (error) {
      console.error('Failed to initialize HashConnect:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const connectWallet = async () => {
    try {
      loading.value = true
      
      if (!hashconnect.value) {
        console.log('HashConnect not initialized, initializing now...')
        await init()
      }
      
      if (hashconnect.value) {
        console.log('Opening pairing modal...')
        await hashconnect.value.openPairingModal()
        return { success: true }
      } else {
        throw new Error('HashConnect failed to initialize')
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  const disconnectWallet = () => {
    if (hashconnect.value && pairingData.value) {
      hashconnect.value.disconnect(pairingData.value.topic)
      pairingData.value = null
      connected.value = false
      accountId.value = null
    }
  }

  const associateTokenViaEdge = async (tokenId) => {
  if (!hashconnect.value || !pairingData.value || !accountId.value) {
    throw new Error('Wallet not connected')
  }

  try {
    loading.value = true
    console.log('[associateTokenViaEdge] Associating token via Edge Function:', tokenId)

    // Step 1: Ask backend to build unsigned transaction
    const resp = await fetch(`${import.meta.env.VITE_SUPABASE_EDGE_URL}/build-tx`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountId: accountId.value, tokenId })
    })

    const { success, txBase64, error } = await resp.json()
    if (!success || !txBase64) throw new Error(error || 'Failed to build unsigned transaction')

    // Step 2: Decode base64 transaction bytes
    const txBytes = Uint8Array.from(atob(txBase64), (c) => c.charCodeAt(0))

    // Step 3: Ask HashPack to sign it (using HashConnect V3 signing API)
    console.log('[associateTokenViaEdge] Requesting signature from HashPack...')
    const signedTx = await hashconnect.value.signTransaction(
      pairingData.value.topic,
      accountId.value,
      txBytes
    )

    // Step 4: Encode signed tx and send back to Edge function for submission
    const signedBase64 = btoa(String.fromCharCode(...signedTx))

    const submitResp = await fetch(`${import.meta.env.VITE_SUPABASE_EDGE_URL}/submit-signed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        signedTxBase64: signedBase64,
        expectedPayer: accountId.value
      })
    })

    const submitResult = await submitResp.json()
    console.log('[associateTokenViaEdge] Submission result:', submitResult)

    if (!submitResult.success) throw new Error(submitResult.error || 'Failed to associate token')

    console.log('✅ Token associated successfully!')
    return { success: true, receipt: submitResult.receipt }
  } catch (err) {
    console.error('Token association via Edge failed:', err)
    return { success: false, error: err.message }
  } finally {
    loading.value = false
  }
}


  const associateToken = async (tokenId) => {
  if (!hashconnect.value || !pairingData.value || !accountId.value) {
    throw new Error('Wallet not connected')
  }

  try {
    loading.value = true
    console.log('=== TOKEN ASSOCIATION START ===')
    console.log('Token ID to associate:', tokenId)
    console.log('Account ID:', accountId.value)
    console.log('Pairing topic:', pairingData.value.topic)

    // Import Hedera SDK
    console.log('Importing Hedera SDK...')
    const { 
      TokenAssociateTransaction, 
      AccountId, 
      TokenId, 
      Client,
      TransactionId
    } = await import('@hashgraph/sdk')
    
    console.log('Creating client...')
    const client = Client.forTestnet()
    
    console.log('Parsing account ID...')
    const accountIdObj = AccountId.fromString(accountId.value)
    console.log('Account ID object:', accountIdObj.toString())
    
    console.log('Generating transaction ID...')
    const txId = TransactionId.generate(accountIdObj)
    console.log('Transaction ID:', txId.toString())
    
    console.log('Parsing token ID...')
    const tokenIdObj = TokenId.fromString(tokenId)
    console.log('Token ID object:', tokenIdObj.toString())
    
    console.log('Creating node account ID...')
    const nodeAccountId = AccountId.fromString('0.0.3')
    console.log('Node account ID:', nodeAccountId.toString())
    
    console.log('Building transaction...')
    const transaction = new TokenAssociateTransaction()
    
    console.log('Setting transaction ID...')
    transaction.setTransactionId(txId)
    
    console.log('Setting account ID...')
    transaction.setAccountId(accountIdObj)
    
    console.log('Setting token IDs...')
    transaction.setTokenIds([tokenIdObj])
    
    console.log('Setting node account IDs...')
    transaction.setNodeAccountIds([nodeAccountId])
    
    console.log('Freezing transaction...')
    await transaction.freezeWith(client)

    console.log('Converting to bytes...')
    const transactionBytes = transaction.toBytes()
    console.log('Transaction bytes length:', transactionBytes.length)

    console.log('Sending to HashConnect...')
    const signResponse = await hashconnect.value.sendTransaction(
      pairingData.value.topic,
      {
        topic: pairingData.value.topic,
        byteArray: transactionBytes,
        metadata: {
          accountToSign: accountId.value,
          returnTransaction: false,
          hideNft: false
        }
      }
    )

    console.log('Sign response:', signResponse)

    if (signResponse.success) {
      console.log('✅ Token associated successfully!')
      return { success: true, result: signResponse }
    } else {
      throw new Error(signResponse.error || 'Transaction failed')
    }
  } catch (error) {
    console.error('❌ Token association failed at:', error)
    console.error('Full error:', error)
    return { success: false, error: error.message }
  } finally {
    loading.value = false
  }
}

  // Auto-initialize on store creation
  init()

  return {
    pairingData,
    connectionStatus,
    hashconnect,
    isInitialized,
    loading,
    connected,
    accountId,
    init,
    connectWallet,
    disconnectWallet,
    associateToken
  }
})