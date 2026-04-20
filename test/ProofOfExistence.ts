import { expect } from "chai";
import hre from "hardhat";

describe("ProofOfExistence", function () {
  async function deploy() {
    const [owner, otherUser] = await hre.ethers.getSigners();
    const factory = await hre.ethers.getContractFactory("ProofOfExistence");
    const contract = await factory.deploy();
    return { contract, owner, otherUser };
  }

  it("should notarize a document and store timestamp + owner", async function () {
    const { contract, owner } = await deploy();

    const hash = hre.ethers.id("hello world");
    await contract.notarize(hash);

    const [timestamp, storedOwner] = await contract.getProof(hash);
    expect(timestamp).to.be.gt(0);
    expect(storedOwner).to.equal(owner.address);
  });

  it("should reject duplicate notarization", async function () {
    const { contract } = await deploy();

    const hash = hre.ethers.id("hello world");
    await contract.notarize(hash);

    await expect(contract.notarize(hash)).to.be.revertedWith(
      "Document already notarized",
    );
  });

  it("should return empty proof for unknown document", async function () {
    const { contract } = await deploy();

    const hash = hre.ethers.id("never notarized");
    const [timestamp, storedOwner] = await contract.getProof(hash);

    expect(timestamp).to.equal(0);
    expect(storedOwner).to.equal(hre.ethers.ZeroAddress);
  });

  it("should emit Notarized event", async function () {
    const { contract, owner } = await deploy();

    const hash = hre.ethers.id("hello world");
    const tx = await contract.notarize(hash);
    const receipt = await tx.wait();
    const block = await hre.ethers.provider.getBlock(receipt!.blockNumber);

    await expect(contract.notarize(hre.ethers.id("another doc")))
      .to.emit(contract, "Notarized")
      .withArgs(
        hre.ethers.id("another doc"),
        owner.address,
        block!.timestamp + 1,
      );
  });
});
