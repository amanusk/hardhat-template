import { ethers } from 'hardhat';
import chai from 'chai';
import { solidity } from 'ethereum-waffle';
import { ERC20__factory } from '../typechain/factories/ERC20__factory';

chai.use(solidity);
const { expect } = chai;

describe('Token', () => {
  let tokenAddress: string;

  beforeEach(async () => {
    const [deployer, user] = await ethers.getSigners();
    const tokenFactory = new ERC20__factory(deployer);
    const tokenContract = await tokenFactory.deploy('Token', 'TKN');
    tokenAddress = tokenContract.address;

    // let tokenInstance = new ERC20__factory(user).attach(tokenContract.address);
    expect(await tokenContract.totalSupply()).to.eq(0);
  });
  // 4
  describe('mint', async () => {
    it('Should mint some tokens', async () => {
      const [deployer, user] = await ethers.getSigners();
      const tokenInstance = new ERC20__factory(deployer).attach(tokenAddress);
      const toMint = ethers.utils.parseEther('1');

      await tokenInstance._mint(user.address, toMint);
      expect(await tokenInstance.totalSupply()).to.eq(toMint);
    });

    it('Should mint some tokens', async () => {
      const [deployer, user] = await ethers.getSigners();
      const tokenInstance = new ERC20__factory(deployer).attach(tokenAddress);
      const toMint = ethers.utils.parseEther('0.1');

      await tokenInstance._mint(user.address, toMint);
      expect(await tokenInstance.totalSupply()).to.eq(toMint);
    });
  });
});
