"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function HelpModal() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              How to Use This App
            </h2>
            <p className="text-sm text-slate-600">ऐप कैसे उपयोग करें</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* What is this */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              🤔 What is this app?
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-slate-700 mb-2">
                <strong>Simple explanation:</strong> Like Aadhaar for the
                internet, but YOU control who sees it!
              </p>
              <p className="text-sm text-slate-600">
                Verify your documents ONCE, then give permission to anyone who
                needs to check. No more uploading same documents again and
                again!
              </p>
            </div>
          </section>

          {/* Three Roles */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              👥 Three Types of Users
            </h3>

            <div className="space-y-3">
              {/* Issuer */}
              <div className="border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🏦</span>
                  <div>
                    <h4 className="font-semibold text-blue-900">
                      ISSUER (जारीकर्ता)
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      <strong>Who:</strong> Bank, Government office, University
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      <strong>What they do:</strong> Check your real documents
                      and give you a "digital stamp"
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Example: HDFC Bank, UIDAI, Your College
                    </p>
                  </div>
                </div>
              </div>

              {/* Holder */}
              <div className="border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">👤</span>
                  <div>
                    <h4 className="font-semibold text-green-900">
                      HOLDER (धारक) - That's YOU!
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      <strong>Who:</strong> Regular person like you and me
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      <strong>What you do:</strong> Control who can check your
                      verification
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      You are the owner of your identity!
                    </p>
                  </div>
                </div>
              </div>

              {/* Verifier */}
              <div className="border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-purple-900">
                      VERIFIER (सत्यापनकर्ता)
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      <strong>Who:</strong> Companies that need to verify you
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      <strong>What they do:</strong> Check if you're verified
                      (only if you allow)
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Example: New bank, Loan app, Ola/Uber
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Real Example */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              🎯 Real Example
            </h3>

            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="font-semibold text-red-900 mb-2">
                  ❌ Old Way (परंपरागत तरीका):
                </p>
                <div className="text-sm text-red-800 space-y-1">
                  <p>• Bank 1 → Upload Aadhaar, PAN</p>
                  <p>• Bank 2 → Upload Aadhaar, PAN AGAIN</p>
                  <p>• Bank 3 → Upload Aadhaar, PAN AGAIN</p>
                  <p className="font-semibold mt-2">
                    Time: 3 days | Uploads: 9 times 😫
                  </p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-semibold text-green-900 mb-2">
                  ✅ New Way (Our App):
                </p>
                <div className="text-sm text-green-800 space-y-1">
                  <p>• Bank 1 → Upload ONCE, get verified</p>
                  <p>• Bank 2 → Give permission → Instant verify</p>
                  <p>• Bank 3 → Give permission → Instant verify</p>
                  <p className="font-semibold mt-2">
                    Time: 1 day | Uploads: 1 time 🎉
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What to Upload */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              📁 What Documents to Upload?
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-2">
                  ✅ GOOD Documents:
                </p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Aadhaar Card (front/back)</li>
                  <li>• PAN Card</li>
                  <li>• Passport</li>
                  <li>• Driving License</li>
                  <li>• Electricity/Water bill</li>
                  <li>• Bank statement</li>
                  <li>• Degree certificate</li>
                </ul>
              </div>

              <div className="border border-red-200 rounded-lg p-4">
                <p className="font-semibold text-red-900 mb-2">
                  ❌ DON'T Upload:
                </p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Random photos</li>
                  <li>• Screenshots</li>
                  <li>• WhatsApp images</li>
                  <li>• Selfies</li>
                  <li>• Very large files (&gt; 5MB)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Important Rules */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              ⚠️ Important Rules
            </h3>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2">
              <p className="text-sm text-amber-900">
                <strong>1. Use EXACT same file:</strong> Issuer uploads
                "aadhaar.pdf" → Verifier must upload the EXACT "aadhaar.pdf"
              </p>
              <p className="text-sm text-amber-900">
                <strong>2. Grant consent first:</strong> Before anyone can
                verify you, YOU must give them permission
              </p>
              <p className="text-sm text-amber-900">
                <strong>3. Keep files safe:</strong> Store original documents in
                Google Drive or USB. You'll need them!
              </p>
              <p className="text-sm text-amber-900">
                <strong>4. This is TEST mode:</strong> Use fake/test documents
                for now. Don't upload real sensitive documents yet!
              </p>
            </div>
          </section>

          {/* Privacy */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              🔐 Your Privacy
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-semibold text-green-900 mb-2">
                  ✅ What's stored on blockchain:
                </p>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• A code (fingerprint) of your document</li>
                  <li>• Who verified you</li>
                  <li>• Permission list</li>
                  <li>• Date and time</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-blue-900 mb-2">
                  ❌ What's NOT stored:
                </p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Your actual Aadhaar PDF</li>
                  <li>• Your photo</li>
                  <li>• Any personal details</li>
                  <li>• Readable information</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              🚀 Quick Start (जल्दी शुरू करें)
            </h3>

            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <span className="bg-blue-100 text-blue-900 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </span>
                <div>
                  <p className="font-semibold">Install MetaMask</p>
                  <p className="text-sm text-slate-600">
                    It's like Paytm for blockchain. Get it from Chrome Web
                    Store.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="bg-blue-100 text-blue-900 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </span>
                <div>
                  <p className="font-semibold">Get Test Money</p>
                  <p className="text-sm text-slate-600">
                    Go to sepoliafaucet.com and get free Sepolia ETH (fake money
                    for testing).
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="bg-blue-100 text-blue-900 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </span>
                <div>
                  <p className="font-semibold">Connect Wallet</p>
                  <p className="text-sm text-slate-600">
                    Click "Connect Wallet" button on this app and approve in
                    MetaMask.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="bg-blue-100 text-blue-900 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </span>
                <div>
                  <p className="font-semibold">Choose Your Role</p>
                  <p className="text-sm text-slate-600">
                    Click on Issuer, Holder, or Verifier tab based on what you
                    want to do.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Need Help */}
          <section className="bg-slate-100 p-4 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">
              💬 Still Confused?
            </h3>
            <p className="text-sm text-slate-700">
              Don't worry! Start with the <strong>"Holder"</strong> tab to see
              if you have any verification. Most users will be Holders (regular
              people).
            </p>
            <p className="text-sm text-slate-700 mt-2">
              For more help, contact: [Your Email/Support]
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-4">
          <Button onClick={() => setIsOpen(false)} className="w-full">
            Got it! Let's start (समझ गया! शुरू करते हैं)
          </Button>
        </div>
      </div>
    </div>
  );
}
