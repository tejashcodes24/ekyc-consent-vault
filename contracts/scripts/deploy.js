const hre = require("hardhat");

async function main() {
  console.log("Deploying KycVault contract to Sepolia...");

  const KycVault = await hre.ethers.getContractFactory("KycVault");
  const kycVault = await KycVault.deploy();

  await kycVault.waitForDeployment();

  const contractAddress = await kycVault.getAddress();

  console.log("✅ KycVault deployed to:", contractAddress);
  console.log(
    "🔗 View on Etherscan:",
    `https://sepolia.etherscan.io/address/${contractAddress}`
  );

  console.log("\n💡 Save this contract address for your frontend!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
