import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { TestToken__factory } from "../typechain";

chai.use(solidity);
const { expect } = chai;

describe("Token", () => {
  let tokenAddress: string;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    const tokenFactory = await ethers.getContractFactory("TestToken");
    const tokenContract = await tokenFactory.deploy();
    tokenAddress = tokenContract.address;

    expect(await tokenContract.totalSupply()).to.eq(0);
  });
  describe("Mint", async () => {
    it("Should mint some tokens", async () => {
      const [deployer, user] = await ethers.getSigners();
      const tokenFactory = await ethers.getContractFactory("TestToken");
      const tokenInstance = tokenFactory.attach(tokenAddress).connect(deployer);
      const toMint = ethers.utils.parseEther("1");

      await tokenInstance.mint(user.address, toMint);

      expect(await tokenInstance.totalSupply()).to.eq(toMint);
    });

    it("Should mint some tokens, but fail to print trace", async () => {
      const [deployer, user] = await ethers.getSigners();
      const tokenFactory = new TestToken__factory(deployer);
      const tokenInstance = tokenFactory.attach(tokenAddress).connect(deployer);
      const toMint = ethers.utils.parseEther("1");

      await tokenInstance.mint(user.address, toMint);

      expect(await tokenInstance.totalSupply()).to.eq(toMint);
    });
  });
});
