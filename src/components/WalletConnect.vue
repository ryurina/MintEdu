<template>
  <div>
    <button
      v-if="!walletStore.connected"
      @click="connect"
      :disabled="walletStore.loading"
      class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 flex items-center gap-2"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
      {{ walletStore.loading ? 'Connecting...' : 'Connect Wallet' }}
    </button>

    <div v-else class="flex items-center gap-2">
      <span class="text-sm text-gray-600 flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
        <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        {{ truncateAddress(walletStore.accountId) }}
      </span>
      <button
        @click="walletStore.disconnectWallet"
        class="text-sm text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100"
      >
        Disconnect
      </button>
    </div>
  </div>
</template>

<script setup>
import { useWalletStore } from '../stores/walletStore'

const walletStore = useWalletStore()

const connect = async () => {
  const result = await walletStore.connectWallet()
  if (!result.success) {
    alert(result.error || 'Failed to connect wallet')
  }
}

const truncateAddress = (address) => {
  if (!address) return ''
  return `${address.slice(0, 7)}...${address.slice(-5)}`
}
</script>
