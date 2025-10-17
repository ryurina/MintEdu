<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="border-b border-gray-100">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">Investor Dashboard</h1>
              <p class="text-sm text-gray-500">{{ authStore.profile?.email }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <WalletConnect />
            <router-link to="/" class="text-gray-600 hover:text-emerald-500 transition font-medium">
              Home
            </router-link>
            <button
              @click="authStore.signOut(); router.push('/')"
              class="px-4 py-2 text-gray-600 hover:text-gray-900 transition font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="container mx-auto px-6 py-12">
      <!-- Header Stats -->
      <div class="mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-8">
          Investment <span class="text-emerald-500">Opportunities</span>
        </h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div class="p-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50">
            <div class="text-sm text-gray-500 mb-1 uppercase tracking-wide">Available Loans</div>
            <div class="text-3xl font-bold text-gray-900">{{ availableLoans.length }}</div>
          </div>
          <div class="p-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50">
            <div class="text-sm text-gray-500 mb-1 uppercase tracking-wide">Total Volume</div>
            <div class="text-3xl font-bold text-emerald-500">${{ totalVolume }}</div>
          </div>
          <div class="p-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50">
            <div class="text-sm text-gray-500 mb-1 uppercase tracking-wide">Avg. Interest</div>
            <div class="text-3xl font-bold text-gray-900">{{ avgInterest }}%</div>
          </div>
          <div class="p-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50">
            <div class="text-sm text-gray-500 mb-1 uppercase tracking-wide">Wallet</div>
            <div class="text-lg font-bold text-emerald-500">
              {{ walletStore.connected ? 'Connected' : 'Not Connected' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State - No Wallet -->
      <div v-if="!walletStore.connected" class="flex flex-col items-center justify-center py-20 px-4 rounded-3xl border-2 border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div class="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">Connect Your Wallet</h3>
        <p class="text-gray-600 mb-8 text-center max-w-md">Connect your HashPack wallet to start investing in student loans and earning returns</p>
        <WalletConnect />
      </div>

      <!-- Empty State - No Loans -->
      <div v-else-if="availableLoans.length === 0" class="flex flex-col items-center justify-center py-20 px-4 rounded-3xl border-2 border-dashed border-gray-200">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">No Loans Available</h3>
        <p class="text-gray-600 mb-8">Check back soon for new investment opportunities</p>
        <router-link to="/browse" class="px-6 py-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition font-medium">
          Browse All Loans
        </router-link>
      </div>

      <!-- Loans Grid -->
      <div v-else>
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Active Opportunities</h3>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div
            v-for="loan in availableLoans"
            :key="loan.id"
            class="group p-6 rounded-2xl border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300 bg-white hover:shadow-lg"
          >
            <!-- Header -->
            <div class="flex justify-between items-start mb-6">
              <div>
                <h4 class="text-xl font-bold text-gray-900 mb-1">{{ loan.student_name }}</h4>
                <p class="text-gray-500 text-sm">{{ loan.university }}</p>
              </div>
              <span 
                :class="getStatusClass(loan.status)"
                class="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
              >
                {{ loan.status }}
              </span>
            </div>

            <!-- Investment Info -->
            <div class="mb-6 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
              <div class="flex items-baseline gap-2 mb-2">
                <span class="text-3xl font-bold text-gray-900">${{ loan.amount }}</span>
                <span class="text-gray-500 text-sm">requested</span>
              </div>
              <div class="flex items-center gap-4 text-sm">
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-gray-600">{{ loan.duration_months }}mo</span>
                </div>
                <span class="text-gray-300">•</span>
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span class="text-emerald-600 font-semibold">{{ loan.interest_rate }}% APR</span>
                </div>
              </div>
            </div>

            <!-- Progress -->
            <div class="mb-6">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-500">Funding Progress</span>
                <span class="font-semibold text-gray-900">{{ getProgress(loan) }}%</span>
              </div>
              <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
                  :style="{ width: `${getProgress(loan)}%` }"
                ></div>
              </div>
              <div class="flex justify-between text-xs mt-1 text-gray-500">
                <span>${{ loan.amount_raised || 0 }} raised</span>
                <span>${{ loan.amount - (loan.amount_raised || 0) }} remaining</span>
              </div>
            </div>

            <!-- Token Info -->
            <div v-if="loan.token_id" class="p-3 bg-gray-50 rounded-xl mb-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span class="text-xs text-gray-500 font-medium">HTS Token</span>
                </div>
                <a 
                  :href="`https://hashscan.io/testnet/token/${loan.token_id}`"
                  target="_blank"
                  class="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  View →
                </a>
              </div>
            </div>

            <!-- Investment Input -->
            <div v-if="selectedLoan?.id === loan.id" class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Investment Amount</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                  <input
                    v-model="investmentAmount"
                    type="number"
                    placeholder="Enter amount"
                    class="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div class="flex gap-2">
                <button
                  @click="invest(loan)"
                  :disabled="loanStore.loading || !walletStore.connected"
                  class="flex-1 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition font-semibold disabled:bg-gray-300"
                >
                  {{ loanStore.loading ? 'Processing...' : 'Confirm Investment' }}
                </button>
                <button
                  @click="selectedLoan = null; investmentAmount = ''"
                  class="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>

            <!-- Invest Button -->
            <button
              v-else
              @click="selectedLoan = loan"
              :disabled="!walletStore.connected"
              class="w-full py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed group-hover:scale-105 transform duration-200"
            >
              {{ walletStore.connected ? 'Invest Now' : 'Connect Wallet First' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Token Association Modal -->
    <div v-if="showAssociationModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Token Association Required</h2>
        <p class="text-gray-600 mb-6">One-time setup to receive loan tokens</p>

        <!-- Token ID -->
        <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl mb-6">
          <div class="text-sm text-emerald-700 font-semibold mb-2 uppercase tracking-wide">Token ID</div>
          <div class="flex items-center gap-3">
            <code class="flex-1 text-sm font-mono text-gray-900 bg-white px-3 py-2 rounded-lg">
              {{ pendingAssociation?.tokenId }}
            </code>
            <button
              @click="copyTokenId"
              class="px-4 py-2 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600 transition font-medium"
            >
              Copy
            </button>
          </div>
        </div>

        <!-- Instructions -->
        <div class="space-y-4 mb-8">
          <h3 class="font-bold text-gray-900 text-lg">Follow These Steps:</h3>
          
          <div v-for="(step, index) in associationSteps" :key="index" class="flex gap-4">
            <div class="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              {{ index + 1 }}
            </div>
            <div class="flex-1">
              <p class="font-semibold text-gray-900 mb-1">{{ step.title }}</p>
              <p class="text-sm text-gray-600">{{ step.description }}</p>
            </div>
          </div>
        </div>

        <!-- Warning -->
        <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-2xl mb-6">
          <div class="flex gap-3">
            <svg class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <div>
              <p class="font-semibold text-yellow-900 text-sm">Association Fee: ~0.05 HBAR</p>
              <p class="text-sm text-yellow-800">You only need to associate each token once</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
          <button
            @click="retryInvestment"
            class="flex-1 py-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition font-semibold"
          >
            ✓ I've Associated - Continue
          </button>
          <button
            @click="showAssociationModal = false; pendingAssociation = null"
            class="px-6 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium"
          >
            Cancel
          </button>
        </div>

        <!-- Links -->
        <div class="mt-6 flex gap-6 justify-center text-sm">
          <a
            :href="`https://hashscan.io/testnet/token/${pendingAssociation?.tokenId}`"
            target="_blank"
            rel="noopener noreferrer"
            class="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            View on HashScan →
          </a>
          <a
            href="https://www.hashpack.app/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Get HashPack →
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useLoanStore } from '../stores/loanStore'
import { useWalletStore } from '../stores/walletStore'
import WalletConnect from '../components/WalletConnect.vue'

const router = useRouter()
const authStore = useAuthStore()
const loanStore = useLoanStore()
const walletStore = useWalletStore()

const selectedLoan = ref(null)
const investmentAmount = ref('')
const showAssociationModal = ref(false)
const pendingAssociation = ref(null)

const associationSteps = [
  { title: 'Open HashPack Wallet', description: 'Launch your HashPack browser extension or mobile app' },
  { title: 'Go to Tokens Tab', description: 'Navigate to the "Tokens" section in your wallet' },
  { title: 'Click "Associate Token"', description: 'Look for the "+" or "Associate Token" button' },
  { title: 'Paste Token ID', description: 'Copy the token ID above and paste it in HashPack' },
  { title: 'Confirm Transaction', description: 'Approve the association (~0.05 HBAR fee)' },
  { title: 'Return & Continue', description: 'Come back here and click "I\'ve Associated"' }
]

const availableLoans = computed(() => {
  return loanStore.loans.filter(loan => loan.status === 'open' || loan.status === 'funding')
})

const totalVolume = computed(() => {
  return availableLoans.value.reduce((sum, loan) => sum + parseFloat(loan.amount), 0).toFixed(0)
})

const avgInterest = computed(() => {
  if (availableLoans.value.length === 0) return 0
  const total = availableLoans.value.reduce((sum, loan) => sum + parseFloat(loan.interest_rate), 0)
  return (total / availableLoans.value.length).toFixed(1)
})

const getStatusClass = (status) => {
  const classes = {
    open: 'bg-blue-100 text-blue-700',
    funding: 'bg-yellow-100 text-yellow-700',
    funded: 'bg-emerald-100 text-emerald-700',
    repaying: 'bg-purple-100 text-purple-700',
    completed: 'bg-gray-100 text-gray-700'
  }
  return classes[status] || classes.open
}

const getProgress = (loan) => {
  const progress = (parseFloat(loan.amount_raised || 0) / parseFloat(loan.amount)) * 100
  return Math.min(Math.round(progress), 100)
}

const copyTokenId = () => {
  if (pendingAssociation.value?.tokenId) {
    navigator.clipboard.writeText(pendingAssociation.value.tokenId)
    alert('✓ Token ID copied to clipboard!')
  }
}

const retryInvestment = async () => {
  if (!pendingAssociation.value) return
  
  showAssociationModal.value = false
  await invest(pendingAssociation.value.loan)
  pendingAssociation.value = null
}

const invest = async (loan) => {
  if (!walletStore.connected) {
    alert('Please connect your wallet first')
    return
  }

  if (!investmentAmount.value || parseFloat(investmentAmount.value) <= 0) {
    alert('Please enter a valid amount')
    return
  }

  const result = await loanStore.investInLoan(
    loan.id,
    parseFloat(investmentAmount.value),
    authStore.user.id,
    walletStore.accountId
  )

  if (result.success) {
    alert(`🎉 Successfully invested $${investmentAmount.value}!`)
    investmentAmount.value = ''
    selectedLoan.value = null
  } else if (result.needsAssociation) {
    pendingAssociation.value = { loan, tokenId: loan.token_id }
    showAssociationModal.value = true
  } else {
    alert(result.error || 'Investment failed')
  }
}

onMounted(() => {
  loanStore.fetchLoans()
})
</script>