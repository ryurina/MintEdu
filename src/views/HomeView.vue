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
            <span class="text-2xl font-bold text-gray-900">MintEdu</span>
          </div>
          <div class="flex items-center gap-6">
            <router-link to="/browse" class="text-gray-600 hover:text-emerald-500 transition font-medium">
              Explore
            </router-link>
            <button
              v-if="authStore.user"
              @click="navigateToDashboard"
              class="px-6 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition font-medium"
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="container mx-auto px-6">
      <div class="pt-24 pb-20 text-center">
        <div class="inline-block px-4 py-2 bg-emerald-50 rounded-full mb-8">
          <span class="text-emerald-600 font-medium text-sm">Powered by Hedera Network</span>
        </div>
        
        <h1 class="text-7xl font-bold mb-6 tracking-tight">
          <span class="text-gray-900">Fund Education</span>
          <br />
          <span class="text-emerald-500">On-Chain</span>
        </h1>
        
        <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          Decentralized student loans backed by HTS tokens. 
          Transparent, secure, and instant.
        </p>

        <div class="flex justify-center gap-4">
          <button
            @click="showAuthModal('student')"
            class="group px-8 py-4 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition font-medium text-lg flex items-center gap-2"
          >
            Apply for Loan
            <svg class="w-5 h-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button
            @click="showAuthModal('investor')"
            class="px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition font-medium text-lg"
          >
            Start Investing
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-3 gap-8 max-w-4xl mx-auto mb-32">
        <div class="text-center p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 transition">
          <div class="text-5xl font-bold text-gray-900 mb-2">$10K+</div>
          <div class="text-gray-500 text-sm uppercase tracking-wide">Total Funded</div>
        </div>
        <div class="text-center p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 transition">
          <div class="text-5xl font-bold text-gray-900 mb-2">50+</div>
          <div class="text-gray-500 text-sm uppercase tracking-wide">Students</div>
        </div>
        <div class="text-center p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 transition">
          <div class="text-5xl font-bold text-emerald-500 mb-2">5%</div>
          <div class="text-gray-500 text-sm uppercase tracking-wide">Avg. Returns</div>
        </div>
      </div>

      <!-- Features -->
      <div class="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-32">
        <!-- Student -->
        <div class="group p-10 rounded-3xl border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
          <div class="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          
          <h3 class="text-3xl font-bold mb-4 text-gray-900">Students</h3>
          <p class="text-gray-600 mb-8 text-lg leading-relaxed">
            Access education funding without traditional barriers. Get instant liquidity through tokenized loans.
          </p>

          <div class="space-y-4 mb-8">
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span class="text-gray-700">No credit checks required</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span class="text-gray-700">Funds directly to university</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span class="text-gray-700">Flexible repayment schedule</span>
            </div>
          </div>

          <button
            @click="showAuthModal('student')"
            class="w-full py-4 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition font-medium"
          >
            Get Started
          </button>
        </div>

        <!-- Investor -->
        <div class="group p-10 rounded-3xl border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
          <div class="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
            <svg class="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h3 class="text-3xl font-bold mb-4 text-gray-900">Investors</h3>
          <p class="text-gray-600 mb-8 text-lg leading-relaxed">
            Earn returns while supporting education. Own fractional loan tokens with transparent on-chain tracking.
          </p>

          <div class="space-y-4 mb-8">
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span class="text-gray-700">HTS token ownership</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span class="text-gray-700">Verifiable on-chain returns</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span class="text-gray-700">Diversify across students</span>
            </div>
          </div>

          <button
            @click="showAuthModal('investor')"
            class="w-full py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition font-medium"
          >
            Start Investing
          </button>
        </div>
      </div>

      <!-- How It Works -->
      <div class="mb-32">
        <div class="text-center mb-16">
          <h2 class="text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p class="text-gray-600 text-lg">Three simple steps to decentralized education financing</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div class="relative">
            <div class="text-center p-8">
              <div class="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                01
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">Create Request</h3>
              <p class="text-gray-600">Student submits loan amount and university details. HTS token automatically created.</p>
            </div>
          </div>

          <div class="relative">
            <div class="text-center p-8">
              <div class="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                02
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">Invest HBAR</h3>
              <p class="text-gray-600">Investors fund with HBAR and receive loan tokens representing their share.</p>
            </div>
          </div>

          <div class="relative">
            <div class="text-center p-8">
              <div class="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                03
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">Earn Returns</h3>
              <p class="text-gray-600">Students repay after graduation. Returns distributed proportionally to token holders.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="mb-32">
        <div class="max-w-4xl mx-auto p-12 rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-3">Built on Hedera</h2>
            <p class="text-gray-600">Enterprise-grade blockchain technology</p>
          </div>
          <div class="grid grid-cols-3 gap-8">
            <div class="text-center">
              <div class="text-4xl mb-2">⚡</div>
              <div class="font-semibold text-gray-900">10,000 TPS</div>
              <div class="text-sm text-gray-500">Transaction Speed</div>
            </div>
            <div class="text-center">
              <div class="text-4xl mb-2">🔒</div>
              <div class="font-semibold text-gray-900">aBFT</div>
              <div class="text-sm text-gray-500">Bank-Grade Security</div>
            </div>
            <div class="text-center">
              <div class="text-4xl mb-2">💚</div>
              <div class="font-semibold text-gray-900">Carbon Negative</div>
              <div class="text-sm text-gray-500">Eco-Friendly</div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mb-20">
        <div class="max-w-4xl mx-auto p-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-center text-white">
          <h2 class="text-5xl font-bold mb-4">Ready to Start?</h2>
          <p class="text-xl opacity-90 mb-8">Join the future of education financing today</p>
          <div class="flex justify-center gap-4">
            <button
              @click="showAuthModal('student')"
              class="px-8 py-4 bg-white text-emerald-600 rounded-full hover:bg-gray-100 transition font-semibold"
            >
              Apply Now
            </button>
            <button
              @click="showAuthModal('investor')"
              class="px-8 py-4 bg-emerald-900 text-white rounded-full hover:bg-emerald-800 transition font-semibold"
            >
              Invest Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="border-t border-gray-100 py-12">
      <div class="container mx-auto px-6">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg"></div>
            <span class="font-bold text-gray-900">MintEdu</span>
          </div>
          <div class="text-gray-500 text-sm">
            © 2025 MintEdu. Powered by Hedera.
          </div>
        </div>
      </div>
    </footer>

    <!-- Auth Modal -->
    <div v-if="showAuth" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <h2 class="text-3xl font-bold mb-2 text-gray-900">
          {{ authMode === 'signin' ? 'Welcome Back' : 'Get Started' }}
        </h2>
        <p class="text-gray-500 mb-8">{{ authMode === 'signin' ? 'Sign in to your account' : `Sign up as ${selectedRole}` }}</p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              v-model="email"
              type="email"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              v-model="password"
              type="password"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          
          <button
            @click="handleAuth"
            :disabled="authStore.loading"
            class="w-full py-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition font-semibold disabled:bg-gray-300"
          >
            {{ authStore.loading ? 'Processing...' : (authMode === 'signin' ? 'Sign In' : 'Sign Up') }}
          </button>

          <button
            @click="authMode = authMode === 'signin' ? 'signup' : 'signin'"
            class="w-full text-gray-600 hover:text-emerald-600 transition text-sm"
          >
            {{ authMode === 'signin' ? 'Need an account? Sign Up' : 'Already have an account? Sign In' }}
          </button>

          <button
            @click="showAuth = false"
            class="w-full text-gray-400 hover:text-gray-600 transition text-sm"
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