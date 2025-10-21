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
        <h1 class="text-5xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
        <p class="text-gray-600">Last updated: October 2025</p>
      </div>

      <div class="prose prose-lg max-w-none text-gray-700 space-y-8">
        <!-- Introduction -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p>
            Welcome to MintEdu. These Terms and Conditions ("Terms") govern your access to and use of the MintEdu platform, including our website, mobile applications, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
          </p>
          <p>
            Please read these Terms carefully before using our Services. If you do not agree with these Terms, you may not access or use the Services.
          </p>
          <p class="text-sm text-gray-600 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <strong>Important:</strong> These Terms contain an arbitration clause and class action waiver that affect your legal rights. Please review Section 15 carefully.
          </p>
        </section>

        <!-- Definitions -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">1. Definitions</h2>
          <div class="space-y-3">
            <p><strong>"Platform"</strong> means the MintEdu website, mobile applications, and all related services.</p>
            <p><strong>"User"</strong> means any person who accesses or uses the Platform, including Students and Investors.</p>
            <p><strong>"Student"</strong> means a User who applies for or receives education financing through the Platform.</p>
            <p><strong>"Investor"</strong> means a User who provides education financing to Students through the Platform.</p>
            <p><strong>"Loan"</strong> means an education financing agreement between a Student and one or more Investors.</p>
            <p><strong>"Account"</strong> means your registered user account on the Platform.</p>
            <p><strong>"Content"</strong> means all text, images, data, and other materials available on the Platform.</p>
          </div>
        </section>

        <!-- Eligibility -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
          <p>To use our Services, you must:</p>
          <ul class="list-disc pl-6 space-y-2 mt-4">
            <li>Be at least 18 years of age</li>
            <li>Have the legal capacity to enter into binding contracts</li>
            <li>Not be prohibited from using the Services under applicable laws</li>
            <li>Reside in a jurisdiction where our Services are available</li>
            <li>Provide accurate, complete, and current information during registration</li>
            <li>Complete identity verification (KYC) as required</li>
          </ul>
          <p class="mt-4">
            By creating an Account, you represent and warrant that you meet these eligibility requirements.
          </p>
        </section>

        <!-- Account Registration -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">3. Account Registration and Security</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">3.1 Registration</h3>
              <p>
                To access certain features, you must create an Account. You agree to provide accurate, complete, and up-to-date information during registration and to update this information as necessary.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">3.2 Account Security</h3>
              <p>You are responsible for:</p>
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li>Maintaining the confidentiality of your password and Account credentials</li>
                <li>All activities that occur under your Account</li>
                <li>Notifying us immediately of any unauthorized use or security breach</li>
                <li>Ensuring your account information remains accurate and current</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">3.3 Two-Factor Authentication (2FA)</h3>
              <p>
                We strongly recommend enabling 2FA for enhanced security. You may be required to enable 2FA for certain transactions or account activities.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">3.4 Account Suspension</h3>
              <p>
                We reserve the right to suspend or terminate your Account if we suspect fraudulent activity, violation of these Terms, or for any other reason at our discretion.
              </p>
            </div>
          </div>
        </section>

        <!-- Services Description -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">4. Description of Services</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">4.1 Platform Overview</h3>
              <p>
                MintEdu is a decentralized education financing platform that connects Students seeking education loans with Investors willing to fund those loans. The Platform facilitates the creation, funding, and management of education loans using blockchain technology.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">4.2 For Students</h3>
              <ul class="list-disc pl-6 space-y-2">
                <li>Apply for education loans by submitting applications with required documentation</li>
                <li>Receive funding directly to your connected cryptocurrency wallet</li>
                <li>Make loan repayments according to agreed terms</li>
                <li>Track loan status and repayment schedule</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">4.3 For Investors</h3>
              <ul class="list-disc pl-6 space-y-2">
                <li>Browse and select verified student loan opportunities</li>
                <li>Fund loans using cryptocurrency via connected wallet</li>
                <li>Receive interest payments and principal repayments</li>
                <li>Track investment performance and portfolio</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">4.4 No Investment Advice</h3>
              <p>
                MintEdu is a technology platform and marketplace. We do not provide investment, financial, or legal advice. All investment decisions are made solely by Investors at their own risk.
              </p>
            </div>
          </div>
        </section>

        <!-- Loan Terms -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">5. Loan Terms and Conditions</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">5.1 Loan Agreement</h3>
              <p>
                Each Loan is subject to its own specific terms, including principal amount, interest rate, repayment schedule, and duration. Students and Investors agree to the specific terms of each Loan through the Platform.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">5.2 Interest Rates</h3>
              <p>
                Interest rates are determined based on various factors including creditworthiness, educational institution, field of study, and market conditions. Rates typically range from 8% to 15% annually.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">5.3 Repayment</h3>
              <ul class="list-disc pl-6 space-y-2">
                <li>Students must make payments according to the agreed schedule</li>
                <li>Late payments may incur additional fees</li>
                <li>Early repayment is permitted without penalty</li>
                <li>Failure to make payments may result in default</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">5.4 Default</h3>
              <p>
                Default occurs when a Student fails to make payments for 90 consecutive days. Default may result in:
              </p>
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li>Damage to credit score</li>
                <li>Collection actions</li>
                <li>Legal proceedings</li>
                <li>Permanent platform ban</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">5.5 Income-Based Repayment</h3>
              <p>
                In cases of financial hardship, Students may be eligible for income-based repayment plans. Contact our support team for eligibility assessment.
              </p>
            </div>
          </div>
        </section>

        <!-- Fees -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">6. Fees and Charges</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">6.1 Platform Fees</h3>
              <p>MintEdu charges the following fees:</p>
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Origination Fee:</strong> 0% - We do not charge intermediary fees</li>
                <li><strong>Late Payment Fee:</strong> $25 per late payment</li>
                <li><strong>Transaction Fees:</strong> Network gas fees apply for blockchain transactions</li>
                <li><strong>Withdrawal Fee:</strong> Minimal processing fee for fund withdrawals</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">6.2 Third-Party Fees</h3>
              <p>
                You may incur fees from third parties, including but not limited to: Hedera network transaction fees, wallet provider fees, bank transfer fees, and currency conversion fees.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">6.3 Fee Changes</h3>
              <p>
                We reserve the right to modify our fees at any time with 30 days' notice. Changes will not affect existing Loan agreements.
              </p>
            </div>
          </div>
        </section>

        <!-- Wallet Integration -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">7. Cryptocurrency Wallets and Hedera Integration</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">7.1 Wallet Connection</h3>
              <p>
                To use certain features, you must connect a compatible cryptocurrency wallet (HashPack or Blade). You are solely responsible for the security and management of your wallet.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">7.2 Hedera Transactions</h3>
              <p>
                All transactions are processed on the Hedera network. Once a transaction is confirmed on the blockchain, it is irreversible. We are not responsible for:
              </p>
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li>Lost or stolen wallet credentials</li>
                <li>Transactions sent to incorrect addresses</li>
                <li>Hedera network delays or failures</li>
                <li>Gas fee fluctuations</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">7.3 Token Creation</h3>
              <p>
                Loans may be represented as tokens on the Hedera network using Hedera Token Service (HTS). These tokens represent your loan agreement or investment position.
              </p>
            </div>
          </div>
        </section>

        <!-- Prohibited Activities -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">8. Prohibited Activities</h2>
          <p>You agree not to:</p>
          <ul class="list-disc pl-6 space-y-2 mt-4">
            <li>Provide false, misleading, or fraudulent information</li>
            <li>Use the Platform for money laundering or illegal activities</li>
            <li>Create multiple accounts to circumvent restrictions</li>
            <li>Attempt to manipulate loan ratings or reviews</li>
            <li>Reverse engineer, decompile, or disassemble the Platform</li>
            <li>Use automated systems (bots) to access the Platform</li>
            <li>Interfere with the proper functioning of the Platform</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Impersonate any person or entity</li>
            <li>Harass, threaten, or abuse other Users</li>
          </ul>
        </section>

        <!-- Intellectual Property -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">9. Intellectual Property Rights</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">9.1 Platform Ownership</h3>
              <p>
                All intellectual property rights in the Platform, including software, design, logos, trademarks, and content, are owned by MintEdu or our licensors.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">9.2 Limited License</h3>
              <p>
                We grant you a limited, non-exclusive, non-transferable license to access and use the Platform for its intended purposes, subject to these Terms.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">9.3 User Content</h3>
              <p>
                By submitting content to the Platform, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content for operating the Platform.
              </p>
            </div>
          </div>
        </section>

        <!-- Privacy -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">10. Privacy and Data Protection</h2>
          <p>
            Your use of the Platform is also governed by our <router-link to="/privacy" class="text-emerald-600 hover:text-emerald-700 underline">Privacy Policy</router-link>. By using the Services, you consent to our collection, use, and disclosure of your information as described in the Privacy Policy.
          </p>
          <p class="mt-4">
            We comply with GDPR, CCPA, and other applicable data protection regulations. You have rights regarding your personal data, including the right to access, correct, and delete your information.
          </p>
        </section>

        <!-- Disclaimers -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">11. Disclaimers and Limitations of Liability</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">11.1 "As Is" Basis</h3>
              <p class="uppercase text-sm">
                THE PLATFORM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">11.2 Investment Risk</h3>
              <p>
                Investing in student loans involves significant risk, including the risk of partial or total loss of principal. Past performance does not guarantee future results. You should carefully consider your financial situation before investing.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">11.3 No Guarantee</h3>
              <p>
                We do not guarantee:
              </p>
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li>Loan approval for Students</li>
                <li>Funding success for loan applications</li>
                <li>Repayment by Students</li>
                <li>Any specific return on investment</li>
                <li>Uninterrupted or error-free Platform operation</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">11.4 Limitation of Liability</h3>
              <p class="uppercase text-sm">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, MINTEDU SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
            </div>
          </div>
        </section>

        <!-- Indemnification -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">12. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless MintEdu, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising out of or related to:
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-4">
            <li>Your use of the Platform</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any rights of another party</li>
            <li>Your violation of any applicable laws or regulations</li>
          </ul>
        </section>

        <!-- Dispute Resolution -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">13. Dispute Resolution Between Users</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">13.1 Direct Resolution</h3>
              <p>
                We encourage Users to resolve disputes directly through our messaging system. MintEdu may provide mediation services but is not obligated to do so.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">13.2 Platform Role</h3>
              <p>
                MintEdu acts as a facilitator and technology provider. We are not a party to loan agreements between Students and Investors and have no obligation to enforce such agreements.
              </p>
            </div>
          </div>
        </section>

        <!-- Termination -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">14. Termination</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">14.1 By You</h3>
              <p>
                You may terminate your Account at any time by contacting support. You remain responsible for all outstanding obligations.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">14.2 By Us</h3>
              <p>
                We may suspend or terminate your Account immediately if you:
              </p>
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li>Violate these Terms</li>
                <li>Engage in fraudulent activity</li>
                <li>Fail to comply with applicable laws</li>
                <li>Pose a security or legal risk</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">14.3 Effect of Termination</h3>
              <p>
                Upon termination, your right to access the Platform ceases immediately. Existing loan obligations survive termination.
              </p>
            </div>
          </div>
        </section>

        <!-- Governing Law -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">15. Governing Law and Arbitration</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">15.1 Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">15.2 Arbitration Agreement</h3>
              <p>
                Any dispute arising out of or relating to these Terms or the Services shall be resolved through binding arbitration in accordance with the American Arbitration Association rules.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">15.3 Class Action Waiver</h3>
              <p class="uppercase text-sm">
                YOU AGREE THAT DISPUTES WILL BE RESOLVED ON AN INDIVIDUAL BASIS ONLY, AND NOT AS A CLASS ACTION, CLASS ARBITRATION, OR ANY OTHER REPRESENTATIVE PROCEEDING.
              </p>
            </div>
          </div>
        </section>

        <!-- Miscellaneous -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">16. Miscellaneous</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">16.1 Entire Agreement</h3>
              <p>
                These Terms constitute the entire agreement between you and MintEdu regarding the Services and supersede all prior agreements.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">16.2 Amendments</h3>
              <p>
                We may modify these Terms at any time. Changes become effective upon posting. Your continued use constitutes acceptance of modified Terms.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">16.3 Severability</h3>
              <p>
                If any provision is found unenforceable, the remaining provisions will remain in full force and effect.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">16.4 Waiver</h3>
              <p>
                Our failure to enforce any right or provision does not constitute a waiver of that right or provision.
              </p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">16.5 Assignment</h3>
              <p>
                You may not assign or transfer these Terms. We may assign these Terms without restriction.
              </p>
            </div>
          </div>
        </section>

        <!-- Contact -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">17. Contact Information</h2>
          <p>
            If you have questions about these Terms, please contact us:
          </p>
          <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mt-4">
            <p class="font-semibold text-gray-900">MintEdu Legal Team</p>
            <p class="text-gray-700">Email: <a href="mailto:legal@mintedu.com" class="text-emerald-600 hover:text-emerald-700">legal@mintedu.com</a></p>
            <p class="text-gray-700">Support: <a href="mailto:support@mintedu.com" class="text-emerald-600 hover:text-emerald-700">support@mintedu.com</a></p>
            <p class="text-gray-700">Address: Antananarivo, Madagascar</p>
          </div>
        </section>

        <!-- Acknowledgment -->
        <section class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Acknowledgment</h3>
          <p class="text-sm text-gray-700">
            By using MintEdu, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these Terms, please do not use our Services.
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
              <li><router-link to="/terms" class="hover:text-white transition">Terms</router-link></li>
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