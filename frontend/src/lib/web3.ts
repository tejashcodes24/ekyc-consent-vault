import { BrowserProvider, Contract, ethers } from "ethers";
import { CONTRACT_ADDRESS, KYC_VAULT_ABI, SEPOLIA_CHAIN_ID } from "./contract";

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, callback: (...args: unknown[]) => void) => void;
  removeListener?: (
    event: string,
    callback: (...args: unknown[]) => void
  ) => void;
}

interface SwitchEthereumChainParams {
  chainId: string;
}

interface EthereumRequestArgs {
  method: string;
  params?: SwitchEthereumChainParams[];
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

interface EthereumRpcError extends Error {
  code: number;
  message: string;
}

function isEthereumRpcError(error: unknown): error is EthereumRpcError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as EthereumRpcError).code === "number" &&
    "message" in error &&
    typeof (error as EthereumRpcError).message === "string"
  );
}

export async function connectWallet(): Promise<string> {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed!");
  }

  const provider = new BrowserProvider(window.ethereum);
  const accounts = (await provider.send("eth_requestAccounts", [])) as string[];

  // Check if on Sepolia network
  const network = await provider.getNetwork();
  if (Number(network.chainId) !== SEPOLIA_CHAIN_ID) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }], // Sepolia chainId in hex
      } as EthereumRequestArgs);
    } catch (error: unknown) {
      if (isEthereumRpcError(error) && error.code === 4902) {
        throw new Error("Please add Sepolia network to MetaMask");
      }
      throw error;
    }
  }

  return accounts[0];
}

export async function getContract(): Promise<Contract> {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed!");
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new Contract(CONTRACT_ADDRESS, KYC_VAULT_ABI, signer);
}

export async function getReadOnlyContract(): Promise<Contract> {
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
