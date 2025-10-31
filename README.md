# MintEdu

## Onchain Finance & Real-World Assets (RWA)

**Decentralized Education Financing Powered by Hedera**

MintEdu is a Web3 platform that revolutionizes education financing by connecting students directly with community investors through blockchain technology. Say goodbye to traditional lending gatekeepers and hello to transparent, accessible education funding.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

**Pitch Deck**: [mint-edu.vercel.app/pitch_deck_mintedu.pdf](https://mint-edu.vercel.app/pitch_deck_mintedu.pdf)

**Certification**: [Hedera Certification](https://certs.hashgraphdev.com/a9ecf0ec-93f3-4de4-a4a2-ac8999f98f55.pdf)

**Repository**: [github.com/ryurina/MintEdu](https://github.com/ryurina/MintEdu)

**Demo MVP**: [mint-edu.vercel.app/](https://mint-edu.vercel.app/)


**Demo Video**: [youtube.com/watch?v=3gWLTVRbSN0](https://youtube.com/watch?v=3gWLTVRbSN0)
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

### Prerequisites

- Node.js 16+ and npm/yarn
- Git
- Hedera testnet account ([portal.hedera.com](https://portal.hedera.com/))
- Reown (cloud walletconnect) for hashconnect([cloud.reown.com](https://cloud.reown.com/))
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
cp .env.example .env

# Configure your .env.local (see Environment Variables section below)
# IMPORTANT: Never commit .env or any file containing private keys!
```

**Supabase Database setup (SQL Editor):**
Copy the content of the file "supabase/sql_schema.sql" to SQL Editor on Supabase and run it.

**Edge Function Secrets (Supabase Dashboard):**

```bash
# Set these in Supabase > Edge Functions > Secrets
supabase secrets set HEDERA_OPERATOR_ID=0.0.xxxxx
supabase secrets set HEDERA_OPERATOR_KEY=302e...your-private-key

# Deploying the Edge Functions:
supabase functions deploy process-investment
supabase functions deploy create-loan-token
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

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview

# The dist/ folder contains the production-ready static files
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

---

## ⚠️ Disclaimer

MintEdu is a financial platform. Investing and lending involve risk. Past performance does not guarantee future results. Always do your own research before making investment decisions.

---

@ryurina
