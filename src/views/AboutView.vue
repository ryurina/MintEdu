<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="border-b border-gray-100">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <router-link to="/" class="flex items-center gap-3">
            <div class="rounded-lg flex items-center justify-center">
              <img
                src="/logo_mintedu.png"
                alt="icon"
                class="w-10 h-10 text-white"
              />
            </div>
            <span class="text-2xl font-bold text-gray-900">MintEdu</span>
          </router-link>
          <div class="flex items-center gap-6">
            <router-link
              to="/browse"
              class="text-gray-600 hover:text-emerald-500 transition font-medium"
            >
              Explore
            </router-link>
            <router-link
              to="/blog"
              class="text-gray-600 hover:text-emerald-500 transition font-medium"
            >
              Blog
            </router-link>
            <router-link
              to="/about"
              class="text-gray-600 hover:text-emerald-500 transition font-medium"
            >
              About
            </router-link>
            <a
              href="/#contact"
              class="text-gray-600 hover:text-emerald-500 transition font-medium"
            >
              Contact
            </a>
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

    <div class="container mx-auto px-6">
      <!-- Hero Section -->
      <div class="pt-20 pb-16 text-center">
        <div
          class="inline-block px-4 py-2 bg-emerald-50 rounded-full mb-8 animate-fade-in-down"
        >
          <span class="text-emerald-600 font-medium text-sm">
            About MintEdu
          </span>
        </div>

        <h1
          class="text-6xl font-bold mb-6 tracking-tight animate-fade-in-up"
          style="animation-delay: 0.1s"
        >
          Empowering Education Through
          <br />
          <span
            class="text-emerald-500 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600"
          >
            Decentralization
          </span>
        </h1>

        <p
          class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
          style="animation-delay: 0.2s"
        >
          MintEdu is redefining access to higher education by providing
          transparent, secure, and instant student financing on the blockchain.
          By leveraging Hedera's enterprise-grade technology, we remove
          traditional barriers like credit checks, high interest rates, and slow
          approvals, making education funding accessible to students worldwide.
        </p>
      </div>

      <!-- Mission & Vision -->
      <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-32">
        <div
          class="p-10 rounded-3xl border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300 bg-gradient-to-br from-emerald-50 to-teal-50"
        >
          <div
            class="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6"
          >
            <svg
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 class="text-3xl font-bold mb-4 text-gray-900">Our Mission</h3>
          <p class="text-gray-700 text-lg leading-relaxed">
            To make education funding fair, transparent, and decentralized, so
            every student can pursue their dreams without financial stress.
          </p>
        </div>

        <div
          class="p-10 rounded-3xl border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300 bg-gradient-to-br from-gray-50 to-white"
        >
          <div
            class="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mb-6"
          >
            <svg
              class="w-8 h-8 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
          <h3 class="text-3xl font-bold mb-4 text-gray-900">Our Vision</h3>
          <p class="text-gray-700 text-lg leading-relaxed">
            A world where students thrive and investors grow together, creating
            a community-driven ecosystem for lifelong learning.
          </p>
        </div>
      </div>

      <!-- Why MintEdu Section -->
      <div class="mb-32">
        <div class="text-center mb-16">
          <h2 class="text-5xl font-bold text-gray-900 mb-4">Why MintEdu?</h2>
          <p class="text-gray-600 text-lg">
            The future of education financing is here
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <div
            class="p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white"
          >
            <div
              class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4"
            >
              <svg
                class="w-6 h-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-2">
              Decentralized Loans
            </h4>
            <p class="text-gray-600">
              Securely tokenized on-chain, eliminating intermediaries.
            </p>
          </div>

          <div
            class="p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white"
          >
            <div
              class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4"
            >
              <svg
                class="w-6 h-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-2">
              Instant Liquidity
            </h4>
            <p class="text-gray-600">
              Students receive funds directly to their university.
            </p>
          </div>

          <div
            class="p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white"
          >
            <div
              class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4"
            >
              <svg
                class="w-6 h-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-2">
              Flexible Repayments
            </h4>
            <p class="text-gray-600">
              Graduates repay on a schedule that works for them.
            </p>
          </div>

          <div
            class="p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white"
          >
            <div
              class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4"
            >
              <svg
                class="w-6 h-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-2">
              Transparent Investing
            </h4>
            <p class="text-gray-600">
              Investors track returns in real-time via HTS tokens.
            </p>
          </div>
        </div>
      </div>

      <!-- Built on Hedera -->
      <div class="mb-32">
        <div
          class="max-w-5xl mx-auto p-12 rounded-3xl border-2 border-gray-100 bg-gradient-to-br from-gray-50 to-white"
        >
          <div class="text-center mb-10">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">
              Built on Hedera
            </h2>
            <p class="text-gray-600 text-lg max-w-2xl mx-auto">
              With 10,000 TPS, aBFT security, and carbon-negative operations,
              MintEdu combines speed, safety, and sustainability in education
              financing.
            </p>
          </div>
          <div class="grid grid-cols-3 gap-8">
            <div class="text-center">
              <div class="text-5xl mb-3">⚡</div>
              <div class="font-bold text-2xl text-gray-900 mb-1">
                10,000 TPS
              </div>
              <div class="text-sm text-gray-500">Lightning Fast</div>
            </div>
            <div class="text-center">
              <div class="text-5xl mb-3">🔒</div>
              <div class="font-bold text-2xl text-gray-900 mb-1">aBFT</div>
              <div class="text-sm text-gray-500">Bank-Grade Security</div>
            </div>
            <div class="text-center">
              <div class="text-5xl mb-3">💚</div>
              <div class="font-bold text-2xl text-gray-900 mb-1">
                Carbon Negative
              </div>
              <div class="text-sm text-gray-500">Eco-Friendly</div>
            </div>
          </div>
        </div>
      </div>

      <!-- How It Works -->
      <div class="mb-32">
        <div class="text-center mb-16">
          <h2 class="text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p class="text-gray-600 text-lg">
            Three simple steps to decentralized education financing
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div class="relative">
            <div
              class="text-center p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
            >
              <div
                class="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6"
              >
                01
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">
                Create Request
              </h3>
              <p class="text-gray-600 leading-relaxed">
                Student submits loan amount and university details. HTS token
                automatically created.
              </p>
            </div>
          </div>

          <div class="relative">
            <div
              class="text-center p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
            >
              <div
                class="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6"
              >
                02
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">Invest HBAR</h3>
              <p class="text-gray-600 leading-relaxed">
                Investors fund with HBAR and receive loan tokens representing
                their share.
              </p>
            </div>
          </div>

          <div class="relative">
            <div
              class="text-center p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
            >
              <div
                class="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6"
              >
                03
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">Earn Returns</h3>
              <p class="text-gray-600 leading-relaxed">
                Students repay after graduation. Returns distributed
                proportionally to token holders.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="mb-32">
        <div class="text-center mb-16">
          <h2 class="text-5xl font-bold text-gray-900 mb-4">Our Team</h2>
          <p class="text-gray-600 text-lg">Meet the visionary behind MintEdu</p>
        </div>

        <div class="max-w-4xl mx-auto">
          <div
            class="p-10 rounded-3xl border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
          >
            <div class="flex flex-col md:flex-row gap-8 items-center">
              <div
                class="w-40 h-40 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-3xl flex items-center justify-center text-white text-5xl font-bold flex-shrink-0"
              >
                RR
              </div>
              <div class="flex-1 text-center md:text-left">
                <h3 class="text-3xl font-bold text-gray-900 mb-2">
                  RANARISON Rina
                </h3>
                <p class="text-emerald-600 font-semibold text-lg mb-4">
                  Founder & CEO
                </p>
                <p class="text-gray-700 mb-4 leading-relaxed">
                  Full-stack developer and applied math enthusiast. Rina founded
                  MintEdu to make education financing transparent, accessible,
                  and decentralized. With a background in mathematics and
                  blockchain technology, he combines technical expertise with a
                  passion for solving real-world education challenges.
                </p>
                <div
                  class="p-4 bg-emerald-50 rounded-xl border border-emerald-100"
                >
                  <p class="text-gray-900 italic">
                    "I built MintEdu to empower students and investors
                    alike—creating a community where education and innovation
                    thrive together."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="mb-20">
        <div
          class="max-w-5xl mx-auto p-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-center text-white"
        >
          <h2 class="text-5xl font-bold mb-4">
            Join the Future of Education Financing
          </h2>
          <p class="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Whether you're a student seeking funding or an investor supporting
            learning, MintEdu offers a simple, secure, and rewarding experience.
            Together, we're building a decentralized ecosystem where education
            and opportunity know no boundaries.
          </p>
          <div class="flex justify-center gap-4">
            <router-link
              to="/"
              class="px-8 py-4 bg-white text-emerald-600 rounded-full hover:bg-gray-100 transition font-semibold"
            >
              Get Started
            </router-link>
            <router-link
              to="/browse"
              class="px-8 py-4 bg-emerald-900 text-white rounded-full hover:bg-emerald-800 transition font-semibold"
            >
              Explore Loans
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import Footer from "../components/Footer.vue";

const router = useRouter();
const authStore = useAuthStore();

const navigateToDashboard = () => {
  if (authStore.profile?.role === "student") {
    router.push("/student");
  } else {
    router.push("/investor");
  }
};
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out forwards;
}
</style>
