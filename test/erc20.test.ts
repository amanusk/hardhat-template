import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Token", () => {
  async function deployContracts() {
    const [deployer, sender, receiver] = await ethers.getSigners();
    const tokenFactory = await ethers.getContractFactory("TestToken");
    const tokenContract = await tokenFactory.deploy();

    expect(await tokenContract.totalSupply()).to.eq(0);

    return { deployer, sender, receiver, tokenContract };
  }
  describe("Mint", async () => {
    it("Should mint some tokens", async () => {
      const { deployer, sender, receiver, tokenContract } = await loadFixture(deployContracts);

      const toMint = ethers.utils.parseEther("1");

      await tokenContract.mint(sender.address, toMint);
      expect(await tokenContract.totalSupply()).to.eq(toMint);
    });
  });

  describe("Transfer", async () => {
    it("Should transfer tokens between users", async () => {
      const { deployer, sender, receiver, tokenContract } = await loadFixture(deployContracts);

      let deployerInstance = tokenContract.connect(deployer);
      const toMint = ethers.utils.parseEther("1");

      await deployerInstance.mint(sender.address, toMint);
      expect(await deployerInstance.balanceOf(sender.address)).to.eq(toMint);

      const senderInstance = tokenContract.connect(sender);
      const toSend = ethers.utils.parseEther("0.4");
      await senderInstance.transfer(receiver.address, toSend);

      expect(await senderInstance.balanceOf(receiver.address)).to.eq(toSend);
    });

    it("Should fail to transfer with low balance", async () => {
      const { deployer, sender, receiver, tokenContract } = await loadFixture(deployContracts);

      let deployerInstance = tokenContract.connect(deployer);
      const toMint = ethers.utils.parseEther("1");

      await deployerInstance.mint(sender.address, toMint);
      expect(await deployerInstance.balanceOf(sender.address)).to.eq(toMint);

      const senderInstance = tokenContract.connect(sender);
      const toSend = ethers.utils.parseEther("1.1");

      // Notice await is on the expect
      await expect(senderInstance.transfer(receiver.address, toSend)).to.be.revertedWith(
        "ERC20: transfer amount exceeds balance",
      );
    });
  });
});
