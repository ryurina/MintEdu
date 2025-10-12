<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-blue-600">Browse Loans</h1>
        <router-link to="/" class="text-gray-600 hover:text-gray-800">
          ← Back to Home
        </router-link>
      </div>
    </nav>

    <div class="container mx-auto px-4 py-8">
      <div v-if="loanStore.loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="loanStore.loans.length === 0" class="text-center py-12 text-gray-600">
        No loans available yet.
      </div>

      <div v-else class="grid md:grid-cols-3 gap-6">
        <LoanCard
          v-for="loan in loanStore.loans"
          :key="loan.id"
          :loan="loan"
          :show-invest="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLoanStore } from '../stores/loanStore'
import LoanCard from '../components/LoanCard.vue'

const loanStore = useLoanStore()

onMounted(() => {
  loanStore.fetchLoans()
})
</script>
