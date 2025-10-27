<template>
  <Transition name="toast">
    <div
      v-if="visible"
      :class="[
        'fixed top-6 right-6 z-50 max-w-md w-full',
        'bg-white rounded-2xl shadow-2xl border-2',
        'p-4 flex items-start gap-4',
        'transform transition-all duration-300',
        typeClasses,
      ]"
    >
      <!-- Icon -->
      <div
        :class="[
          'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
          iconBgClass,
        ]"
      >
        <svg
          v-if="type === 'success'"
          class="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <svg
          v-else-if="type === 'error'"
          class="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <svg
          v-else-if="type === 'warning'"
          class="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <svg
          v-else
          class="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-gray-900 mb-1">{{ title }}</h4>
        <p class="text-sm text-gray-600">{{ message }}</p>
      </div>

      <!-- Close Button -->
      <button
        @click="close"
        class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "success",
    validator: (value) =>
      ["success", "error", "warning", "info"].includes(value),
  },
  duration: {
    type: Number,
    default: 4000,
  },
});

const emit = defineEmits(["close"]);

const visible = ref(false);

const typeClasses = computed(() => {
  const classes = {
    success: "border-emerald-200",
    error: "border-red-200",
    warning: "border-yellow-200",
    info: "border-blue-200",
  };
  return classes[props.type];
});

const iconBgClass = computed(() => {
  const classes = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };
  return classes[props.type];
});

const close = () => {
  visible.value = false;
  setTimeout(() => {
    emit("close");
  }, 300);
};

onMounted(() => {
  visible.value = true;
  if (props.duration > 0) {
    setTimeout(() => {
      close();
    }, props.duration);
  }
});
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}
</style>
