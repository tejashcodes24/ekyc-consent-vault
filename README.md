# e-KYC & Consent Vault

A decentralized identity verification system built on Ethereum that allows users to control who can verify their KYC credentials without repeatedly submitting sensitive documents.

## 🌟 Features

- **Privacy-First**: Only document hashes are stored on-chain, never the actual files
- **User Control**: Holders can grant/revoke verifier access anytime
- **Reusable KYC**: Verify once, use everywhere with consent
- **Transparent**: All verification attempts are auditable on-chain
- **Decentralized**: No central authority controls your credentials

## 🏗️ Architecture

```
┌─────────────┐
│   Browser   │ (File hashing happens here)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  MetaMask   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Sepolia   │ (Smart Contract)
│  Testnet    │
└─────────────┘
```

## 🎭 Roles

### Issuer
Trusted entities that perform KYC verification (banks, government agencies, etc.)
- Issues KYC credentials by storing document hash
- Can revoke credentials if needed

### Holder
Individual users who own their identity
- Controls consent for verifiers
- Can grant/revoke access anytime
- Owns their credential

### Verifier
Entities that need to verify identity (marketplaces, lenders, employers)
- Can only verify if holder grants consent
- Checks document hash against on-chain record
- No access to actual documents

## 📋 Smart Contract

**Contract Address (Sepolia):** `0xDDc0F74A4528aEB06e81615B2B294FeCC757f17C`

**View on Etherscan:** [https://sepolia.etherscan.io/address/0xDDc0F74A4528aEB06e81615B2B294FeCC757f17C](https://sepolia.etherscan.io/address/0xDDc0F74A4528aEB06e81615B2B294FeCC757f17C)

### Key Functions

- `issueKyc(address holder, bytes32 documentHash)` - Issue a KYC credential
- `grantConsent(address verifier)` - Grant verification access
- `revokeConsent(address verifier)` - Revoke verification access
- `verifyKyc(address holder, bytes32 documentHash)` - Verify KYC credential
- `getKycRecord(address holder)` - Get KYC record details

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MetaMask wallet
- Sepolia test ETH ([Get from faucet](https://sepoliafaucet.com/))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ekyc-consent-vault.git
cd ekyc-consent-vault

# Install contract dependencies
cd contracts
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running Locally

**Frontend:**
```bash
cd frontend
npm run dev
```

Visit http://localhost:3000

**Deploying Contract:**
```bash
cd contracts
npx hardhat run scripts/deploy.js --network sepolia
```

## 🔐 How It Works

### Document Hashing
1. User selects a document file (PDF, image, etc.)
2. File is hashed using SHA3/Keccak256 **in the browser**
3. Only the 32-byte hash is sent to the blockchain
4. Original file never leaves the user's device

### Verification Process
1. Issuer stores document hash on-chain during KYC issuance
2. Holder grants consent to specific verifier addresses
3. Verifier uploads the same document file
4. App computes hash and compares with on-chain record
5. Verification succeeds only if:
   - Hash matches
   - Consent is granted
   - KYC is still valid

## 🧪 Testing

### Manual Testing Flow

**1. Setup (3 MetaMask accounts):**
- Account A: Issuer
- Account B: Holder
- Account C: Verifier

**2. Issue KYC (Account A):**
- Go to Issuer tab
- Enter Account B's address
- Upload a test document
- Click "Issue KYC"

**3. Grant Consent (Account B):**
- Switch to Account B
- Go to Holder tab
- Enter Account C's address
- Click "Grant Consent"

**4. Verify KYC (Account C):**
- Switch to Account C
- Go to Verifier tab
- Enter Account B's address
- Upload the **same document file**
- Click "Verify KYC"
- Should see "✓ Verification Successful"

**5. Test Revocation (Account B):**
- Switch back to Account B
- Click "Revoke Consent" for Account C
- Switch to Account C and try verifying again
- Should see "✗ Verification Failed"

## 📱 Tech Stack

**Smart Contract:**
- Solidity 0.8.19
- Hardhat
- OpenZeppelin (if used)

**Frontend:**
- Next.js 14
- TypeScript
- Tailwind CSS
- ethers.js v6
- shadcn/ui

**Deployment:**
- Sepolia Testnet
- Vercel (Frontend)
- Alchemy/Infura RPC

## 🔒 Security Considerations

- **Private Keys**: Never commit `.env` files to Git
- **Document Privacy**: Files are hashed locally, never uploaded
- **Consent Control**: Only holders can grant/revoke access
- **Issuer Trust**: System relies on trusted issuers
- **Testnet Only**: This is a demonstration project

## 📊 Data Design

### On-Chain (Public, Small)
```solidity
struct KycRecord {
    bytes32 documentHash;  // 32 bytes
    address issuer;        // 20 bytes
    uint64 issuedAt;      // 8 bytes
    bool valid;           // 1 byte
}

mapping(address => mapping(address => bool)) consent;
```

### Off-Chain (Private, Large)
- Original documents (PDF, images)
- Stored by user or on IPFS
- Never on blockchain

## 🎯 Future Enhancements

- [ ] Multi-document support
- [ ] Credential expiry dates
- [ ] IPFS integration for document storage
- [ ] Mobile app (React Native)
- [ ] Batch consent management
- [ ] Issuer reputation system
- [ ] Zero-knowledge proofs for enhanced privacy
- [ ] Multi-chain deployment

## 📄 License

MIT License

## 👥 Contributors

Built as part of a blockchain identity verification project.

## 🔗 Links

- **Live Demo**: [Your Vercel URL]
- **Contract**: [Sepolia Etherscan](https://sepolia.etherscan.io/address/0xDDc0F74A4528aEB06e81615B2B294FeCC757f17C)
- **GitHub**: [Your Repository]

## 📞 Support

For questions or issues, please open a GitHub issue or contact [your email].

---

**⚠️ Disclaimer**: This is a demonstration project on a testnet. Do not use for production or with real sensitive data without proper security audits.
