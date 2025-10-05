"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getContract, getReadOnlyContract } from "@/lib/web3";

export default function HolderTab({ account }: { account: string }) {
  const [verifierAddress, setVerifierAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [kycInfo, setKycInfo] = useState<any>(null);
  const [txHash, setTxHash] = useState("");

  useEffect(() => {
    loadKycInfo();
  }, [account]);

  const loadKycInfo = async () => {
    try {
      const contract = await getReadOnlyContract();
      const record = await contract.getKycRecord(account);

      if (record[0] !== "0x0000000000000000000000000000000000000000") {
        setKycInfo({
          issuer: record[0],
          issuedAt: new Date(Number(record[1]) * 1000).toLocaleString(),
          valid: record[2],
        });
      }
    } catch (error) {
      console.error("Error loading KYC info:", error);
    }
  };

  const handleGrantConsent = async () => {
    if (!verifierAddress) {
      alert("Please provide verifier address");
      return;
    }

    try {
      setLoading(true);
      setTxHash("");

      const contract = await getContract();
      const tx = await contract.grantConsent(verifierAddress);

      setTxHash(tx.hash);
      await tx.wait();

      alert("✅ Consent granted successfully!");
      setVerifierAddress("");
    } catch (error: any) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeConsent = async () => {
    if (!verifierAddress) {
      alert("Please provide verifier address");
      return;
    }

    try {
      setLoading(true);
      setTxHash("");

      const contract = await getContract();
      const tx = await contract.revokeConsent(verifierAddress);

      setTxHash(tx.hash);
      await tx.wait();

      alert("✅ Consent revoked successfully!");
      setVerifierAddress("");
    } catch (error: any) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Manage Consent
        </h2>
        <p className="text-sm text-slate-600">
          Control who can verify your KYC credentials. Grant or revoke access to
          verifiers.
        </p>
      </div>

      {/* KYC Status */}
      {kycInfo ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-medium text-green-900 mb-2">
            ✓ KYC Status: Active
          </h3>
          <div className="space-y-1 text-sm text-green-800">
            <p>
              <span className="font-medium">Issuer:</span> {kycInfo.issuer}
            </p>
            <p>
              <span className="font-medium">Issued At:</span> {kycInfo.issuedAt}
            </p>
            <p>
              <span className="font-medium">Valid:</span>{" "}
              {kycInfo.valid ? "Yes" : "No"}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            ⚠️ No KYC credential found for your address. Please contact an
            issuer to get verified.
          </p>
        </div>
      )}

      {/* Consent Management */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Verifier Address
          </label>
          <input
            type="text"
            value={verifierAddress}
            onChange={(e) => setVerifierAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleGrantConsent}
            disabled={loading || !verifierAddress || !kycInfo}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            {loading ? "Processing..." : "Grant Consent"}
          </Button>
          <Button
            onClick={handleRevokeConsent}
            disabled={loading || !verifierAddress}
            variant="outline"
            className="flex-1"
          >
            {loading ? "Processing..." : "Revoke Consent"}
          </Button>
        </div>

        {txHash && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-900">
              Transaction Successful!
            </p>
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-green-700 hover:underline break-all"
            >
              View on Etherscan: {txHash}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
