<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <h1 class="text-2xl font-bold text-green-600">Investor Dashboard</h1>
        <div class="flex items-center gap-4">
          <WalletConnect />
          <button
            @click="
              authStore.signOut();
              router.push('/');
            "
            class="text-gray-600 hover:text-gray-800"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>

    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-6 flex items-center">
          <svg
            class="w-6 h-6 mr-2 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Available Loans
        </h2>

        <div v-if="availableLoans.length === 0" class="text-gray-600">
          No loans available for investment at the moment.
        </div>

        <div v-else class="grid md:grid-cols-2 gap-6">
          <div
            v-for="loan in availableLoans"
            :key="loan.id"
            class="border rounded-lg p-6 hover:shadow-lg transition"
          >
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="font-bold text-lg">{{ loan.student_name }}</h3>
                <p class="text-gray-600 text-sm">{{ loan.university }}</p>
              </div>
              <span
                :class="getStatusClass(loan.status)"
                class="px-3 py-1 rounded-full text-sm"
              >
                {{ loan.status }}
              </span>
            </div>

            <div class="space-y-2 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Loan Amount:</span>
                <span class="font-semibold">${{ loan.amount }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Duration:</span>
                <span class="font-semibold"
                  >{{ loan.duration_months }} months</span
                >
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Interest Rate:</span>
                <span class="font-semibold text-green-600"
                  >{{ loan.interest_rate }}%</span
                >
              </div>
              <div v-if="loan.token_id" class="flex justify-between text-sm">
                <span class="text-gray-600">Token ID:</span>
                <span class="font-mono text-xs">{{ loan.token_id }}</span>
              </div>
            </div>

            <LoanProgress :loan="loan" />

            <div v-if="selectedLoan?.id === loan.id" class="mt-4 space-y-2">
              <input
                v-model="investmentAmount"
                type="number"
                placeholder="Amount to invest"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div class="flex gap-2">
                <button
                  @click="invest(loan)"
                  :disabled="loanStore.loading || !walletStore.connected"
                  class="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
                >
                  {{
                    loanStore.loading ? "Processing..." : "Confirm Investment"
                  }}
                </button>
                <button
                  @click="
                    selectedLoan = null;
                    investmentAmount = '';
                  "
                  class="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
            <button
              v-else
              @click="selectedLoan = loan"
              :disabled="!walletStore.connected"
              class="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
            >
              {{
                walletStore.connected
                  ? "Invest Now"
                  : "Connect Wallet to Invest"
              }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Token Association Modal -->
    <!-- Token Association Modal -->
    <div
      v-if="showAssociationModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h2 class="text-2xl font-bold mb-4">Token Association Required</h2>
        <div class="mb-6">
          <p class="text-gray-600 mb-4">
            Before you can invest, you need to associate the loan token with
            your HashPack wallet. This is a one-time operation that costs ~0.05
            HBAR.
          </p>

          <!-- Token ID Display -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p class="text-sm font-semibold text-blue-900 mb-2">Token ID:</p>
            <div class="flex items-center gap-2">
              <p class="text-lg font-mono text-blue-700 flex-1">
                {{ pendingAssociation?.tokenId }}
              </p>
              <button
                @click="copyTokenId"
                class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Copy
              </button>
            </div>
          </div>

          <!-- Video Tutorial -->
          <div class="mb-6">
            <h3 class="font-semibold text-gray-900 mb-3">📺 Video Tutorial</h3>
            <div
              class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300"
            >
              <div class="text-center">
                <svg
                  class="w-16 h-16 mx-auto text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p class="text-gray-500 text-sm">Video tutorial coming soon</p>
              </div>
              <!-- Replace with actual video embed when ready -->
              <!-- <iframe src="YOUR_VIDEO_URL" class="w-full h-full rounded-lg"></iframe> -->
            </div>
          </div>

          <!-- Step-by-Step Instructions -->
          <div class="space-y-3">
            <h3 class="font-semibold text-gray-900 mb-2">📝 Manual Steps:</h3>

            <div class="flex gap-3">
              <div
                class="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-semibold"
              >
                1
              </div>
              <div>
                <p class="font-semibold">Open HashPack Wallet</p>
                <p class="text-sm text-gray-600">
                  Open your HashPack browser extension or mobile app
                </p>
              </div>
            </div>

            <div class="flex gap-3">
              <div
                class="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-semibold"
              >
                2
              </div>
              <div>
                <p class="font-semibold">Go to Tokens Tab</p>
                <p class="text-sm text-gray-600">
                  Navigate to the "Tokens" section in your wallet
                </p>
              </div>
            </div>

            <div class="flex gap-3">
              <div
                class="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-semibold"
              >
                3
              </div>
              <div>
                <p class="font-semibold">Click "Associate Token"</p>
                <p class="text-sm text-gray-600">
                  Look for the "+" or "Associate Token" button
                </p>
              </div>
            </div>

            <div class="flex gap-3">
              <div
                class="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-semibold"
              >
                4
              </div>
              <div>
                <p class="font-semibold">Paste Token ID</p>
                <p class="text-sm text-gray-600">
                  Copy the token ID above and paste it in HashPack
                </p>
              </div>
            </div>

            <div class="flex gap-3">
              <div
                class="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-semibold"
              >
                5
              </div>
              <div>
                <p class="font-semibold">Confirm Transaction</p>
                <p class="text-sm text-gray-600">
                  Approve the association (~0.05 HBAR fee)
                </p>
              </div>
            </div>

            <div class="flex gap-3">
              <div
                class="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-semibold"
              >
                6
              </div>
              <div>
                <p class="font-semibold">Return Here & Invest</p>
                <p class="text-sm text-gray-600">
                  Once associated, come back and click "Try Again" below
                </p>
              </div>
            </div>
          </div>

          <!-- Warning Note -->
          <div
            class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6"
          >
            <p class="text-sm text-yellow-800">
              <span class="font-semibold">⚠️ Note:</span> You only need to
              associate each token once. After association, all future
              investments in this loan will work automatically.
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button
            @click="retryInvestment"
            class="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            ✓ I've Associated - Try Again
          </button>
          <button
            @click="
              showAssociationModal = false;
              pendingAssociation = null;
            "
            class="px-6 py-3 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>

        <!-- External Links -->
        <div class="mt-4 flex gap-4 justify-center text-sm">
          <a
            :href="`https://hashscan.io/testnet/token/${pendingAssociation?.tokenId}`"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:text-blue-800"
          >
            View Token on HashScan →
          </a>

          <a
            href="https://www.hashpack.app/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:text-blue-800"
          >
            Get HashPack Wallet →
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { useLoanStore } from "../stores/loanStore";
import { useWalletStore } from "../stores/walletStore";
import WalletConnect from "../components/WalletConnect.vue";
import LoanProgress from "../components/LoanProgress.vue";

const router = useRouter();
const authStore = useAuthStore();
const loanStore = useLoanStore();
const walletStore = useWalletStore();

const selectedLoan = ref(null);
const investmentAmount = ref("");
const showAssociationModal = ref(false);
const pendingAssociation = ref(null);

const availableLoans = computed(() => {
  return loanStore.loans.filter(
    (loan) => loan.status === "open" || loan.status === "funding"
  );
});

const getStatusClass = (status) => {
  const classes = {
    open: "bg-blue-100 text-blue-800",
    funding: "bg-yellow-100 text-yellow-800",
    funded: "bg-green-100 text-green-800",
    repaying: "bg-purple-100 text-purple-800",
    completed: "bg-gray-100 text-gray-800",
  };
  return classes[status] || classes.open;
};

const associateTokenForLoan = async () => {
  if (!pendingAssociation.value) return;

  try {
    const result = await walletStore.associateToken(
      pendingAssociation.value.tokenId
    );

    if (result.success) {
      alert("Token associated successfully! You can now invest.");
      showAssociationModal.value = false;

      // Retry investment
      await invest(pendingAssociation.value.loan);
    } else {
      alert(`Failed to associate token: ${result.error}`);
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};

const invest = async (loan) => {
  if (!walletStore.connected) {
    alert("Please connect your wallet first");
    return;
  }

  if (!investmentAmount.value || parseFloat(investmentAmount.value) <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  const result = await loanStore.investInLoan(
    loan.id,
    parseFloat(investmentAmount.value),
    authStore.user.id,
    walletStore.accountId
  );

  if (result.success) {
    alert(`Successfully invested $${investmentAmount.value}!`);
    investmentAmount.value = "";
    selectedLoan.value = null;
  } else if (result.needsAssociation) {
    // Show association modal
    pendingAssociation.value = {
      loan,
      tokenId: loan.token_id,
    };
    showAssociationModal.value = true;
  } else {
    alert(result.error || "Investment failed");
  }
};

onMounted(() => {
  loanStore.fetchLoans();
});
</script>
