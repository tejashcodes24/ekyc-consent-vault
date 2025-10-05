export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
export const SEPOLIA_CHAIN_ID = 11155111;

export const KYC_VAULT_ABI = [
  "function issueKyc(address holder, bytes32 documentHash) external",
  "function grantConsent(address verifier) external",
  "function revokeConsent(address verifier) external",
  "function revokeKyc(address holder) external",
  "function verifyKyc(address holder, bytes32 documentHash) external view returns (bool isValid)",
  "function getKycRecord(address holder) external view returns (address issuer, uint64 issuedAt, bool valid)",
  "function hasConsent(address holder, address verifier) external view returns (bool hasConsent)",
  "function getDocumentHash(address holder) external view returns (bytes32 documentHash)",
  "event KycIssued(address indexed holder, address indexed issuer, bytes32 documentHash, uint64 issuedAt)",
  "event ConsentGranted(address indexed holder, address indexed verifier)",
  "event ConsentRevoked(address indexed holder, address indexed verifier)",
  "event KycRevoked(address indexed holder, address indexed issuer)",
];
