import { defineStore } from 'pinia'
import { ref } from 'vue'
import { HashConnect, HashConnectConnectionState } from 'hashconnect'
import { LedgerId } from '@hashgraph/sdk'

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
    disconnectWallet
  }
})