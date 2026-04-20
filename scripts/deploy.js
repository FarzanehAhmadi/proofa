// eslint-disable-next-line @typescript-eslint/no-require-imports
const hre = require("hardhat");

async function main() {
  console.log("Deploying ProofOfExistence...");

  const factory = await hre.ethers.getContractFactory("ProofOfExistence");
  const contract = await factory.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("ProofOfExistence deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
