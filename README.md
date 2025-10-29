# MintEdu 🎓💚

**Decentralized Education Financing Powered by Hedera**

MintEdu is a Web3 platform that revolutionizes education financing by connecting students directly with community investors through blockchain technology. Say goodbye to traditional lending gatekeepers and hello to transparent, accessible education funding.

![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

**Repository**: [github.com/ryurina/MintEdu](https://github.com/ryurina/MintEdu)

---

## 📋 Table of Contents

- [Hedera Service Utilization](#-hedera-service-utilization)
- [Features](#-features)
- [Architecture Overview](#-architecture-overview)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Technology Stack](#-technology-stack)
- [Hedera Integration Details](#-hedera-integration-details)
- [Security & Compliance](#-security--compliance)
- [Documentation](#-documentation)
- [How It Works](#-how-it-works)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🔷 Hedera Service Utilization

### Services Used

MintEdu leverages **Hedera Token Service (HTS)** as its core blockchain infrastructure for tokenizing education loans and processing investments.

### Why Hedera?

We chose Hedera for its unique combination of features that directly address the challenges of education financing:

**1. Predictable Low-Cost Economics ($0.0001 per transaction)**
- **Token Creation**: Each student loan application creates a unique HTS token. Traditional blockchain networks charge $5-50 per token creation, making micro-loans economically unfeasible. Hedera's $0.0001 token creation fee enables us to tokenize even small $500-1000 student loans profitably.
- **Investment Transactions**: With potentially hundreds of small investors funding each loan ($50-500 investments), transaction fees must be negligible. At $0.0001 per transfer, we can process 10,000 transactions for just $1, ensuring the platform remains accessible to both small investors and students.
- **Financial Sustainability**: Our platform charges 0% intermediary fees to students. This is only possible because Hedera's predictable costs allow us to build a sustainable business model on volume rather than high per-transaction margins.

**2. High Throughput & Finality**
- Process loan fundings in seconds, not minutes or hours
- 3-5 second transaction finality ensures instant confirmation for investors
- Supports high transaction volume during loan funding campaigns

**3. Regulatory Compliance**
- Hedera's governed structure (Google, IBM, Boeing council members) provides regulatory confidence
- Built-in compliance features support our KYC/AML requirements
- Transparent audit trail for all transactions

### Transaction Types

MintEdu executes the following Hedera transaction types:

1. **`TokenCreateTransaction`** - Creates a unique fungible token for each student loan application
   - Token represents fractional ownership of the loan
   - Minted supply equals loan amount requested
   - Used in: Supabase Edge Function `create-loan-token`

2. **`TransferTransaction`** - Processes all investment and repayment flows
   - HBAR from investor → Treasury account (investment)
   - Loan tokens from Treasury → Investor wallet (allocation)
   - HBAR from student → Investors (loan repayments)
   - Used in: Supabase Edge Function `process-investment`

3. **`AccountInfoQuery`** - Validates wallet balances and token holdings
   - Verifies investor HBAR balance before investment
   - Confirms token delivery to investor wallets
   - Used in: Frontend wallet connection verification

### Economic Impact

By choosing Hedera's $0.0001 fee structure over alternatives (Ethereum: ~$5-50, Polygon: ~$0.01-0.50), MintEdu achieves:
- **99.99% cost reduction** vs. Ethereum
- **99% cost reduction** vs. other L2 solutions
- **Zero-fee experience** for end users (platform absorbs all blockchain costs)
- **Sustainable unit economics** even for micro-loans under $500

This economic model is essential for democratizing access to education financing globally, especially in developing markets where traditional lending infrastructure is absent.

---

## 🌟 Features

- **For Students**

  - Apply for affordable education loans
  - Transparent fee structure (0% intermediary fees)
  - Flexible repayment terms
  - Fast verification process
  - Direct investor connection

- **For Investors**

  - Browse verified student loan opportunities
  - Earn sustainable returns (avg. 15%)
  - Support education impact
  - Transparent transaction history
  - Diversified investment portfolio

- **Core Platform**
  - Built on Hedera Token Service (HTS)
  - HashConnect & HashPack/Blade wallet integration
  - Multi-factor authentication (2FA)
  - Real-time transaction settlement
  - Comprehensive KYC/AML compliance
  - Identity verification integration
  - Supabase PostgreSQL database with Edge Functions

---

## 🏗️ Architecture Overview

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER LAYER                               │
│  ┌─────────────┐              ┌──────────────┐                  │
│  │   Student   │              │   Investor   │                  │
│  │  (Browser)  │              │  (Browser)   │                  │
│  └──────┬──────┘              └──────┬───────┘                  │
│         │                            │                           │
└─────────┼────────────────────────────┼───────────────────────────┘
          │                            │
          └────────────┬───────────────┘
                       │
┌──────────────────────▼────────────────────────────────────────────┐
│                    FRONTEND LAYER                                 │
│  ┌─────────────────────────────────────────────────────┐          │
│  │     Vue 3 + Vite Application (localhost:5173)       │          │
│  │  - Student Dashboard    - Investor Dashboard        │          │
│  │  - Loan Browse          - Wallet Connection         │          │
│  │  - Authentication UI    - Real-time Updates         │          │
│  └────┬──────────────────────────────┬─────────────────┘          │
│       │                              │                            │
└───────┼──────────────────────────────┼────────────────────────────┘
        │                              │
        │ (1) Auth, CRUD               │ (2) Wallet Connect
        │                              │
┌───────▼──────────────────┐  ┌────────▼────────────────────────────┐
│   BACKEND LAYER          │  │     BLOCKCHAIN LAYER                │
│  (Supabase Services)     │  │    (Hedera Network)                 │
│                          │  │                                     │
│ ┌────────────────────┐   │  │  ┌─────────────────────┐            │
│ │  PostgreSQL DB     │   │  │  │  Hedera Token       │            │
│ │  - users           │   │  │  │  Service (HTS)      │            │
│ │  - loans           │   │  │  │                     │            │
│ │  - investments     │◄──┼──┼──┤  • TokenCreate      │            │
│ │  - blog_posts      │   │  │  │  • TransferTransaction│          │
│ └────────────────────┘   │  │  │  • AccountInfoQuery │            │
│                          │  │  └─────────────────────┘            │
│ ┌────────────────────┐   │  │                                     │
│ │  Supabase Auth     │   │  │  ┌─────────────────────┐            │
│ │  - Email/Password  │   │  │  │  User Wallets       │            │
│ │  - 2FA             │   │  │  │  - HashPack         │            │
│ │  - Session Mgmt    │   │  │  │  - Blade            │            │
│ └────────────────────┘   │  │  │  (HashConnect)      │            │
│                          │  │  └─────────────────────┘            │
│ ┌────────────────────┐   │  │                                     │
│ │  Edge Functions    │   │  │  ┌─────────────────────┐            │
│ │                    │   │  │  │  Hedera Mirror      │            │
│ │  create-loan-token ├───┼──┼─►│  Node API           │            │
│ │  (TokenCreate)     │   │  │  │  - Transaction      │            │
│ │                    │   │  │  │    History          │            │
│ │  process-investment├───┼──┼─►│  - Balance Queries  │            │
│ │  (Transfer HBAR/   │   │  │  │  - Token Info       │            │
│ │   Tokens)          │   │  │  └─────────────────────┘            │
│ └────────────────────┘   │  │                                     │
└──────────────────────────┘  └─────────────────────────────────────┘

DATA FLOW:
─────────
1. Student applies → Frontend → Supabase (store loan) → Edge Function 
   → HTS TokenCreate → Update DB with Token ID

2. Investor funds loan → Frontend (wallet signature) → Edge Function 
   → HTS Transfer (HBAR + Tokens) → Update DB investment record

3. Query loan data → Frontend → Supabase PostgreSQL → Display UI

4. Wallet connection → Frontend → HashConnect → HashPack/Blade 
   → Hedera Account Info
```

### Component Interaction Flow

**Loan Creation Flow:**
```
Student → Vue Frontend → Supabase Auth (verify) → PostgreSQL (create loan record) 
→ Edge Function create-loan-token → HTS TokenCreateTransaction 
→ PostgreSQL (update loan with token_id) → Frontend (display confirmation)
```

**Investment Flow:**
```
Investor → Vue Frontend → Wallet Connection (HashConnect) 
→ Frontend (select loan, amount) → Edge Function process-investment 
→ HTS TransferTransaction (HBAR → Treasury, Tokens → Investor) 
→ PostgreSQL (record investment) → Frontend (show success)
```

**Data Retrieval Flow:**
```
User → Vue Frontend → Supabase PostgreSQL (query loans/investments) 
→ Hedera Mirror Node (optional: verify token balances) → Frontend (render data)
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Git
- Hedera testnet account ([portal.hedera.com](https://portal.hedera.com/))
- Modern web browser with wallet support (HashPack or Blade)
- Supabase account (for backend services)

### Installation

```bash
# Clone the repository
git clone https://github.com/ryurina/MintEdu.git
cd MintEdu

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Configure your .env.local (see Environment Variables section below)
# IMPORTANT: Never commit .env.local or any file containing private keys!
```

### Environment Variables

**⚠️ SECURITY WARNING: DO NOT commit private keys, .env files, or sensitive credentials to version control!**

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# WalletConnect Configuration
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_id

# Hedera Configuration (for Edge Functions - DO NOT expose in frontend!)
# These should be set in Supabase Edge Function secrets, NOT in .env.local
# HEDERA_OPERATOR_ID=0.0.xxxxx
# HEDERA_OPERATOR_KEY=302e... (NEVER commit this!)

# Optional: Feature Flags
VITE_ENABLE_TESTNET=true
VITE_ENABLE_ANALYTICS=true
```

**Edge Function Secrets (Supabase Dashboard):**
```bash
# Set these in Supabase > Edge Functions > Secrets
supabase secrets set HEDERA_OPERATOR_ID=0.0.xxxxx
supabase secrets set HEDERA_OPERATOR_KEY=302e...your-private-key
```

### Running Environment

```bash
# Start the development server
# This launches the Vue 3 frontend on localhost:5173
npm run dev

# The application will be accessible at:
# http://localhost:5173

# Backend services (Supabase Edge Functions) run on Supabase's infrastructure
# and are called via API endpoints from the frontend
```

### Getting Hedera Testnet Tokens

1. Go to [portal.hedera.com](https://portal.hedera.com/)
2. Create or sign in to your account
3. Select **Testnet**
4. Create account to get testnet HBAR tokens (usually 10,000 HBAR for testing)
5. Save your Account ID (e.g., `0.0.1234567`) and Private Key securely
6. Use your account ID in the Supabase Edge Function secrets

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview

# The dist/ folder contains the production-ready static files
```

---

## 📁 Project Structure

```
MintEdu/
├── src/
│   ├── components/        # Reusable Vue components
│   │   ├── LoanCard.vue
│   │   ├── WalletConnect.vue
│   │   └── InvestmentModal.vue
│   ├── stores/           # Pinia state management
│   │   ├── auth.js       # Authentication state
│   │   ├── wallet.js     # Wallet connection state
│   │   └── loans.js      # Loan data state
│   ├── views/            # Page components
│   │   ├── HomeView.vue
│   │   ├── PrivacyView.vue
│   │   ├── StudentDashboard.vue
│   │   └── InvestorDashboard.vue
│   ├── services/         # API and blockchain services
│   │   ├── hederaService.js    # Hedera SDK wrapper
│   │   ├── authService.js      # Supabase auth wrapper
│   │   └── loanService.js      # Loan CRUD operations
│   ├── composables/      # Vue composables
│   │   ├── useWallet.js        # Wallet connection logic
│   │   └── useLoans.js         # Loan data fetching
│   ├── App.vue          # Root component
│   └── main.js          # Application entry point
├── supabase/            # Supabase backend configuration
│   └── functions/       # Edge Functions (serverless backend)
│       ├── create-loan-token/
│       │   └── index.ts        # HTS TokenCreateTransaction
│       └── process-investment/
│           └── index.ts        # HTS TransferTransaction
├── public/              # Static assets
├── docs/               # Documentation
│   ├── USER_GUIDE.md
│   ├── API_DOCUMENTATION.md
│   ├── HEDERA_INTEGRATION.md
│   └── ARCHITECTURE.md
├── .env.example        # Environment template (safe to commit)
├── .env.local          # Local environment (NEVER COMMIT!)
├── .gitignore          # Excludes .env.local, node_modules, etc.
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite build configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── .eslintrc.js        # ESLint code quality rules
├── .prettierrc         # Prettier code formatting rules
└── README.md          # This file
```

---

## 🔧 Technology Stack

### Frontend

- **Vue 3** - Progressive JavaScript framework with Composition API
- **Vite** - Next-generation build tool (fast HMR, optimized builds)
- **Tailwind CSS** - Utility-first CSS framework
- **Pinia** - State management (Vue 3 official store)
- **Vue Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend & Database

- **Supabase PostgreSQL** - Open-source database with real-time subscriptions
- **Supabase Auth** - Built-in authentication service (email/password, 2FA)
- **Supabase Edge Functions** - Serverless Deno functions for backend logic
  - `create-loan-token`: Executes HTS TokenCreateTransaction
  - `process-investment`: Executes HTS TransferTransaction

### Blockchain

- **Hedera Hashgraph** - DLT with aBFT consensus
- **Hedera Token Service (HTS)** - Native token creation & management
- **HashConnect** - Wallet connection protocol (WalletConnect for Hedera)
- **HashPack / Blade** - Wallet providers for testnet/mainnet
- **Hedera SDK (npm:@hashgraph/sdk@^2.40.0)** - Official JavaScript SDK

### Development Tools

- **ESLint** - Code quality linting
- **Prettier** - Code formatting
- **Vitest** - Unit testing framework
- **Playwright** - E2E testing

---

## 🔷 Hedera Integration Details

### Deployed Hedera IDs (Testnet)

**⚠️ Important:** Each student loan creates a **unique Token ID** when the loan application is approved. Token IDs are dynamically generated and stored in the Supabase database.

**Example Loan Tokens:**
```
Loan #1: 0.0.4567890 (Student: Alice - Computer Science)
Loan #2: 0.0.4567891 (Student: Bob - Engineering)
Loan #3: 0.0.4567892 (Student: Carol - Medicine)
```

**Platform Accounts:**
```
Treasury Account: 0.0.1234567
(This account is used by Edge Functions to mint and distribute tokens)
```

**Viewing Tokens on HashScan:**
You can view any created token on the Hedera testnet explorer:
```
https://hashscan.io/testnet/token/YOUR_TOKEN_ID
```

Example: `https://hashscan.io/testnet/token/0.0.4567890`

**Retrieving Token IDs:**
- Frontend: Query Supabase `loans` table for `token_id` field
- Edge Function: Returns token ID after successful TokenCreateTransaction
- HashScan: Search by transaction ID or account ID

### Token Creation Process

When a student applies for a loan:

1. **Frontend** → Student submits loan application
2. **Supabase** → Stores loan details in PostgreSQL
3. **Edge Function** (`create-loan-token`) triggered:
   ```typescript
   // Simplified code from create-loan-token/index.ts
   const tokenCreateTx = new TokenCreateTransaction()
     .setTokenName(`MintEdu Loan ${loanId}`)
     .setTokenSymbol(`MEDU${loanId}`)
     .setTokenType(TokenType.FungibleCommon)
     .setSupplyType(TokenSupplyType.Finite)
     .setInitialSupply(loanAmount) // e.g., 5000 (=$5000)
     .setTreasuryAccountId(treasuryAccountId)
     .setAdminKey(adminKey)
     .setSupplyKey(supplyKey);
   
   const receipt = await tokenCreateTx.execute(client);
   const tokenId = receipt.tokenId; // e.g., 0.0.4567890
   ```
4. **Supabase** → Updates loan record with generated `token_id`
5. **Frontend** → Displays token ID to student and investors

### Investment Transaction Process

When an investor funds a loan:

1. **Frontend** → Investor selects loan and investment amount
2. **Wallet** → HashConnect prompts for transaction signature
3. **Edge Function** (`process-investment`) triggered:
   ```typescript
   // Simplified code from process-investment/index.ts
   const transferTx = new TransferTransaction()
     // Investor sends HBAR to treasury
     .addHbarTransfer(investorAccountId, -investmentAmount)
     .addHbarTransfer(treasuryAccountId, investmentAmount)
     // Treasury sends loan tokens to investor
     .addTokenTransfer(tokenId, treasuryAccountId, -tokenAmount)
     .addTokenTransfer(tokenId, investorAccountId, tokenAmount);
   
   await transferTx.execute(client);
   ```
4. **Supabase** → Records investment in `investments` table
5. **Frontend** → Confirms transaction and updates investor portfolio

### Wallet Integration

**Supported Wallets:**
- **HashPack** (Recommended): Browser extension wallet
- **Blade**: Alternative Hedera wallet with mobile support

**Connection Flow:**
```javascript
// Frontend: useWallet composable
import { HashConnect } from 'hashconnect';

const hashconnect = new HashConnect();

// Initialize connection
await hashconnect.init({
  name: 'MintEdu',
  description: 'Decentralized Education Financing',
  icon: 'https://mintedu.com/logo.png'
});

// Pair with wallet
const pairing = await hashconnect.connectToLocalWallet();
const accountId = pairing.accountIds[0]; // e.g., 0.0.9876543

// Save to Pinia store
walletStore.setConnected(accountId, pairing);
```

**Transaction Signing:**
All blockchain transactions require user approval via their connected wallet:
1. Frontend initiates transaction
2. HashConnect sends signing request to wallet
3. User approves in HashPack/Blade
4. Signed transaction sent to Hedera network
5. Confirmation returned to frontend

---

## 🔒 Security & Compliance

### Security Features

- ✅ **Multi-factor authentication (2FA)** - Supabase Auth with TOTP
- ✅ **Secure password hashing** - Bcrypt with salt rounds
- ✅ **Role-based access control (RBAC)** - Student vs. Investor permissions
- ✅ **Row Level Security (RLS)** - Supabase database policies
- ✅ **Environment variable protection** - Secrets never committed to Git
- ✅ **Regular security audits** - Quarterly third-party audits
- ✅ **Input validation & sanitization** - Frontend and backend validation
- ✅ **Rate limiting** - Supabase Edge Functions rate limits
- ✅ **HTTPS enforcement** - All API calls encrypted in transit

**⚠️ CRITICAL: NEVER commit the following to version control:**
- `.env.local` (contains API keys)
- Private keys or seed phrases
- Supabase service role keys
- Any file in `.env*` format (except `.env.example`)

**Secure Configuration Checklist:**
```bash
# ✅ Good: Template file (safe to commit)
.env.example

# ❌ BAD: Never commit these!
.env
.env.local
.env.production
.env.development

# Verify .gitignore includes:
.env.local
.env*.local
*.key
*.pem
```

### Compliance

- **KYC/AML** - Know Your Customer & Anti-Money Laundering
  - Identity verification for students (government ID)
  - Investor accreditation checks (income verification)
  - Automated sanctions screening
  
- **GDPR** - General Data Protection Regulation compliant
  - User data export functionality
  - Right to be forgotten (account deletion)
  - Consent management for data processing
  - Data processing agreements with Supabase

- **Data Retention**
  - User data: Retained until account deletion
  - Transaction logs: 7 years (financial compliance)
  - Analytics: 90 days (anonymized)
  - Backups: 30 days encrypted snapshots

### Data Protection

- **Encryption at Rest** - Supabase PostgreSQL encrypted storage
- **Encryption in Transit** - TLS 1.3 for all API calls
- **Backup Strategy** - Daily automated backups, encrypted with AES-256
- **Access Logging** - All database queries logged with user attribution
- **Password Policies** - Minimum 12 characters, complexity requirements

---

## 📖 Documentation

Comprehensive documentation available in the `/docs` folder:

- **[USER_GUIDE.md](./docs/USER_GUIDE.md)** - User guide for students and investors
- **[API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md)** - REST API & Supabase reference
- **[HEDERA_INTEGRATION.md](./docs/HEDERA_INTEGRATION.md)** - Hedera HTS & wallet integration
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System architecture deep dive
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Production deployment guide
- **[TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)** - Common issues and solutions

---

## 💰 How It Works

### Student Flow

1. **Sign Up** - Create account with email/password (Supabase Auth)
2. **Enable 2FA** - Set up two-factor authentication for security
3. **Apply for Loan** - Submit loan application with:
   - Education details (institution, program, duration)
   - Loan amount requested
   - Repayment timeline
   - Supporting documents
4. **Identity Verification** - Upload government ID for KYC
5. **Loan Token Creation** - Upon approval, Edge Function creates unique HTS token
6. **Funding Period** - Loan listed publicly for investor funding
7. **Receive Funds** - Connect HashPack/Blade wallet to receive HBAR when fully funded
8. **Repayment** - Make scheduled repayments via wallet transactions

### Investor Flow

1. **Sign Up & KYC** - Create account and complete identity verification
2. **Connect Wallet** - Link HashPack or Blade wallet via HashConnect
3. **Fund Wallet** - Ensure sufficient HBAR balance for investments
4. **Browse Loans** - Explore available student loan opportunities:
   - Filter by loan amount, interest rate, duration
   - View student profiles (anonymized)
   - Check funding progress and time remaining
5. **Select Investment** - Choose loan(s) and investment amount
6. **Sign Transaction** - Approve transfer in connected wallet:
   - HBAR sent to treasury account
   - Loan tokens transferred to investor wallet
7. **Track Returns** - Monitor loan performance in dashboard:
   - Repayment schedule and history
   - Earned interest (distributed as HBAR)
   - Portfolio diversification metrics
8. **Receive Repayments** - Automatic HBAR distributions as students repay loans

### Platform Economics

**Zero Fee for Students:**
- No origination fees
- No intermediary charges
- Only pay agreed interest rate to investors

**Sustainable Revenue Model:**
- Platform fee: 1% of interest earned by investors
- Covered by Hedera's low transaction costs ($0.0001)
- Volume-based profitability (not per-transaction margin)

**Example Loan:**
```
Loan Amount: $5,000 HBAR
Interest Rate: 15% APR
Duration: 2 years
Platform Token: 0.0.4567890 (5000 tokens minted)

Investor A: Invests $1,000 HBAR (1000 tokens)
Investor B: Invests $2,000 HBAR (2000 tokens)
Investor C: Invests $2,000 HBAR (2000 tokens)

Student Repays: $5,750 HBAR total over 2 years
Interest Distribution:
- Investor A: $150 HBAR (1000/5000 * $750 interest)
- Investor B: $300 HBAR (2000/5000 * $750 interest)
- Investor C: $300 HBAR (2000/5000 * $750 interest)
- Platform Fee: $7.50 HBAR (1% of total interest)

Hedera Costs:
- Token Creation: $0.0001
- 3 Investment Txs: $0.0003
- 24 Repayment Txs: $0.0024
Total: $0.0028 (negligible vs. $7.50 revenue)
```

---

## 🎯 Key Pages

### Public Pages

- **Home** (`/`) - Landing page with hero, features, call-to-action
- **Browse Loans** (`/browse`) - Public loan listings (authentication optional)
- **About** (`/about`) - Mission, team, and how it works
- **Privacy Policy** (`/privacy`) - Privacy & data protection policies
- **Terms of Service** (`/terms`) - Legal terms and conditions
- **Contact** (`/contact`) - Contact form and support information

### Authenticated Pages

**Student Portal:**
- **Student Dashboard** (`/student`) - Loan applications, funding status, repayment schedule
- **Apply for Loan** (`/student/apply`) - New loan application form
- **My Loans** (`/student/loans`) - Active and past loans
- **Repayments** (`/student/repayments`) - Payment history and upcoming payments
- **Settings** (`/settings`) - Account settings, 2FA, privacy preferences

**Investor Portal:**
- **Investor Dashboard** (`/investor`) - Portfolio overview, active investments, returns
- **Browse Opportunities** (`/investor/browse`) - Available loans with filters
- **My Investments** (`/investor/investments`) - Investment history and performance
- **Loan Details** (`/loans/:id`) - Detailed loan information and investment flow
- **Settings** (`/settings`) - Account settings, wallet management

---

## 🧪 Testing

```bash
# Run unit tests (Vitest)
npm run test:unit

# Run unit tests in watch mode
npm run test:watch

# Run integration tests
npm run test:integration

# Run E2E tests (Playwright - requires dev server running)
npm run test:e2e

# Generate code coverage report
npm run test:coverage

# Lint code (ESLint)
npm run lint

# Format code (Prettier)
npm run format
```

**Testing Checklist:**
- ✅ Unit tests for Vue components and composables
- ✅ Integration tests for Supabase Edge Functions
- ✅ E2E tests for critical user flows (loan creation, investment)
- ✅ Wallet connection mocking for testnet
- ✅ HTS transaction simulation tests

---

## 🚢 Deployment

### Development Environment

```bash
# Start local development server
npm run dev
# Runs on http://localhost:5173

# Supabase Edge Functions run on Supabase cloud (even in dev)
# Local Edge Function development (optional):
supabase functions serve
```

### Production Build

```bash
# Create optimized production build
npm run build

# Output directory: dist/
# Contains minified HTML, CSS, JS, and assets

# Test production build locally
npm run preview
# Runs on http://localhost:4173
```

### Deployment Options

**Option 1: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Option 2: Netlify**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Production deployment
netlify deploy --prod
```

**Option 3: Cloudflare Pages**
```bash
# Connect GitHub repo to Cloudflare Pages
# Build command: npm run build
# Output directory: dist
```

**Environment Variables (Production):**
Set the following in your deployment platform:
```
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_id
VITE_ENABLE_TESTNET=false
```

**Supabase Edge Functions Deployment:**
```bash
# Deploy Edge Functions to Supabase
supabase functions deploy create-loan-token
supabase functions deploy process-investment

# Set production secrets
supabase secrets set HEDERA_OPERATOR_ID=0.0.xxxxx --env-file .env.production
supabase secrets set HEDERA_OPERATOR_KEY=302e...
```

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for complete production deployment guide.

---

## 🔌 Code Examples

### Wallet Connection (HashConnect)

```javascript
// src/composables/useHashConnect.js
import { ref } from 'vue'
import { HashConnect } from '@hashgraph/hashconnect'

const hashconnect = ref(null)
const connected = ref(false)
const accountId = ref(null)

export function useHashConnect() {
  const init = async () => {
    if (hashconnect.value) return

    hashconnect.value = new HashConnect(true) // debug mode

    const appMetadata = {
      name: 'MintEdu',
      description: 'Decentralized education financing',
      icon: 'https://mintedu.com/icon.png',
      url: window.location.origin
    }

    // Initialize HashConnect with testnet
    const initData = await hashconnect.value.init(
      appMetadata, 
      'testnet', 
      false
    )

    // Listen for successful pairing
    hashconnect.value.pairingEvent.on((pairingData) => {
      connected.value = true
      accountId.value = pairingData.accountIds[0]
      console.log('Connected wallet:', accountId.value)
    })

    // Listen for disconnection
    hashconnect.value.disconnectionEvent.on(() => {
      connected.value = false
      accountId.value = null
    })

    return initData
  }

  const connect = async () => {
    const initData = await init()
    
    // Generate pairing string for wallet connection
    const pairingString = hashconnect.value.generatePairingString(
      initData.topic,
      'testnet',
      false
    )

    // Mobile: Open HashPack app directly
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = 
        `https://hashpack.app/connect?pairingString=${pairingString}`
    } else {
      // Desktop: User approves in browser extension
      alert('Please approve connection in HashPack extension