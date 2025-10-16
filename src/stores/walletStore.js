import { defineStore } from 'pinia'
import { ref } from 'vue'
import { HashConnect, HashConnectConnectionState } from 'hashconnect'
import { LedgerId, TransferTransaction, AccountId, Hbar } from '@hashgraph/sdk'

const appMetadata = {
  name: 'Hedera Student Loans',
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
      
      const hc = new HashConnect(
        LedgerId.TESTNET,
        import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
        appMetadata,
        true
      )

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

      await hc.init()
      hashconnect.value = hc
      isInitialized.value = true
      
      console.log('HashConnect initialized successfully')

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
        await init()
      }
      
      if (hashconnect.value) {
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

  // Send HBAR payment for investment (HashConnect v3)
  const sendHbarPayment = async (hbarAmount, treasuryAccount) => {
    if (!hashconnect.value || !pairingData.value || !accountId.value) {
      throw new Error('Wallet not connected')
    }

    try {
      loading.value = true
      console.log(`Sending ${hbarAmount} HBAR to ${treasuryAccount}`)

      const signer = hashconnect.value.getSigner(AccountId.fromString(accountId.value))
      
      // Build and freeze HBAR transfer transaction
      const transaction = await new TransferTransaction()
        .addHbarTransfer(accountId.value, new Hbar(-hbarAmount))
        .addHbarTransfer(treasuryAccount, new Hbar(hbarAmount))
        .freezeWithSigner(signer)
      
      console.log('Requesting payment signature from wallet...')
      
      // Execute transaction with HashConnect signer
      const response = await transaction.executeWithSigner(signer)
      
      console.log('Transaction submitted:', response)
      
      // Wait for receipt
      const receipt = await response.getReceiptWithSigner(signer)
      
      console.log('Payment receipt:', receipt)
      console.log('Payment successful! Transaction ID:', response.transactionId.toString())
      
      return { 
        success: true, 
        transactionId: response.transactionId.toString() 
      }
    } catch (error) {
      console.error('Payment failed:', error)
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

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
    sendHbarPayment
  }
})