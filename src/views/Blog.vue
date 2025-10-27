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
              to="/browse"
              class="text-gray-600 hover:text-emerald-500 transition font-medium"
            >
              Explore
            </router-link>
            <router-link to="/blog" class="text-emerald-500 font-medium">
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

    <!-- Hero Section -->
    <div class="container mx-auto px-6">
      <div class="pt-24 pb-16 text-center">
        <div class="inline-block px-4 py-2 bg-emerald-50 rounded-full mb-8">
          <span class="text-emerald-600 font-medium text-sm"
            >Insights & Updates</span
          >
        </div>

        <h1 class="text-6xl font-bold mb-6 tracking-tight text-gray-900">
          MintEdu Blog
        </h1>

        <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Stories, insights, and news about decentralized education financing
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"
        ></div>
        <p class="text-gray-600 mt-4">Loading posts...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <p class="text-red-600">{{ error }}</p>
      </div>

      <!-- Content -->
      <template v-else>
        <!-- Featured Post -->
        <div v-if="featuredPost" class="mb-20">
          <div
            @click="viewPost(featuredPost)"
            class="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-gray-100 hover:border-emerald-200 transition-all duration-300 bg-gradient-to-br from-white to-gray-50 cursor-pointer group"
          >
            <div class="grid md:grid-cols-2 gap-0">
              <div class="relative h-80 md:h-auto overflow-hidden">
                <img
                  v-if="featuredPost.image_url"
                  :src="featuredPost.image_url"
                  :alt="featuredPost.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  v-else
                  class="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 group-hover:scale-105 transition-transform duration-500"
                >
                  <div
                    class="flex items-center justify-center h-full text-white text-6xl font-bold opacity-20"
                  >
                    Featured
                  </div>
                </div>
              </div>
              <div class="p-10 flex flex-col justify-center">
                <div class="flex items-center gap-3 mb-4">
                  <span
                    class="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full"
                    >Featured</span
                  >
                  <span class="text-sm text-gray-500">{{
                    formatDate(featuredPost.created_at)
                  }}</span>
                </div>
                <h2
                  class="text-3xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition"
                >
                  {{ featuredPost.title }}
                </h2>
                <p class="text-gray-600 mb-6 leading-relaxed">
                  {{ featuredPost.excerpt }}
                </p>
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  >
                    {{ getInitials(featuredPost.author) }}
                  </div>
                  <div>
                    <div class="font-semibold text-gray-900 text-sm">
                      {{ featuredPost.author }}
                    </div>
                    <div class="text-xs text-gray-500">
                      {{ featuredPost.read_time }} min read
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

        <!-- Blog Grid -->
        <div class="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-32">
          <div
            v-for="post in filteredPosts"
            :key="post.id"
            @click="viewPost(post)"
            class="group rounded-3xl overflow-hidden border border-gray-100 hover:border-emerald-200 transition-all duration-300 bg-gradient-to-br from-white to-gray-50 cursor-pointer"
          >
            <div class="relative h-48 overflow-hidden">
              <img
                v-if="post.image_url"
                :src="post.image_url"
                :alt="post.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div
                v-else
                :class="[
                  'w-full h-full bg-gradient-to-br',
                  getCategoryGradient(post.category),
                ]"
              >
                <div
                  class="flex items-center justify-center h-full text-white text-4xl font-bold opacity-20"
                >
                  {{ getCategoryIcon(post.category) }}
                </div>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <span
                  :class="[
                    'px-3 py-1 text-xs font-semibold rounded-full',
                    getCategoryColor(post.category),
                  ]"
                  >{{ post.category }}</span
                >
                <span class="text-xs text-gray-500">{{
                  formatDate(post.created_at)
                }}</span>
              </div>
              <h3
                class="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition"
              >
                {{ post.title }}
              </h3>
              <p class="text-gray-600 text-sm mb-4 leading-relaxed">
                {{ post.excerpt }}
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs',
                      post.id % 2 === 0 ? 'bg-gray-900' : 'bg-emerald-500',
                    ]"
                  >
                    {{ getInitials(post.author) }}
                  </div>
                  <span class="text-xs text-gray-600 font-medium">{{
                    post.author
                  }}</span>
                </div>
                <span class="text-xs text-gray-500"
                  >{{ post.read_time }} min read</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredPosts.length === 0" class="text-center py-20">
          <p class="text-gray-600 text-lg">No posts found in this category.</p>
        </div>
      </template>

      <!-- Newsletter CTA -->
      <div class="mb-20">
        <div
          class="max-w-4xl mx-auto p-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-center text-white"
        >
          <h2 class="text-5xl font-bold mb-4">Stay Updated</h2>
          <p class="text-xl opacity-90 mb-8">
            Get the latest insights on DeFi education financing
          </p>
          <div class="flex gap-3 max-w-md mx-auto">
            <input
              v-model="newsletterEmail"
              type="email"
              placeholder="your@email.com"
              class="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              @click="subscribeNewsletter"
              :disabled="subscribing"
              class="px-8 py-4 bg-white text-emerald-600 rounded-full hover:bg-gray-100 transition font-semibold whitespace-nowrap disabled:bg-gray-300"
            >
              {{ subscribing ? "..." : "Subscribe" }}
            </button>
          </div>
          <p v-if="subscribeMessage" class="mt-4 text-sm">
            {{ subscribeMessage }}
          </p>
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
import { supabase } from "../composables/useSupabase";
import Footer from "../components/Footer.vue";

const router = useRouter();
const authStore = useAuthStore();

const posts = ref([]);
const loading = ref(true);
const error = ref(null);
const selectedCategory = ref("All");
const newsletterEmail = ref("");
const subscribing = ref(false);
const subscribeMessage = ref("");

const categories = ref([
  "All",
  "Technology",
  "Student Guide",
  "Investor Guide",
  "DeFi",
  "Success Stories",
  "Security",
]);

// Fetch posts from Supabase
const fetchPosts = async () => {
  try {
    loading.value = true;
    error.value = null;

    const { data, error: fetchError } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) throw fetchError;

    posts.value = data || [];
  } catch (err) {
    error.value = "Failed to load blog posts. Please try again later.";
    console.error("Error fetching posts:", err);
  } finally {
    loading.value = false;
  }
};

// Computed properties
const featuredPost = computed(() => {
  return posts.value.find((post) => post.is_featured) || posts.value[0];
});

const filteredPosts = computed(() => {
  const nonFeaturedPosts = posts.value.filter(
    (post) => post.id !== featuredPost.value?.id
  );

  if (selectedCategory.value === "All") {
    return nonFeaturedPosts;
  }

  return nonFeaturedPosts.filter(
    (post) => post.category === selectedCategory.value
  );
});

// Helper functions
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getCategoryGradient = (category) => {
  const gradients = {
    Technology: "from-emerald-400 to-teal-500",
    "Student Guide": "from-blue-400 to-indigo-500",
    "Investor Guide": "from-purple-400 to-pink-500",
    DeFi: "from-orange-400 to-red-500",
    "Success Stories": "from-green-400 to-emerald-500",
    Security: "from-cyan-400 to-blue-500",
  };
  return gradients[category] || "from-gray-400 to-gray-500";
};

const getCategoryColor = (category) => {
  const colors = {
    Technology: "bg-emerald-50 text-emerald-600",
    "Student Guide": "bg-blue-50 text-blue-600",
    "Investor Guide": "bg-purple-50 text-purple-600",
    DeFi: "bg-orange-50 text-orange-600",
    "Success Stories": "bg-green-50 text-green-600",
    Security: "bg-cyan-50 text-cyan-600",
  };
  return colors[category] || "bg-gray-50 text-gray-600";
};

const getCategoryIcon = (category) => {
  const icons = {
    Technology: "HTS",
    "Student Guide": "Guide",
    "Investor Guide": "ROI",
    DeFi: "DeFi",
    "Success Stories": "Success",
    Security: "Security",
  };
  return icons[category] || "Blog";
};

const viewPost = (post) => {
  router.push(`/blog/${post.slug || post.id}`);
};

const subscribeNewsletter = async () => {
  if (!newsletterEmail.value || !newsletterEmail.value.includes("@")) {
    subscribeMessage.value = "Please enter a valid email address";
    return;
  }

  try {
    subscribing.value = true;
    subscribeMessage.value = "";

    const { error: subscribeError } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email: newsletterEmail.value }]);

    if (subscribeError) {
      if (subscribeError.code === "23505") {
        subscribeMessage.value = "You're already subscribed!";
      } else {
        throw subscribeError;
      }
    } else {
      subscribeMessage.value = "Successfully subscribed!";
      newsletterEmail.value = "";
    }
  } catch (err) {
    subscribeMessage.value = "Failed to subscribe. Please try again.";
    console.error("Error subscribing:", err);
  } finally {
    subscribing.value = false;
  }
};

const navigateToDashboard = () => {
  if (authStore.profile?.role === "student") {
    router.push("/student");
  } else {
    router.push("/investor");
  }
};

onMounted(() => {
  fetchPosts();
});
</script>
