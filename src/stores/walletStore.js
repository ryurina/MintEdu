import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useHashConnect } from '../composables/useHashConnect'

export const useWalletStore = defineStore('wallet', () => {
  const { connect, disconnect, connected, accountId } = useHashConnect()
  const loading = ref(false)

  const connectWallet = async () => {
    loading.value = true
    try {
      await connect()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  const disconnectWallet = () => {
    disconnect()
  }

  return {
    connected,
    accountId,
    loading,
    connectWallet,
    disconnectWallet
  }
})