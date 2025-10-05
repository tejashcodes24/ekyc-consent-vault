import { BrowserProvider, Contract, ethers } from "ethers";
import { CONTRACT_ADDRESS, KYC_VAULT_ABI, SEPOLIA_CHAIN_ID } from "./contract";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed!");
  }

  const provider = new BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);

  // Check if on Sepolia network
  const network = await provider.getNetwork();
  if (Number(network.chainId) !== SEPOLIA_CHAIN_ID) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }], // Sepolia chainId in hex
      });
    } catch (error: any) {
      if (error.code === 4902) {
        throw new Error("Please add Sepolia network to MetaMask");
      }
      throw error;
    }
  }

  return accounts[0];
}

export async function getContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed!");
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new Contract(CONTRACT_ADDRESS, KYC_VAULT_ABI, signer);
}

export async function getReadOnlyContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed!");
  }

  const provider = new BrowserProvider(window.ethereum);
  return new Contract(CONTRACT_ADDRESS, KYC_VAULT_ABI, provider);
}

export function hashFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        const hash = ethers.keccak256(uint8Array);
        resolve(hash);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
