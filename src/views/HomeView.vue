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

      <!-- Contact Section -->
      <div class="mb-32">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p class="text-gray-600 text-lg">Have questions? We'd love to hear from you</p>
          </div>
          
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Contact Form -->
            <div class="p-8 rounded-3xl border border-gray-100 bg-white">
              <h3 class="text-xl font-bold text-gray-900 mb-6">Send us a message</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows="4"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button class="w-full py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition font-semibold">
                  Send Message
                </button>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="space-y-6">
              <div class="p-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Email</h4>
                    <p class="text-gray-600">support@mintedu.io</p>
                  </div>
                </div>
              </div>

              <div class="p-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">GitHub</h4>
                    <a href="https://github.com/ryurina" target="_blank" class="text-emerald-600 hover:text-emerald-700 font-medium">
                      @ryurina
                    </a>
                  </div>
                </div>
              </div>

              <div class="p-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Location</h4>
                    <p class="text-gray-600">Decentralized • Global</p>
                  </div>
                </div>
              </div>
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
    <footer class="border-t border-gray-100 bg-gray-50">
      <div class="container mx-auto px-6 py-12">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span class="text-xl font-bold text-gray-900">MintEdu</span>
            </div>
            <p class="text-gray-600 text-sm mb-4">Decentralized education financing powered by Hedera blockchain technology.</p>
            <div class="flex gap-3">
              <a href="https://github.com/ryurina" target="_blank" class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-emerald-500 hover:text-white transition">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-emerald-500 hover:text-white transition">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://discord.com" target="_blank" class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-emerald-500 hover:text-white transition">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Product -->
          <div>
            <h4 class="font-bold text-gray-900 mb-4">Product</h4>
            <ul class="space-y-2 text-sm">
              <li><router-link to="/browse" class="text-gray-600 hover:text-emerald-500 transition">Browse Loans</router-link></li>
              <li><a href="#" class="text-gray-600 hover:text-emerald-500 transition">How It Works</a></li>
              <li><a href="#" class="text-gray-600 hover:text-emerald-500 transition">Pricing</a></li>
              <li><a href="#" class="text-gray-600 hover:text-emerald-500 transition">FAQ</a></li>
            </ul>
          </div>

          <!-- Company -->
          <div>
            <h4 class="font-bold text-gray-900 mb-4">Company</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="text-gray-600 hover:text-emerald-500 transition">About Us</a></li>
              <li><a href="https://github.com/ryurina" target="_blank" class="text-gray-600 hover:text-emerald-500 transition">GitHub</a></li>
              <li><a href="#" class="text-gray-600 hover:text-emerald-500 transition">Blog</a></li>
              <li><a href="#" class="text-gray-600 hover:text-emerald-500 transition">Careers</a></li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h4 class="font-bold text-gray-900 mb-4">Legal</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="text-gray-600 hover:text-emerald-500 transition">Privacy Policy</a></li>
              <li><a href="#" class="text-gray-600 hover:text-emerald-500 transition">Terms of Service</a></li>
              <li><a href="#" class="text-gray-600 hover:text-emerald-500 transition">Cookie Policy</a></li>
              <li><a href="#" class="text-gray-600 hover:text-emerald-500 transition">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-gray-500 text-sm">
            © 2025 MintEdu. All rights reserved. Powered by <a href="https://hedera.com" target="_blank" class="text-emerald-600 hover:text-emerald-700 font-medium">Hedera</a>
          </div>
          <div class="flex items-center gap-6 text-sm">
            <a href="#" class="text-gray-500 hover:text-emerald-600 transition">Privacy Policy</a>
            <a href="#" class="text-gray-500 hover:text-emerald-600 transition">Terms & Conditions</a>
            <a href="https://github.com/ryurina" target="_blank" class="text-gray-500 hover:text-emerald-600 transition">Created by @ryurina</a>
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