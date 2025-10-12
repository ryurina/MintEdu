import { ref } from 'vue'
import { HashConnect } from '@hashgraph/hashconnect'

const hashconnect = ref(null)
const connected = ref(false)
const accountId = ref(null)
const topic = ref('')
const pairingString = ref('')

export function useHashConnect() {
  const init = async () => {
    if (hashconnect.value) return

    hashconnect.value = new HashConnect(true) // true for debug mode

    const appMetadata = {
      name: 'Hedera Student Loans',
      description: 'Decentralized student loan platform',
      icon: 'https://absolute.url/to/icon.png',
      url: window.location.origin
    }

    // Initialize HashConnect
    const initData = await hashconnect.value.init(appMetadata, 'testnet', false)
    topic.value = initData.topic

    // Set up pairing event listener
    hashconnect.value.pairingEvent.on((pairingData) => {
      console.log('Pairing event:', pairingData)
      connected.value = true
      accountId.value = pairingData.accountIds[0]
    })

    // Set up disconnection event listener
    hashconnect.value.disconnectionEvent.on(() => {
      console.log('Wallet disconnected')
      connected.value = false
      accountId.value = null
    })

    return initData
  }

  const connect = async () => {
    try {
      const initData = await init()
      
      // Generate pairing string for QR code or deep link
      pairingString.value = hashconnect.value.generatePairingString(
        initData.topic,
        'testnet',
        false
      )

      // For mobile: open HashPack app directly
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = `https://hashpack.app/connect?pairingString=${pairingString.value}`
      } else {
        // For desktop: show pairing string for extension
        console.log('Pairing String:', pairingString.value)
        alert(`HashPack Extension: Please approve the connection request in your HashPack wallet`)
      }

      return { 
        topic: initData.topic, 
        pairingString: pairingString.value 
      }
    } catch (error) {
      console.error('HashConnect error:', error)
      throw error
    }
  }

  const disconnect = () => {
    if (hashconnect.value && topic.value) {
      hashconnect.value.disconnect(topic.value)
      connected.value = false
      accountId.value = null
    }
  }

  return {
    hashconnect,
    connected,
    accountId,
    topic,
    pairingString,
    connect,
    disconnect
  }
}
