<template>
  <!-- Footer -->
  <footer class="border-t border-gray-100 bg-gray-50">
    <div class="container mx-auto px-6 py-12">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center"
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
                  stroke-width="2.5"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900">MintEdu</span>
          </div>
          <p class="text-gray-600 text-sm mb-4">
            Decentralized education financing powered by Hedera blockchain
            technology.
          </p>
          <div class="flex gap-3">
            <a
              href="https://github.com/ryurina"
              target="_blank"
              class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-emerald-500 hover:text-white transition"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-emerald-500 hover:text-white transition"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                />
              </svg>
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-emerald-500 hover:text-white transition"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Product -->
        <div>
          <h4 class="font-bold text-gray-900 mb-4">Product</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <router-link
                to="/browse"
                class="text-gray-600 hover:text-emerald-500 transition"
                >Browse Loans</router-link
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-600 hover:text-emerald-500 transition"
                >How It Works</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-600 hover:text-emerald-500 transition"
                >Pricing</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-600 hover:text-emerald-500 transition"
                >FAQ</a
              >
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h4 class="font-bold text-gray-900 mb-4">Company</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <a
                href="#"
                class="text-gray-600 hover:text-emerald-500 transition"
                >About Us</a
              >
            </li>
            <li>
              <a
                href="https://github.com/ryurina"
                target="_blank"
                class="text-gray-600 hover:text-emerald-500 transition"
                >GitHub</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-600 hover:text-emerald-500 transition"
                >Blog</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-600 hover:text-emerald-500 transition"
                >Careers</a
              >
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="font-bold text-gray-900 mb-4">Legal</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <a
                href="#"
                class="text-gray-600 hover:text-emerald-500 transition"
                >Privacy Policy</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-600 hover:text-emerald-500 transition"
                >Terms of Service</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-600 hover:text-emerald-500 transition"
                >Cookie Policy</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-600 hover:text-emerald-500 transition"
                >Disclaimer</a
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div class="text-gray-500 text-sm">
          © 2025 MintEdu. All rights reserved. Powered by
          <a
            href="https://hedera.com"
            target="_blank"
            class="text-emerald-600 hover:text-emerald-700 font-medium"
            >Hedera</a
          >
        </div>
        <div class="flex items-center gap-6 text-sm">
          <a
            href="/privacy"
            class="text-gray-500 hover:text-emerald-600 transition"
            >Privacy Policy</a
          >
          <a
            href="/terms"
            class="text-gray-500 hover:text-emerald-600 transition"
            >Terms & Conditions</a
          >
          <a
            href="https://github.com/ryurina"
            target="_blank"
            class="text-gray-500 hover:text-emerald-600 transition"
            >Created by @ryurina</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>
<script></script>
