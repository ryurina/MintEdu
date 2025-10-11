<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">
          MintEdu
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Decentralized education financing powered by Hedera
        </p>
      </div>

      <div v-if="!authStore.user" class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <!-- Student Card -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold mb-4">For Students</h2>
          <p class="text-gray-600 mb-6">
            Apply for student loans backed by community investors
          </p>
          <button
            @click="showAuthModal('student')"
            class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>

        <!-- Investor Card -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold mb-4">For Investors</h2>
          <p class="text-gray-600 mb-6">
            Invest in student education and earn returns
          </p>
          <button
            @click="showAuthModal('investor')"
            class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Start Investing
          </button>
        </div>
      </div>

      <div v-else class="text-center">
        <button
          @click="navigateToDashboard"
          class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </button>
      </div>

      <div class="mt-16 text-center">
        <router-link
          to="/browse"
          class="text-blue-600 hover:text-blue-800 font-semibold"
        >
          Browse Available Loans →
        </router-link>
      </div>
    </div>

    <!-- Auth Modal -->
    <div v-if="showAuth" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 class="text-3xl font-bold mb-6 text-center">
          {{ authMode === 'signin' ? 'Sign In' : 'Sign Up' }} as {{ selectedRole }}
        </h2>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-700 mb-2">Email</label>
            <input
              v-model="email"
              type="email"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label class="block text-gray-700 mb-2">Password</label>
            <input
              v-model="password"
              type="password"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            @click="handleAuth"
            :disabled="authStore.loading"
            class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {{ authStore.loading ? 'Processing...' : (authMode === 'signin' ? 'Sign In' : 'Sign Up') }}
          </button>
          <button
            @click="authMode = authMode === 'signin' ? 'signup' : 'signin'"
            class="w-full text-gray-600 hover:text-gray-800"
          >
            {{ authMode === 'signin' ? 'Need an account? Sign Up' : 'Have an account? Sign In' }}
          </button>
          <button
            @click="showAuth = false"
            class="w-full text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const showAuth = ref(false)
const authMode = ref('signup')
const selectedRole = ref('')
const email = ref('')
const password = ref('')

const showAuthModal = (role) => {
  selectedRole.value = role
  showAuth.value = true
  authMode.value = 'signup'
}

const handleAuth = async () => {
  const result = authMode.value === 'signin'
    ? await authStore.signIn(email.value, password.value)
    : await authStore.signUp(email.value, password.value, selectedRole.value)

  if (result.success) {
    showAuth.value = false
    router.push(selectedRole.value === 'student' ? '/student' : '/investor')
  } else {
    alert(result.error)
  }
}

const navigateToDashboard = () => {
  if (authStore.profile?.role === 'student') {
    router.push('/student')
  } else {
    router.push('/investor')
  }
}
</script>