# Proofa

A modern, minimal, and technically sophisticated website for a privacy-focused cryptography company.

Proofa specializes in **zero-knowledge proofs**, **smart contract engineering**, and **Web3 privacy infrastructure**. The website is designed to reflect academic rigor, cryptographic precision, and deep technical expertise — without the typical flashy blockchain aesthetic.

---

## ✨ Project Overview

Proofa is a professional digital presence for a company working at the forefront of privacy-preserving technology. The design emphasizes **mathematical elegance**, **trust**, and **clarity** — values core to zero-knowledge cryptography.

### Brand Positioning
- Cryptographic proof engineering
- Privacy-preserving computation
- Zero-knowledge technology consulting & development
- Secure Web3 infrastructure

---

## 🎨 Design Philosophy

- **Minimal & Clean** UI
- **Dark theme** as default (professional and focused)
- Geometric spacing and structured typography
- Subtle use of blue as primary accent color
- High contrast for excellent readability
- No excessive gradients, animations, or decorative elements

**Logo Concept**: A chained double “O” symbol representing blockchain linkage and infinite trust verification.

---

## 📋 Website Sections

- **Landing Hero** — Strong technical branding with impactful tagline
- **About / Philosophy** — Mission and values in privacy infrastructure
- **Expertise / Services**
  - Zero-Knowledge Proof Development
  - Smart Contract Engineering
  - Web3 Privacy Solutions
  - Cryptographic System Design
- **Projects** — Showcase of technical work (with dedicated dynamic routes)
- **Blog** — In-depth technical articles on cryptography, ZK, and privacy
- **DApp Interaction** — Wallet connection + basic blockchain interaction demo
- **Contact / Collaboration**

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** component library

### Development Practices
- Modular & reusable component architecture
- Static-first rendering (where possible)
- Mobile-first responsive design
- Future-proof for Web3 integration (wagmi, viem, etc.)

### Styling
- Global styles in `globals.css`
- Layout management via `app/layout.tsx`

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm / npm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/proofa.git
cd proofa

# Install dependencies
pnpm install
# or
npm install

### Development
pnpm dev
# or
npm run dev

###PRoject structure
proofa/
├── app/
│   ├── (site)/
│   ├── blog/
│   ├── projects/
│   ├── dapp/
│   └── layout.tsx
├── components/
│   ├── ui/          # shadcn/ui components
│   ├── layout/
│   └── sections/
├── lib/
├── public/
├── styles/
│   └── globals.css
└── README.md
