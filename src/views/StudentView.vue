<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="border-b border-gray-100">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="rounded-lg flex items-center justify-center">
              <img
                src="/logo_mintedu.png"
                alt="icon"
                class="w-10 h-10 text-white"
              />
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">
                MintEdu - Student Dashboard
              </h1>
              <p class="text-sm text-gray-500">
                @{{ authStore.profile?.username }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <router-link
              to="/"
              class="text-gray-600 hover:text-emerald-500 transition font-medium"
            >
              Home
            </router-link>
            <button
              @click="
                authStore.signOut();
                router.push('/');
              "
              class="px-4 py-2 text-gray-600 hover:text-gray-900 transition font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="container mx-auto px-6 py-12">
      <!-- Header Stats -->
      <div class="mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-8">
          My <span class="text-emerald-500">Loans</span>
        </h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div
            class="p-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50"
          >
            <div class="text-sm text-gray-500 mb-1 uppercase tracking-wide">
              Total Loans
            </div>
            <div class="text-3xl font-bold text-gray-900">
              {{ myLoans.length }}
            </div>
          </div>
          <div
            class="p-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50"
          >
            <div class="text-sm text-gray-500 mb-1 uppercase tracking-wide">
              Active
            </div>
            <div class="text-3xl font-bold text-emerald-500">
              {{ activeLoanCount }}
            </div>
          </div>
          <div
            class="p-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50"
          >
            <div class="text-sm text-gray-500 mb-1 uppercase tracking-wide">
              Total Borrowed
            </div>
            <div class="text-3xl font-bold text-gray-900">
              ${{ totalBorrowed }}
            </div>
          </div>
          <div
            class="p-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50"
          >
            <div class="text-sm text-gray-500 mb-1 uppercase tracking-wide">
              Total Raised
            </div>
            <div class="text-3xl font-bold text-emerald-500">
              ${{ totalRaised }}
            </div>
          </div>
        </div>
      </div>

      <!-- Loan Application Form -->
      <div class="mb-12">
        <div
          class="p-8 rounded-3xl border-2 border-gray-100 bg-white hover:border-emerald-200 transition"
        >
          <div class="flex items-center gap-3 mb-8">
            <div
              class="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900">
                Create New Loan Request
              </h3>
              <p class="text-gray-500">
                Fill in the details to apply for funding
              </p>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Loan Amount (USD)</label
              >
              <div class="relative">
                <span
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold"
                  >$</span
                >
                <input
                  v-model="loanForm.amount"
                  type="number"
                  class="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="1200"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Duration (Months)</label
              >
              <input
                v-model="loanForm.duration_months"
                type="number"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="24"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >University</label
              >
              <input
                v-model="loanForm.university"
                type="text"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Harvard University"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Interest Rate (%)</label
              >
              <div class="relative">
                <input
                  v-model="loanForm.interest_rate"
                  type="number"
                  step="0.1"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="5.0"
                />
                <span
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold"
                  >%</span
                >
              </div>
            </div>
          </div>

          <!-- Preview Card -->
          <div
            v-if="loanForm.amount && loanForm.duration_months"
            class="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl mb-6 border border-emerald-100"
          >
            <div
              class="text-sm text-emerald-700 font-semibold mb-3 uppercase tracking-wide"
            >
              Preview
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-600">Monthly Payment:</span>
                <span class="font-bold text-gray-900 ml-2"
                  >${{ monthlyPayment }}</span
                >
              </div>
              <div>
                <span class="text-gray-600">Total Repayment:</span>
                <span class="font-bold text-gray-900 ml-2"
                  >${{ totalRepayment }}</span
                >
              </div>
            </div>
          </div>

          <button
            @click="submitLoan"
            :disabled="loanStore.loading"
            class="w-full py-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {{ loanStore.loading ? "Creating Token..." : "Submit Application" }}
          </button>
        </div>
      </div>

      <!-- My Loans List -->
      <div>
        <h3 class="text-2xl font-bold text-gray-900 mb-6">
          Your Loan Requests
        </h3>

        <!-- Empty State -->
        <div
          v-if="myLoans.length === 0"
          class="flex flex-col items-center justify-center py-16 px-4 rounded-3xl border-2 border-dashed border-gray-200"
        >
          <div
            class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4"
          >
            <svg
              class="w-10 h-10 text-gray-400"
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
          <h4 class="text-xl font-bold text-gray-900 mb-2">No Loans Yet</h4>
          <p class="text-gray-600">
            Create your first loan request using the form above
          </p>
        </div>

        <!-- Loans Grid -->
        <div v-else class="grid md:grid-cols-2 gap-6">
          <div
            v-for="loan in myLoans"
            :key="loan.id"
            class="group p-6 rounded-2xl border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300 bg-white hover:shadow-lg"
          >
            <!-- Header -->
            <div class="flex justify-between items-start mb-6">
              <div>
                <h4 class="text-xl font-bold text-gray-900 mb-1">
                  {{ loan.university }}
                </h4>
                <p class="text-gray-500 text-sm">
                  Created {{ formatDate(loan.created_at) }}
                </p>
              </div>
              <span
                :class="getStatusClass(loan.status)"
                class="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
              >
                {{ loan.status }}
              </span>
            </div>

            <!-- Amount Display -->
            <div class="mb-6">
              <div class="flex items-baseline gap-2 mb-2">
                <span class="text-4xl font-bold text-gray-900"
                  >${{ loan.amount }}</span
                >
                <span class="text-gray-500">requested</span>
              </div>
              <div class="flex items-center gap-4 text-sm text-gray-600">
                <span>{{ loan.duration_months }} months</span>
                <span>•</span>
                <span class="text-emerald-600 font-semibold"
                  >{{ loan.interest_rate }}% APR</span
                >
              </div>
            </div>

            <!-- Progress -->
            <div class="mb-6">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-500">Funding Progress</span>
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
              <div class="flex justify-between text-xs mt-1 text-gray-500">
                <span>${{ loan.amount_raised || 0 }} raised</span>
                <span
                  >${{
                    loan.amount - (loan.amount_raised || 0)
                  }}
                  remaining</span
                >
              </div>
            </div>

            <!-- Token Info -->
            <div v-if="loan.token_id" class="p-4 bg-gray-50 rounded-xl mb-4">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div
                    class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"
                  ></div>
                  <span
                    class="text-xs text-gray-500 font-medium uppercase tracking-wide"
                    >HTS Token</span
                  >
                </div>
                <a
                  :href="`https://hashscan.io/testnet/token/${loan.token_id}`"
                  target="_blank"
                  class="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  View →
                </a>
              </div>
              <span class="text-xs font-mono text-gray-700">{{
                loan.token_id
              }}</span>
            </div>

            <!-- Actions -->
            <div class="flex gap-3">
              <button
                class="flex-1 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition font-medium text-sm"
              >
                View Details
              </button>
              <button
                class="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
              >
                <svg
                  class="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Container -->
    <ToastContainer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { useLoanStore } from "../stores/loanStore";
import { useToast } from "../composables/useToast";
import ToastContainer from "../components/ToastContainer.vue";

const router = useRouter();
const authStore = useAuthStore();
const loanStore = useLoanStore();
const toast = useToast();

const loanForm = ref({
  amount: "",
  duration_months: "",
  university: "",
  interest_rate: 5,
});

const myLoans = computed(() => {
  return loanStore.loans.filter(
    (loan) => loan.student_id === authStore.user?.id
  );
});

const activeLoanCount = computed(() => {
  return myLoans.value.filter(
    (l) => l.status === "open" || l.status === "funding"
  ).length;
});

const totalBorrowed = computed(() => {
  return myLoans.value
    .reduce((sum, loan) => sum + parseFloat(loan.amount), 0)
    .toFixed(0);
});

const totalRaised = computed(() => {
  return myLoans.value
    .reduce((sum, loan) => sum + parseFloat(loan.amount_raised || 0), 0)
    .toFixed(0);
});

const monthlyPayment = computed(() => {
  if (!loanForm.value.amount || !loanForm.value.duration_months) return 0;
  const principal = parseFloat(loanForm.value.amount);
  const months = parseInt(loanForm.value.duration_months);
  const rate = parseFloat(loanForm.value.interest_rate) / 100;
  const total = principal * (1 + rate);
  return (total / months).toFixed(2);
});

const totalRepayment = computed(() => {
  if (!loanForm.value.amount) return 0;
  const principal = parseFloat(loanForm.value.amount);
  const rate = parseFloat(loanForm.value.interest_rate) / 100;
  return (principal * (1 + rate)).toFixed(2);
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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
};

const submitLoan = async () => {
  if (
    !loanForm.value.amount ||
    !loanForm.value.duration_months ||
    !loanForm.value.university
  ) {
    toast.warning(
      "Incomplete Form",
      "Please fill in all required fields before submitting."
    );
    return;
  }

  const result = await loanStore.createLoan({
    student_id: authStore.user.id,
    student_name: authStore.profile.username,
    amount: parseFloat(loanForm.value.amount),
    duration_months: parseInt(loanForm.value.duration_months),
    university: loanForm.value.university,
    interest_rate: parseFloat(loanForm.value.interest_rate),
  });

  if (result.success) {
    loanForm.value = {
      amount: "",
      duration_months: "",
      university: "",
      interest_rate: 5,
    };
    toast.success(
      "Loan Created Successfully!",
      "Your loan application has been submitted and HTS token was created successfully."
    );
  } else {
    toast.error(
      "Submission Failed",
      result.error || "Unable to create loan. Please try again."
    );
  }
};

onMounted(() => {
  loanStore.fetchLoans();
});
</script>
