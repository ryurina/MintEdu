import { ref } from 'vue'
import { HashConnect } from '@hashgraph/hashconnect'

const hashconnect = new HashConnect()
const connected = ref(false)
const accountId = ref(null)
const topic = ref('')

export function useHashConnect() {
  const init = async () => {
    const appMetadata = {
      name: 'Hedera Student Loans',
      description: 'Decentralized student loan platform',
      icon: 'https://example.com/icon.png',
      url: window.location.origin
    }

    await hashconnect.init(appMetadata, 'testnet', false)
  }

  const connect = async () => {
    await init()
    
    hashconnect.pairingEvent.on((pairingData) => {
      connected.value = true
      accountId.value = pairingData.accountIds[0]
    })

    hashconnect.disconnectionEvent.on(() => {
      connected.value = false
      accountId.value = null
    })

    const state = await hashconnect.connect()
    topic.value = state.topic
    
    return { topic: state.topic }
  }

  const disconnect = () => {
    hashconnect.disconnect(topic.value)
    connected.value = false
    accountId.value = null
  }

  return {
    hashconnect,
    connected,
    accountId,
    topic,
    connect,
    disconnect
  }
}
