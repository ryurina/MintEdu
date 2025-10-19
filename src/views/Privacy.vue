<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="sticky top-0 bg-white border-b border-gray-100 z-40">
      <div class="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-2 cursor-pointer">
          <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg"></div>
          <h1 class="text-2xl font-bold text-gray-900">MintEdu</h1>
        </router-link>
        <nav class="hidden md:flex gap-8 items-center">
          <router-link to="/" class="text-gray-600 hover:text-gray-900 transition text-sm">Home</router-link>
          <a href="/#features" class="text-gray-600 hover:text-gray-900 transition text-sm">Features</a>
          <a href="/#contact" class="text-gray-600 hover:text-gray-900 transition text-sm">Contact</a>
          <div v-if="!authStore.user">
            <button @click="showAuthModal" class="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-emerald-700 transition">
              Get Started
            </button>
          </div>
          <div v-else>
            <button @click="navigateToDashboard" class="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition">
              Dashboard
            </button>
          </div>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-6 py-16">
      <div class="mb-12">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p class="text-gray-600">Last updated: October 2025</p>
      </div>

      <div class="prose prose-lg max-w-none text-gray-700 space-y-8">
        <!-- Introduction -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p>
            MintEdu ("Company," "we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our platform.
          </p>
          <p>
            Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Services.
          </p>
        </section>

        <!-- Information We Collect -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">1.1 Information You Provide</h3>
              <ul class="list-disc pl-6 space-y-2">
                <li><strong>Account Information:</strong> Name, email address, password, phone number, and profile information</li>
                <li><strong>Educational Information:</strong> School/university name, program details, graduation date, and academic records</li>
                <li><strong>Financial Information:</strong> Bank account details, payment methods, loan amounts, and investment preferences</li>
                <li><strong>Identity Verification:</strong> Government-issued ID, date of birth, address, and SSN/tax ID for compliance</li>
                <li><strong>Communication:</strong> Messages, support tickets, and feedback you provide</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">1.2 Information Automatically Collected</h3>
              <ul class="list-disc pl-6 space-y-2">
                <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent, clicks, search queries, and interaction patterns</li>
                <li><strong>Cookies & Tracking:</strong> Cookies, web beacons, and similar technologies for authentication and analytics</li>
                <li><strong>Blockchain Data:</strong> Transaction history and wallet addresses on the Hedera network</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">1.3 Information from Third Parties</h3>
              <ul class="list-disc pl-6 space-y-2">
                <li>Educational institutions for verification purposes</li>
                <li>Financial institutions for identity and credit verification</li>
                <li>Background check providers for compliance and fraud prevention</li>
                <li>Analytics providers and service partners</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- How We Use Information -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
          <p>We use collected information for:</p>
          <ul class="list-disc pl-6 space-y-2 mt-4">
            <li>Providing and improving our Services</li>
            <li>Processing transactions and managing accounts</li>
            <li>Identity verification and fraud prevention</li>
            <li>Complying with legal and regulatory requirements</li>
            <li>Sending transactional and promotional communications</li>
            <li>Analyzing usage patterns and improving user experience</li>
            <li>Customer support and technical assistance</li>
            <li>Resolving disputes and enforcing agreements</li>
          </ul>
        </section>

        <!-- Data Sharing -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">3. Disclosure of Your Information</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">3.1 Service Providers</h3>
              <p>We share information with third-party service providers who perform services on our behalf, including payment processors, identity verification providers, and analytics services. These providers are contractually obligated to use your information only for providing services to us.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">3.2 Business Partners</h3>
              <p>We may share information with educational institutions and financial partners necessary to facilitate loans and investments on our platform.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">3.3 Legal Requirements</h3>
              <p>We may disclose information when required by law, court order, or government authority, or when we believe in good faith that disclosure is necessary to protect our rights, your safety, or the public.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">3.4 Business Transfers</h3>
              <p>If MintEdu is involved in a merger, acquisition, bankruptcy, or asset sale, your information may be transferred as part of that transaction.</p>
            </div>
          </div>
        </section>

        <!-- Data Security -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">4. Data Security</h2>
          <p>
            We implement comprehensive technical, administrative, and physical security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our security measures include:
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-4">
            <li>Encryption of data in transit and at rest using industry-standard protocols</li>
            <li>Secure authentication mechanisms including multi-factor authentication</li>
            <li>Regular security audits and penetration testing</li>
            <li>Access controls limiting employee access to personal information</li>
            <li>Secure password policies and regular security training</li>
          </ul>
          <p class="mt-4 text-sm text-gray-600">
            However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
          </p>
        </section>

        <!-- Your Rights -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">5. Your Privacy Rights</h2>
          
          <div class="space-y-4">
            <p>Depending on your location, you may have the following rights:</p>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Access</h3>
              <p>You have the right to access the personal information we hold about you.</p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Correction</h3>
              <p>You can request correction of inaccurate or incomplete information.</p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Deletion</h3>
              <p>You may request deletion of your personal information, subject to legal obligations.</p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Portability</h3>
              <p>You have the right to receive your information in a portable format.</p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Opt-Out</h3>
              <p>You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails.</p>
            </div>

            <p class="text-sm text-gray-600 mt-4">
              To exercise any of these rights, please contact us at <a href="mailto:privacy@mintedu.com" class="text-emerald-600 hover:text-emerald-700">privacy@mintedu.com</a>
            </p>
          </div>
        </section>

        <!-- Children's Privacy -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">6. Children's Privacy</h2>
          <p>
            MintEdu does not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will promptly delete such information and terminate the child's account. If you believe we have collected information from a child under 13, please contact us immediately.
          </p>
        </section>

        <!-- Cookies -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience. You can control cookie preferences through your browser settings. However, disabling cookies may affect functionality of our platform.
          </p>
          <p class="mt-4">
            We use cookies for:
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Session management and authentication</li>
            <li>User preferences and settings</li>
            <li>Analytics and performance monitoring</li>
            <li>Marketing and advertising purposes</li>
          </ul>
        </section>

        <!-- Blockchain & Transparency -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">8. Blockchain and Transparency</h2>
          <p>
            MintEdu operates on the Hedera network. Transaction data, including loan amounts, investor information, and payment history, may be recorded on the public blockchain. While personal identifying information is not directly stored on the blockchain, transaction activity may be traceable through wallet addresses.
          </p>
          <p class="mt-4">
            Please understand that blockchain transactions are immutable and permanent. Exercise caution when reviewing what information you connect to your wallet addresses.
          </p>
        </section>

        <!-- Retention -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">9. Data Retention</h2>
          <p>
            We retain personal information for as long as necessary to provide our Services and fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. When information is no longer needed, we securely delete or anonymize it.
          </p>
        </section>

        <!-- International Data -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">10. International Data Transfers</h2>
          <p>
            Your information may be transferred to, stored in, and processed in countries other than your country of residence. These countries may have different data protection laws. By using MintEdu, you consent to the transfer of your information to countries outside your country of residence, which may have different data protection rules.
          </p>
        </section>

        <!-- Contact Us -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our privacy practices, please contact us:
          </p>
          <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mt-4">
            <p class="font-semibold text-gray-900">MintEdu Privacy Team</p>
            <p class="text-gray-700">Email: <a href="mailto:privacy@mintedu.com" class="text-emerald-600 hover:text-emerald-700">privacy@mintedu.com</a></p>
            <p class="text-gray-700">Address: San Francisco, CA, United States</p>
          </div>
        </section>

        <!-- Changes -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by updating the "Last Updated" date at the top of this policy. Your continued use of MintEdu after changes become effective constitutes your acceptance of the updated Privacy Policy.
          </p>
        </section>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-12 mt-16">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded"></div>
              <span class="text-white font-bold">MintEdu</span>
            </div>
            <p class="text-sm">Decentralized education financing powered by Hedera.</p>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Product</h4>
            <ul class="space-y-2 text-sm">
              <li><router-link to="/" class="hover:text-white transition">Home</router-link></li>
              <li><a href="#" class="hover:text-white transition">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Company</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition">About</a></li>
              <li><a href="#" class="hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Legal</h4>
            <ul class="space-y-2 text-sm">
              <li><router-link to="/privacy" class="hover:text-white transition">Privacy</router-link></li>
              <li><a href="#" class="hover:text-white transition">Terms</a></li>
              <li><a href="#" class="hover:text-white transition">Security</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-8 flex justify-between items-center">
          <p class="text-sm">&copy; 2025 MintEdu. All rights reserved.</p>
          <div class="flex gap-6">
            <a href="#" class="text-gray-400 hover:text-white transition">Twitter</a>
            <a href="#" class="text-gray-400 hover:text-white transition">LinkedIn</a>
            <a href="#" class="text-gray-400 hover:text-white transition">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const showAuthModal = () => {
  // Open auth modal or redirect to login
  router.push('/login')
}

const navigateToDashboard = () => {
  if (authStore.profile?.role === 'student') {
    router.push('/student')
  } else {
    router.push('/investor')
  }
}
</script>