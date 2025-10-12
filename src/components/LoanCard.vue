<template>
  <div class="border rounded-lg p-6 hover:shadow-lg transition bg-white">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="font-bold text-lg">{{ loan.student_name }}</h3>
        <p class="text-gray-600 text-sm">{{ loan.university }}</p>
      </div>
      <span :class="getStatusClass(loan.status)" class="px-3 py-1 rounded-full text-sm flex items-center gap-1">
        <component :is="getStatusIcon(loan.status)" class="w-4 h-4" />
        {{ loan.status }}
      </span>
    </div>
    
    <div class="space-y-2 mb-4">
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Amount:</span>
        <span class="font-semibold">${{ loan.amount }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Duration:</span>
        <span class="font-semibold">{{ loan.duration_months }} months</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Interest:</span>
        <span class="font-semibold text-green-600">{{ loan.interest_rate }}%</span>
      </div>
      <div v-if="loan.token_id" class="flex justify-between text-sm">
        <span class="text-gray-600">Token ID:</span>
        <span class="font-mono text-xs">{{ loan.token_id }}</span>
      </div>
    </div>

    <LoanProgress :loan="loan" />
  </div>
</template>

<script setup>
import { h } from 'vue'
import LoanProgress from './LoanProgress.vue'

defineProps({
  loan: {
    type: Object,
    required: true
  }
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

const getStatusIcon = (status) => {
  const icons = {
    open: () => h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, 
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' })
    ),
    funding: () => h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' })
    ),
    funded: () => h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
    ),
    repaying: () => h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' })
    ),
    completed: () => h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
    )
  }
  return icons[status] || icons.open
}
</script>
