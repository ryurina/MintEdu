<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-blue-600">Student Dashboard</h1>
        <button
          @click="authStore.signOut(); router.push('/')"
          class="text-gray-600 hover:text-gray-800"
        >
          Sign Out
        </button>
      </div>
    </nav>

    <div class="container mx-auto px-4 py-8">
      <!-- Loan Application Form -->
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold mb-6 flex items-center">
          <svg class="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Apply for Loan
        </h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="block text-gray-700 mb-2">Loan Amount (USD)</label>
            <input
              v-model="loanForm.amount"
              type="number"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1200"
            />
          </div>
          <div>
            <label class="block text-gray-700 mb-2">Duration (Months)</label>
            <input
              v-model="loanForm.duration_months"
              type="number"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="24"
            />
          </div>
          <div>
            <label class="block text-gray-700 mb-2">University</label>
            <input
              v-model="loanForm.university"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="MIT"
            />
          </div>
          <div>
            <label class="block text-gray-700 mb-2">Interest Rate (%)</label>
            <input
              v-model="loanForm.interest_rate"
              type="number"
              step="0.1"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          @click="submitLoan"
          :disabled="loanStore.loading"
          class="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {{ loanStore.loading ? 'Processing...' : 'Submit Application' }}
        </button>
      </div>

      <!-- My Loans -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-6">My Loans</h2>
        <div v-if="myLoans.length === 0" class="text-gray-600">
          No loans yet. Apply for your first loan above!
        </div>
        <div v-else class="space-y-4">
          <LoanCard
            v-for="loan in myLoans"
            :key="loan.id"
            :loan="loan"
          />
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
import LoanCard from '../components/LoanCard.vue'

const router = useRouter()
const authStore = useAuthStore()
const loanStore = useLoanStore()

const loanForm = ref({
  amount: '',
  duration_months: '',
  university: '',
  interest_rate: 5
})

const myLoans = computed(() => {
  return loanStore.loans.filter(loan => loan.student_id === authStore.user?.id)
})

const submitLoan = async () => {
  if (!loanForm.value.amount || !loanForm.value.duration_months || !loanForm.value.university) {
    alert('Please fill all fields')
    return
  }

  const result = await loanStore.createLoan({
    student_id: authStore.user.id,
    student_name: authStore.profile.email.split('@')[0],
    amount: parseFloat(loanForm.value.amount),
    duration_months: parseInt(loanForm.value.duration_months),
    university: loanForm.value.university,
    interest_rate: parseFloat(loanForm.value.interest_rate)
  })

  if (result.success) {
    loanForm.value = { amount: '', duration_months: '', university: '', interest_rate: 5 }
    alert('Loan application submitted successfully!')
  } else {
    alert(result.error)
  }
}

onMounted(() => {
  loanStore.fetchLoans()
})
</script>
