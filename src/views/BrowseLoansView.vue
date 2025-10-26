<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="border-b border-gray-100">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <router-link to="/" class="flex items-center gap-3 group">
              <div class="rounded-lg flex items-center justify-center">
                <img
                  src="/logo_mintedu.png"
                  alt="icon"
                  class="w-10 h-10 text-white"
                />
              </div>
              <span class="text-2xl font-bold text-gray-900">MintEdu</span>
            </router-link>
          </div>
          <router-link
            to="/"
            class="text-gray-600 hover:text-emerald-500 transition font-medium flex items-center gap-2"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Header -->
    <div
      class="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white"
    >
      <div class="container mx-auto px-6 py-16">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">
          Explore <span class="text-emerald-500">Loans</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl">
          Browse active loan requests and support students on their educational
          journey
        </p>
      </div>
    </div>

    <div class="container mx-auto px-6 py-12">
      <!-- Loading State -->
      <div
        v-if="loanStore.loading"
        class="flex flex-col items-center justify-center py-20"
      >
        <div class="relative w-16 h-16 mb-4">
          <div
            class="absolute inset-0 border-4 border-emerald-200 rounded-full"
          ></div>
          <div
            class="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"
          ></div>
        </div>
        <p class="text-gray-600 font-medium">Loading loans...</p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="loanStore.loans.length === 0"
        class="flex flex-col items-center justify-center py-20"
      >
        <div
          class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6"
        >
          <svg
            class="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">No Loans Yet</h3>
        <p class="text-gray-600 mb-8">Be the first to create a loan request</p>
        <router-link
          to="/"
          class="px-6 py-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition font-medium"
        >
          Get Started
        </router-link>
      </div>

      <!-- Loans Grid -->
      <div v-else>
        <!-- Stats Bar -->
        <div class="grid grid-cols-4 gap-6 mb-12">
          <div
            class="p-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50"
          >
            <div class="text-sm text-gray-500 mb-1 uppercase tracking-wide">
              Total Loans
            </div>
            <div class="text-3xl font-bold text-gray-900">
              {{ loanStore.loans.length }}
            </div>
          </div>
          <div
            class="p-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50"
          >
            <div class="text-sm text-gray-500 mb-1 uppercase tracking-wide">
              Active
            </div>
            <div class="text-3xl font-bold text-emerald-500">
              {{ activeLoans }}
            </div>
          </div>
          <div
            class="p-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50"
          >
            <div class="text-sm text-gray-500 mb-1 uppercase tracking-wide">
              Funded
            </div>
            <div class="text-3xl font-bold text-gray-900">
              {{ fundedLoans }}
            </div>
          </div>
          <div
            class="p-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50"
          >
            <div class="text-sm text-gray-500 mb-1 uppercase tracking-wide">
              Total Volume
            </div>
            <div class="text-3xl font-bold text-gray-900">
              ${{ totalVolume }}
            </div>
          </div>
        </div>

        <!-- Filter Tabs -->
        <div class="flex gap-3 mb-8">
          <button
            @click="filter = 'all'"
            :class="[
              'px-6 py-3 rounded-full font-medium transition',
              filter === 'all'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            All Loans
          </button>
          <button
            @click="filter = 'open'"
            :class="[
              'px-6 py-3 rounded-full font-medium transition',
              filter === 'open'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            Open
          </button>
          <button
            @click="filter = 'funding'"
            :class="[
              'px-6 py-3 rounded-full font-medium transition',
              filter === 'funding'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            Funding
          </button>
          <button
            @click="filter = 'funded'"
            :class="[
              'px-6 py-3 rounded-full font-medium transition',
              filter === 'funded'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            Funded
          </button>
        </div>

        <!-- Loans Grid -->
        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="loan in filteredLoans"
            :key="loan.id"
            class="group p-6 rounded-2xl border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300 bg-white hover:shadow-lg"
          >
            <!-- Header -->
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-1">
                  {{ loan.student_name }}
                </h3>
                <p class="text-gray-500 text-sm">{{ loan.university }}</p>
              </div>
              <span
                :class="getStatusClass(loan.status)"
                class="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
              >
                {{ loan.status }}
              </span>
            </div>

            <!-- Details -->
            <div class="space-y-3 mb-6">
              <div class="flex justify-between items-center">
                <span class="text-gray-500 text-sm">Loan Amount</span>
                <span class="font-bold text-gray-900">${{ loan.amount }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-500 text-sm">Duration</span>
                <span class="font-semibold text-gray-900"
                  >{{ loan.duration_months }}mo</span
                >
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-500 text-sm">Interest Rate</span>
                <span class="font-semibold text-emerald-600"
                  >{{ loan.interest_rate }}%</span
                >
              </div>
            </div>

            <!-- Progress -->
            <div class="mb-4">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-500">Progress</span>
                <span class="font-semibold text-gray-900"
                  >{{ getProgress(loan) }}%</span
                >
              </div>
              <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
                  :style="{ width: `${getProgress(loan)}%` }"
                ></div>
              </div>
              <div class="flex justify-between text-xs mt-1">
                <span class="text-gray-400"
                  >${{ loan.amount_raised || 0 }} raised</span
                >
                <span class="text-gray-400">${{ loan.amount }} goal</span>
              </div>
            </div>

            <!-- Token ID -->
            <div v-if="loan.token_id" class="p-3 bg-gray-50 rounded-xl mb-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span class="text-xs text-gray-500">Token ID</span>
                </div>
                <span class="text-xs font-mono text-gray-700"
                  >{{ loan.token_id.substring(0, 12) }}...</span
                >
              </div>
            </div>

            <!-- CTA -->
            <router-link
              to="/investor"
              class="block w-full py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition font-medium text-center group-hover:scale-105 transform duration-200"
            >
              View Details
            </router-link>
          </div>
        </div>

        <!-- No Results -->
        <div v-if="filteredLoans.length === 0" class="text-center py-12">
          <p class="text-gray-600">
            No loans found with status:
            <span class="font-semibold">{{ filter }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Footer CTA -->
    <div
      class="border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white"
    >
      <div class="container mx-auto px-6 py-16 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Want to create your own loan?
        </h2>
        <p class="text-gray-600 mb-8">
          Start your educational journey with MintEdu today
        </p>
        <router-link
          to="/"
          class="inline-block px-8 py-4 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition font-semibold"
        >
          Get Started
        </router-link>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useLoanStore } from "../stores/loanStore";
import Footer from "../components/Footer.vue";

const loanStore = useLoanStore();
const filter = ref("all");

const activeLoans = computed(() => {
  return loanStore.loans.filter(
    (l) => l.status === "open" || l.status === "funding"
  ).length;
});

const fundedLoans = computed(() => {
  return loanStore.loans.filter((l) => l.status === "funded").length;
});

const totalVolume = computed(() => {
  return loanStore.loans
    .reduce((sum, loan) => sum + parseFloat(loan.amount), 0)
    .toFixed(0);
});

const filteredLoans = computed(() => {
  if (filter.value === "all") return loanStore.loans;
  return loanStore.loans.filter((loan) => loan.status === filter.value);
});

const getStatusClass = (status) => {
  const classes = {
    open: "bg-blue-100 text-blue-700",
    funding: "bg-yellow-100 text-yellow-700",
    funded: "bg-emerald-100 text-emerald-700",
    repaying: "bg-purple-100 text-purple-700",
    completed: "bg-gray-100 text-gray-700",
  };
  return classes[status] || classes.open;
};

const getProgress = (loan) => {
  const progress =
    (parseFloat(loan.amount_raised || 0) / parseFloat(loan.amount)) * 100;
  return Math.min(Math.round(progress), 100);
};

onMounted(() => {
  loanStore.fetchLoans();
});
</script>
