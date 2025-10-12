<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-green-600">Investor Dashboard</h1>
        <div class="flex items-center gap-4">
          <WalletConnect />
          <button
            @click="authStore.signOut(); router.push('/')"
            class="text-gray-600 hover:text-gray-800"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>

    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-6 flex items-center">
          <svg class="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Available Loans
        </h2>

        <div v-if="availableLoans.length === 0" class="text-gray-600">
          No loans available for investment at the moment.
        </div>

        <div v-else class="grid md:grid-cols-2 gap-6">
          <div
            v-for="loan in availableLoans"
            :key="loan.id"
            class="border rounded-lg p-6 hover:shadow-lg transition"
          >
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="font-bold text-lg">{{ loan.student_name }}</h3>
                <p class="text-gray-600 text-sm">{{ loan.university }}</p>
              </div>
              <span :class="getStatusClass(loan.status)" class="px-3 py-1 rounded-full text-sm">
                {{ loan.status }}
              </span>
            </div>

            <div class="space-y-2 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Loan Amount:</span>
                <span class="font-semibold">${{ loan.amount }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Duration:</span>
                <span class="font-semibold">{{ loan.duration_months }} months</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Interest Rate:</span>
                <span class="font-semibold text-green-600">{{ loan.interest_rate }}%</span>
              </div>
            </div>

            <LoanProgress :loan="loan" />

            <div v-if="selectedLoan?.id === loan.id" class="mt-4 space-y-2">
              <input
                v-model="investmentAmount"
                type="number"
                placeholder="Amount to invest"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div class="flex gap-2">
                <button
                  @click="invest(loan)"
                  :disabled="loanStore.loading || !walletStore.connected"
                  class="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
                >
                  {{ loanStore.loading ? 'Processing...' : 'Confirm Investment' }}
                </button>
                <button
                  @click="selectedLoan = null; investmentAmount = ''"
                  class="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
            <button
              v-else
              @click="selectedLoan = loan"
              :disabled="!walletStore.connected"
              class="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
            >
              {{ walletStore.connected ? 'Invest Now' : 'Connect Wallet to Invest' }}
            </button>
          </div>
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
import LoanProgress from '../components/LoanProgress.vue'

const router = useRouter()
const authStore = useAuthStore()
const loanStore = useLoanStore()
const walletStore = useWalletStore()

const selectedLoan = ref(null)
const investmentAmount = ref('')

const availableLoans = computed(() => {
  return loanStore.loans.filter(loan => 
    loan.status === 'open' || loan.status === 'funding'
  )
})

const getStatusClass = (status) => {
  const classes = {
    open: 'bg-blue-100 text-blue-800',
    funding: 'bg-yellow-100 text-yellow-800',
    funded: 'bg-green-100 text-green-800',
    repaying: 'bg-purple-100 text-purple-800',
    completed: 'bg-gray-100 text-gray-800'
  }
  return classes[status] || classes.open
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
    alert(`Successfully invested ${investmentAmount.value}!`)
    investmentAmount.value = ''
    selectedLoan.value = null
  } else {
    alert(result.error)
  }
}

onMounted(() => {
  loanStore.fetchLoans()
})
</script>
