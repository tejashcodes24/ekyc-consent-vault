import { ethers } from "hardhat";

async function main() {
  console.log("Deploying KycVault contract to Sepolia...");

  // Get the contract factory
  const KycVault = await ethers.getContractFactory("KycVault");

  // Deploy the contract
  const kycVault = await KycVault.deploy();

  await kycVault.waitForDeployment();

  const contractAddress = await kycVault.getAddress();

  console.log("KycVault deployed to:", contractAddress);
  console.log("Network:", await ethers.provider.getNetwork());

  // Wait for a few block confirmations before verification
  console.log("Waiting for block confirmations...");
  await kycVault.deploymentTransaction().wait(5);

  // Save deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    deployerAddress: (await ethers.getSigners())[0].address,
    network: "sepolia",
    deployedAt: new Date().toISOString(),
    blockNumber: await ethers.provider.getBlockNumber(),
  };

  console.log("Deployment Info:", JSON.stringify(deploymentInfo, null, 2));

  // Verify contract on Etherscan (optional)
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });
      console.log("Contract verified successfully!");
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
