<template>
  <div class="mb-4">
    <div class="flex justify-between text-sm mb-2">
      <span class="text-gray-600">Raised: ${{ loan.amount_raised }}</span>
      <span class="text-gray-600">{{ percentage }}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2">
      <div
        class="h-2 rounded-full transition-all duration-500"
        :class="progressColor"
        :style="{ width: `${percentage}%` }"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  loan: {
    type: Object,
    required: true
  }
})

const percentage = computed(() => {
  return Math.min(Math.round((props.loan.amount_raised / props.loan.amount) * 100), 100)
})

const progressColor = computed(() => {
  if (percentage.value >= 100) return 'bg-green-600'
  if (percentage.value >= 50) return 'bg-yellow-600'
  return 'bg-blue-600'
})
</script>
