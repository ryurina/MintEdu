<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="border-b border-gray-100">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <a href="/" class="flex items-center gap-3">
            <div class="rounded-lg flex items-center justify-center">
              <img
                src="/logo_mintedu.png"
                alt="icon"
                class="w-10 h-10 text-white"
              />
            </div>
            <span class="text-2xl font-bold text-gray-900">MintEdu</span>
          </a>
          <div class="flex items-center gap-6">
            <router-link
              to="/"
              class="text-gray-600 hover:text-emerald-500 transition font-medium"
            >
              Home
            </router-link>
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
            <router-link to="/faq" class="text-emerald-500 font-medium">
              FAQ
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

    <!-- Hero Section -->
    <div class="container mx-auto px-6">
      <div class="pt-24 pb-16 text-center">
        <div class="inline-block px-4 py-2 bg-emerald-50 rounded-full mb-8">
          <span class="text-emerald-600 font-medium text-sm"
            >Got Questions?</span
          >
        </div>

        <h1 class="text-6xl font-bold mb-6 tracking-tight text-gray-900">
          Frequently Asked Questions
        </h1>

        <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Everything you need to know about MintEdu and decentralized education
          financing
        </p>
      </div>

      <!-- Search Bar -->
      <div class="max-w-2xl mx-auto mb-16">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for answers..."
            class="w-full px-6 py-4 pl-12 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
          />
          <svg
            class="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <!-- Categories -->
      <div class="mb-12">
        <div class="flex items-center justify-center gap-3 flex-wrap">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-6 py-2 rounded-full font-medium transition',
              selectedCategory === category
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- FAQ Sections -->
      <div class="max-w-4xl mx-auto mb-32">
        <div
          v-for="(section, sectionIndex) in filteredSections"
          :key="sectionIndex"
          class="mb-12"
        >
          <h2 class="text-3xl font-bold text-gray-900 mb-6">
            {{ section.title }}
          </h2>

          <div class="space-y-4">
            <div
              v-for="(faq, faqIndex) in section.questions"
              :key="faqIndex"
              class="rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300"
              :class="
                openIndex === `${sectionIndex}-${faqIndex}`
                  ? 'border-emerald-200 bg-gradient-to-br from-white to-emerald-50'
                  : 'hover:border-gray-200'
              "
            >
              <button
                @click="toggleFAQ(`${sectionIndex}-${faqIndex}`)"
                class="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span class="font-semibold text-gray-900 text-lg pr-4">{{
                  faq.question
                }}</span>
                <svg
                  class="w-6 h-6 text-emerald-500 flex-shrink-0 transition-transform duration-300"
                  :class="
                    openIndex === `${sectionIndex}-${faqIndex}`
                      ? 'rotate-180'
                      : ''
                  "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                v-show="openIndex === `${sectionIndex}-${faqIndex}`"
                class="px-6 pb-5"
              >
                <div class="text-gray-600 leading-relaxed">
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-if="filteredSections.length === 0" class="text-center py-20">
          <div class="text-6xl mb-4">🔍</div>
          <p class="text-gray-600 text-lg mb-2">No results found</p>
          <p class="text-gray-500">
            Try adjusting your search or browse all categories
          </p>
        </div>
      </div>

      <!-- Still Have Questions CTA -->
      <div class="mb-20">
        <div
          class="max-w-4xl mx-auto p-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-center text-white"
        >
          <h2 class="text-5xl font-bold mb-4">Still Have Questions?</h2>
          <p class="text-xl opacity-90 mb-8">
            Our team is here to help you get started
          </p>
          <div class="flex justify-center gap-4">
            <a
              href="/#contact"
              class="px-8 py-4 bg-white text-emerald-600 rounded-full hover:bg-gray-100 transition font-semibold"
            >
              Contact Us
            </a>
            <router-link
              to="/blog"
              class="px-8 py-4 bg-emerald-900 text-white rounded-full hover:bg-emerald-800 transition font-semibold"
            >
              Read Our Blog
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import Footer from "../components/Footer.vue";
import faqData from "../data/faq-data.json";

const router = useRouter();
const authStore = useAuthStore();

const searchQuery = ref("");
const selectedCategory = ref("All");
const openIndex = ref(null);
const faqSections = ref([]);

const categories = ref([
  "All",
  "General",
  "For Students",
  "For Investors",
  "Technical",
  "Security",
]);

// Load FAQ data on mount
onMounted(() => {
  faqSections.value = faqData.sections;
});

// Computed property for filtered sections
const filteredSections = computed(() => {
  let sections = faqSections.value;

  // Filter by category
  if (selectedCategory.value !== "All") {
    sections = sections.filter(
      (section) => section.category === selectedCategory.value
    );
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    sections = sections
      .map((section) => {
        const filteredQuestions = section.questions.filter(
          (faq) =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query)
        );
        return {
          ...section,
          questions: filteredQuestions,
        };
      })
      .filter((section) => section.questions.length > 0);
  }

  return sections;
});

// Toggle FAQ open/close
const toggleFAQ = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

const navigateToDashboard = () => {
  if (authStore.profile?.role === "student") {
    router.push("/student");
  } else {
    router.push("/investor");
  }
};
</script>
