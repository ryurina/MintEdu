# MintEdu 🎓💚

**Decentralized Education Financing Powered by Hedera**

MintEdu is a Web3 platform that revolutionizes education financing by connecting students directly with community investors through blockchain technology. Say goodbye to traditional lending gatekeepers and hello to transparent, accessible education funding.

![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

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
  - Built on Hedera network (eco-friendly, fast, secure)
  - End-to-end encryption
  - Multi-factor authentication
  - Real-time transaction settlement
  - Comprehensive KYC/AML compliance
  - Identity verification integration

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Vue 3
- Hedera account with testnet HBAR tokens
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/mintedu/mintedu.git
cd mintedu

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Configure your .env.local
VITE_HEDERA_NETWORK=testnet
VITE_HEDERA_ACCOUNT_ID=your_account_id
VITE_HEDERA_PRIVATE_KEY=your_private_key
VITE_API_URL=http://localhost:3000

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
mintedu/
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

### Backend (Not included)
- Node.js with Express
- MongoDB for database
- JWT authentication
- Socket.io for real-time updates

### Blockchain
- **Hedera Hashgraph** - Consensus service
- **Hedera Smart Contracts** - Smart contract execution
- **Hedera Token Service** - Token management

## 🔐 Security & Compliance

### Security Features
- End-to-end encryption for sensitive data
- Multi-factor authentication (2FA)
- Role-based access control (RBAC)
- Regular security audits
- Secure password hashing with bcrypt
- SQL injection prevention with parameterized queries
- CSRF protection

### Compliance
- **KYC/AML** - Know Your Customer & Anti-Money Laundering
- **GDPR** - General Data Protection Regulation compliant
- **SOC 2 Type II** - Security & availability audited
- **PCI DSS** - Payment Card Industry standards

### Data Protection
- AES-256 encryption at rest
- TLS 1.3 encryption in transit
- Regular backups (encrypted)
- Data anonymization for analytics
- 90-day log retention policy

## 📖 Documentation

Comprehensive documentation available in the `/docs` folder:

- **[USER_GUIDE.md](./docs/USER_GUIDE.md)** - User guide for students and investors
- **[API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md)** - REST API reference
- **[SMART_CONTRACTS.md](./docs/SMART_CONTRACTS.md)** - Smart contract deployment guide
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
# Hedera Configuration
VITE_HEDERA_NETWORK=testnet
VITE_HEDERA_ACCOUNT_ID=0.0.xxxxx
VITE_HEDERA_PRIVATE_KEY=xxxxx

# API Configuration
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=30000

# Firebase/Auth Configuration
VITE_FIREBASE_CONFIG={}
VITE_AUTH_DOMAIN=auth.mintedu.com

# Feature Flags
VITE_ENABLE_TESTNET=true
VITE_ENABLE_ANALYTICS=true
```

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
1. Sign up and verify identity
2. Create loan application
3. Provide education details
4. Wait for verification
5. Loan listed on platform
6. Receive funding once fully funded
7. Make repayments over time

### Investor Flow
1. Sign up and pass KYC
2. Browse available loans
3. Select loans to fund
4. Receive earned interest
5. Track investment performance
6. Withdraw profits

## 📊 Smart Contracts

MintEdu uses Hedera Smart Contracts for:
- Loan issuance and management
- Payment processing
- Interest calculation and distribution
- Escrow services
- Dispute resolution

See [SMART_CONTRACTS.md](./docs/SMART_CONTRACTS.md) for deployment details.

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

### Staging
```bash
npm run build
npm run preview
```

### Production
See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for complete production deployment guide.

Quick start:
```bash
npm run build
npm run build:api  # Build backend
docker compose up  # Start with Docker
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

- **Website**: [mintedu.com](https://mintedu.com)
- **Discord**: [Join Community](https://discord.gg/mintedu)
- **Twitter**: [@MintEdu](https://twitter.com/mintedu)
- **Email**: hello@mintedu.com

## 📧 Support

- **Documentation**: [docs.mintedu.com](https://docs.mintedu.com)
- **Help Center**: [support.mintedu.com](https://support.mintedu.com)
- **Email**: support@mintedu.com
- **Discord**: Community support channel

## ⚠️ Disclaimer

MintEdu is a financial platform. Investing and lending involve risk. Past performance does not guarantee future results. Always do your own research before making investment decisions.

## 🙏 Acknowledgments

- Built with Vue 3, Tailwind CSS, and Hedera
- Inspired by accessible finance principles
- Thanks to our community and early adopters

---

**Made with ❤️ to democratize education financing**