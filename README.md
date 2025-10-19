# MintEdu 🎓💚

**Decentralized Education Financing Powered by Hedera**

MintEdu is a Web3 platform that revolutionizes education financing by connecting students directly with community investors through blockchain technology. Say goodbye to traditional lending gatekeepers and hello to transparent, accessible education funding.

![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

**Repository**: [github.com/ryurina/MintEdu](https://github.com/ryurina/MintEdu)

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

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Git
- Hedera testnet account ([portal.hedera.com](https://portal.hedera.com/))
- Modern web browser with wallet support (HashPack or Blade)

### Installation

```bash
# Clone the repository
git clone https://github.com/ryurina/MintEdu.git
cd MintEdu

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Configure your .env.local
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will run at **http://localhost:5173**

## 📁 Project Structure

```
MintEdu/
├── src/
│   ├── components/        # Reusable Vue components
│   ├── stores/           # Pinia state management
│   ├── views/            # Page components
│   │   ├── HomeView.vue
│   │   ├── PrivacyView.vue
│   │   ├── StudentDashboard.vue
│   │   └── InvestorDashboard.vue
│   ├── services/         # API and blockchain services
│   │   ├── hederaService.js
│   │   ├── authService.js
│   │   └── loanService.js
│   ├── composables/      # Vue composables
│   ├── App.vue          # Root component
│   └── main.js          # Application entry point
├── public/              # Static assets
├── docs/               # Documentation
├── .env.example        # Environment template
├── package.json        # Dependencies
└── README.md          # This file
```

## 🔧 Technology Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next-generation build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Axios** - HTTP client

### Backend & Database
- **Supabase** - PostgreSQL database
- **Supabase Auth** - Authentication service
- **Supabase Edge Functions** - Serverless functions

### Blockchain
- **Hedera Hashgraph** - Consensus service
- **Hedera Token Service (HTS)** - Token creation & management
- **HashConnect** - Wallet connection protocol
- **HashPack / Blade** - Wallet providers

## 🔐 Security & Compliance

### Security Features
- Multi-factor authentication (2FA)
- Secure password hashing with bcrypt
- Role-based access control (RBAC)
- Regular security audits
- Secure Supabase configuration
- Environment variable protection

### Compliance
- **KYC/AML** - Know Your Customer & Anti-Money Laundering
- **GDPR** - General Data Protection Regulation compliant
- Identity verification integration
- Regular data backups (encrypted)
- Data anonymization for analytics

### Data Protection
- Supabase Row Level Security (RLS)
- Encrypted sensitive data
- Regular backups with encryption
- 90-day log retention policy
- Secure password policies

## 📖 Documentation

Comprehensive documentation available in the `/docs` folder:

- **[USER_GUIDE.md](./docs/USER_GUIDE.md)** - User guide for students and investors
- **[API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md)** - REST API & Supabase reference
- **[HEDERA_INTEGRATION.md](./docs/HEDERA_INTEGRATION.md)** - Hedera HTS & wallet integration
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System architecture overview
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Production deployment guide
- **[TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)** - Common issues and solutions

## 🛠️ Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint

# Format code with Prettier
npm run format

# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Type check
npm run type-check
```

### Environment Variables

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# WalletConnect Configuration
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_id

# Optional: Feature Flags
VITE_ENABLE_TESTNET=true
VITE_ENABLE_ANALYTICS=true
```

### Getting Hedera Testnet Tokens

1. Go to [portal.hedera.com](https://portal.hedera.com/)
2. Create or sign in to your account
3. Select **Testnet**
4. Create account to get testnet HBAR tokens
5. Use your account ID in the application

### Checking Created Tokens

View tokens you've created on the Hedera testnet:

```
https://hashscan.io/testnet/token/YOUR_TOKEN_ID
```

Example: `https://hashscan.io/testnet/token/0.0.12345678`

## 🎯 Key Pages

### Public Pages
- **Home** (`/`) - Landing page with hero, features, CTA
- **Privacy Policy** (`/privacy`) - Privacy & data protection
- **Terms of Service** (`/terms`) - Legal terms
- **Contact** (`/contact`) - Contact form

### Authenticated Pages
- **Student Dashboard** (`/student`) - View loans, make payments
- **Investor Dashboard** (`/investor`) - Browse loans, manage investments
- **Loan Details** (`/loans/:id`) - View loan information
- **Browse Loans** (`/browse`) - Browse available loan opportunities
- **Settings** (`/settings`) - Account & privacy settings

## 💰 How It Works

### Student Flow
1. Sign up with email and password (Supabase Auth)
2. Verify identity with 2FA
3. Create loan application
4. Provide education details
5. Wait for verification
6. Loan listed on platform
7. Connect wallet (HashPack/Blade) to receive funds
8. Make repayments over time

### Investor Flow
1. Sign up and pass KYC (Supabase Auth)
2. Connect Hedera wallet (HashConnect)
3. Browse available loans
4. Select loans to fund
5. Confirm investment and sign transaction
6. Receive earned interest
7. Track investment performance
8. Withdraw profits

## 🔗 Hedera Integration

### Token Management
- Create custom tokens using Hedera Token Service (HTS)
- Token transfers via wallet connections
- Real-time balance updates

### Wallet Connection
- **HashPack** - Browser extension wallet
- **Blade** - Alternative Hedera wallet
- HashConnect protocol for secure connections

### Transaction Processing
- Sign transactions with connected wallet
- Real-time transaction status updates
- View transactions on [HashScan](https://hashscan.io/testnet)

## 🧪 Testing

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests (requires running dev server)
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 🚢 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for complete production deployment guide.

Quick start with Vercel/Netlify:
```bash
npm run build
# Deploy the dist/ folder
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

## 🔗 Links

- **Repository**: [github.com/ryurina/MintEdu](https://github.com/ryurina/MintEdu)
- **Hedera Portal**: [portal.hedera.com](https://portal.hedera.com/)
- **HashScan**: [hashscan.io](https://hashscan.io/testnet)
- **HashPack Wallet**: [hashpack.app](https://www.hashpack.app/)
- **Blade Wallet**: [bladewallet.io](https://bladewallet.io/)
- **Email**: hello@mintedu.com

## 📧 Support

- **Documentation**: See `/docs` folder
- **Issues**: [GitHub Issues](https://github.com/ryurina/MintEdu/issues)
- **Email**: support@mintedu.com
- **Discussions**: [GitHub Discussions](https://github.com/ryurina/MintEdu/discussions)

## ⚠️ Disclaimer

MintEdu is a financial platform. Investing and lending involve risk. Past performance does not guarantee future results. Always do your own research before making investment decisions.

This is a testnet application. Do not use real funds.

## 🙏 Acknowledgments

- Built with Vue 3, Tailwind CSS, Vite, and Hedera
- Powered by Supabase for backend services
- Inspired by accessible finance principles
- Thanks to the Hedera community and early adopters

---

**Made with ❤️ to democratize education financing**