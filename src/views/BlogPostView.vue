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
            <router-link to="/blog" class="text-emerald-500 font-medium">
              Blog
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

    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto px-6 py-20">
      <div class="text-center">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"
        ></div>
        <p class="text-gray-600 mt-4">Loading post...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container mx-auto px-6 py-20">
      <div class="text-center">
        <p class="text-red-600 text-lg mb-4">{{ error }}</p>
        <router-link
          to="/blog"
          class="text-emerald-600 hover:text-emerald-700 font-medium"
        >
          ← Back to Blog
        </router-link>
      </div>
    </div>

    <!-- Post Content -->
    <article v-else-if="post" class="container mx-auto px-6 py-12">
      <!-- Back to Blog -->
      <div class="max-w-4xl mx-auto mb-8">
        <router-link
          to="/blog"
          class="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition font-medium"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </router-link>
      </div>

      <!-- Post Header -->
      <header class="max-w-4xl mx-auto mb-12">
        <div class="flex items-center gap-3 mb-6">
          <span
            :class="[
              'px-4 py-2 text-sm font-semibold rounded-full',
              getCategoryColor(post.category),
            ]"
          >
            {{ post.category }}
          </span>
          <span class="text-gray-500">{{ formatDate(post.created_at) }}</span>
          <span class="text-gray-500">•</span>
          <span class="text-gray-500">{{ post.read_time }} min read</span>
        </div>

        <h1 class="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {{ post.title }}
        </h1>

        <p class="text-xl text-gray-600 leading-relaxed mb-8">
          {{ post.excerpt }}
        </p>

        <!-- Author Info -->
        <div class="flex items-center gap-4 pb-8 border-b border-gray-100">
          <div
            class="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
          >
            {{ getInitials(post.author) }}
          </div>
          <div>
            <div class="font-semibold text-gray-900 text-lg">
              {{ post.author }}
            </div>
            <div class="text-gray-500">Author</div>
          </div>
        </div>
      </header>

      <!-- Featured Image -->
      <div
        v-if="post.image_url"
        class="max-w-5xl mx-auto mb-12 rounded-3xl overflow-hidden"
      >
        <img
          :src="post.image_url"
          :alt="post.title"
          class="w-full h-auto object-cover"
        />
      </div>

      <!-- Post Content -->
      <div class="max-w-3xl mx-auto">
        <div
          class="prose prose-lg prose-emerald max-w-none mb-16"
          v-html="formatContent(post.content)"
        ></div>

        <!-- Tags -->
        <div
          class="flex items-center gap-3 mb-12 pb-12 border-b border-gray-100"
        >
          <span class="text-gray-500 font-medium">Tags:</span>
          <div class="flex gap-2">
            <span
              v-for="tag in getTags(post.category)"
              :key="tag"
              class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Share Section -->
        <div class="mb-16">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Share this post</h3>
          <div class="flex gap-3">
            <button
              @click="shareOnTwitter"
              class="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition font-medium"
            >
              Share on Twitter
            </button>
            <button
              @click="copyLink"
              class="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium"
            >
              {{ copied ? "Copied!" : "Copy Link" }}
            </button>
          </div>
        </div>

        <!-- Related Posts -->
        <div v-if="relatedPosts.length > 0" class="mb-16">
          <h3 class="text-3xl font-bold text-gray-900 mb-8">
            Related Articles
          </h3>
          <div class="grid md:grid-cols-3 gap-6">
            <div
              v-for="relatedPost in relatedPosts"
              :key="relatedPost.id"
              @click="viewPost(relatedPost)"
              class="group rounded-2xl overflow-hidden border border-gray-100 hover:border-emerald-200 transition-all duration-300 cursor-pointer"
            >
              <div class="relative h-40 overflow-hidden">
                <img
                  v-if="relatedPost.image_url"
                  :src="relatedPost.image_url"
                  :alt="relatedPost.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  v-else
                  :class="[
                    'w-full h-full bg-gradient-to-br',
                    getCategoryGradient(relatedPost.category),
                  ]"
                ></div>
              </div>
              <div class="p-4">
                <h4
                  class="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition line-clamp-2"
                >
                  {{ relatedPost.title }}
                </h4>
                <p class="text-sm text-gray-600 line-clamp-2">
                  {{ relatedPost.excerpt }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter CTA -->
      <div class="max-w-4xl mx-auto">
        <div
          class="p-12 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-center text-white"
        >
          <h2 class="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p class="text-lg opacity-90 mb-8">
            Get the latest articles delivered to your inbox
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
    </article>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { supabase } from "../composables/useSupabase";
import Footer from "../components/Footer.vue";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const post = ref(null);
const relatedPosts = ref([]);
const loading = ref(true);
const error = ref(null);
const copied = ref(false);
const newsletterEmail = ref("");
const subscribing = ref(false);
const subscribeMessage = ref("");

// Fetch post by slug or ID
const fetchPost = async () => {
  try {
    loading.value = true;
    error.value = null;

    const slug = route.params.slug;

    // Try to fetch by slug first, then by ID
    let query = supabase.from("blog_posts").select("*").eq("published", true);

    // Check if slug is a UUID (ID) or a slug
    if (
      slug.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      )
    ) {
      query = query.eq("id", slug);
    } else {
      query = query.eq("slug", slug);
    }

    const { data, error: fetchError } = await query.single();

    if (fetchError) throw fetchError;

    post.value = data;

    // Fetch related posts
    await fetchRelatedPosts(data.category, data.id);
  } catch (err) {
    error.value = "Post not found or failed to load.";
    console.error("Error fetching post:", err);
  } finally {
    loading.value = false;
  }
};

// Fetch related posts
const fetchRelatedPosts = async (category, currentPostId) => {
  try {
    const { data, error: fetchError } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("category", category)
      .eq("published", true)
      .neq("id", currentPostId)
      .limit(3);

    if (fetchError) throw fetchError;

    relatedPosts.value = data || [];
  } catch (err) {
    console.error("Error fetching related posts:", err);
  }
};

// Helper functions
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
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

const formatContent = (content) => {
  // Convert markdown-style content to HTML
  // Add basic formatting support
  return content
    .replace(/\n\n/g, "</p><p class='mb-6'>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^# (.*?)$/gm, "<h2 class='text-3xl font-bold mb-4 mt-8'>$1</h2>")
    .replace(/^## (.*?)$/gm, "<h3 class='text-2xl font-bold mb-3 mt-6'>$1</h3>")
    .replace(
      /^### (.*?)$/gm,
      "<h4 class='text-xl font-bold mb-2 mt-4'>$1</h4>"
    );
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

const getTags = (category) => {
  const tags = {
    Technology: ["Blockchain", "HTS", "Hedera"],
    "Student Guide": ["Education", "Loans", "Students"],
    "Investor Guide": ["Investing", "Returns", "Portfolio"],
    DeFi: ["Decentralized Finance", "Crypto", "Web3"],
    "Success Stories": ["Testimonials", "Growth", "Success"],
    Security: ["Safety", "Security", "Trust"],
  };
  return tags[category] || ["Blog", "MintEdu"];
};

const shareOnTwitter = () => {
  const text = encodeURIComponent(post.value.title);
  const url = encodeURIComponent(window.location.href);
  window.open(
    `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    "_blank"
  );
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy link:", err);
  }
};

const viewPost = (relatedPost) => {
  router.push(`/blog/${relatedPost.slug || relatedPost.id}`);
  window.scrollTo(0, 0);
  fetchPost();
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
  fetchPost();
});
</script>

<style scoped>
.prose {
  color: #374151;
  line-height: 1.75;
}

.prose p {
  margin-bottom: 1.5rem;
}

.prose strong {
  color: #111827;
  font-weight: 600;
}

.prose em {
  font-style: italic;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
