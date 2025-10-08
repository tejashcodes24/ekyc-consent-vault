const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("=".repeat(60));
  console.log("Deploying KycVault contract to Sepolia...");
  console.log("=".repeat(60));

  // Get deployer info
  const [deployer] = await hre.ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  const balance = await hre.ethers.provider.getBalance(deployerAddress);

  console.log("\n📋 Deployer Information:");
  console.log("   Address:", deployerAddress);
  console.log("   Balance:", hre.ethers.formatEther(balance), "ETH");

  // Deploy contract
  console.log("\n🚀 Deploying contract...");
  const KycVault = await hre.ethers.getContractFactory("KycVault");
  const kycVault = await KycVault.deploy();

  // Get deployment transaction
  const deploymentTx = kycVault.deploymentTransaction();

  console.log("\n📝 Deployment Transaction:");
  console.log("   Transaction Hash:", deploymentTx.hash);
  console.log("   From:", deploymentTx.from);
  console.log("   Nonce:", deploymentTx.nonce);
  console.log("   Gas Limit:", deploymentTx.gasLimit.toString());

  console.log("\n⏳ Waiting for deployment confirmation...");
  await kycVault.waitForDeployment();

  // Get contract address
  const contractAddress = await kycVault.getAddress();

  // Get receipt for more details
  const receipt = await deploymentTx.wait();

  console.log("\n✅ Contract Deployed Successfully!");
  console.log("=".repeat(60));
  console.log("\n📍 Contract Address:", contractAddress);
  console.log(
    "🔗 Etherscan:",
    `https://sepolia.etherscan.io/address/${contractAddress}`
  );
  console.log(
    "📜 Transaction:",
    `https://sepolia.etherscan.io/tx/${deploymentTx.hash}`
  );

  console.log("\n⛽ Gas Usage:");
  console.log("   Gas Used:", receipt.gasUsed.toString());
  console.log(
    "   Gas Price:",
    hre.ethers.formatUnits(receipt.gasPrice, "gwei"),
    "Gwei"
  );
  console.log(
    "   Total Cost:",
    hre.ethers.formatEther(receipt.gasUsed * receipt.gasPrice),
    "ETH"
  );

  console.log("\n🧱 Block Information:");
  console.log("   Block Number:", receipt.blockNumber);
  console.log("   Block Hash:", receipt.blockHash);

  // Create deployment info object
  const deploymentInfo = {
    network: "sepolia",
    contractName: "KycVault",
    contractAddress: contractAddress,
    deployerAddress: deployerAddress,
    transactionHash: deploymentTx.hash,
    blockNumber: receipt.blockNumber,
    blockHash: receipt.blockHash,
    gasUsed: receipt.gasUsed.toString(),
    gasPrice: receipt.gasPrice.toString(),
    totalCostETH: hre.ethers.formatEther(receipt.gasUsed * receipt.gasPrice),
    deployedAt: new Date().toISOString(),
    etherscanContract: `https://sepolia.etherscan.io/address/${contractAddress}`,
    etherscanTx: `https://sepolia.etherscan.io/tx/${deploymentTx.hash}`,
  };

  console.log("\n" + "=".repeat(60));
  console.log("🎉 DEPLOYMENT COMPLETE!");
  console.log("=".repeat(60));

  console.log("\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
