import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("Claim Faucet Factory Test", function () {
  async function deployClaimFaucetFactoryFixture() {
    const [deployer, otherAccount] = await hre.ethers.getSigners();

    const ClaimFaucetFactory = await hre.ethers.getContractFactory("ClaimFaucetFactory");
    const claimFaucetFactory = await ClaimFaucetFactory.deploy();

    return { claimFaucetFactory, deployer, otherAccount };
  }

  describe("Deployment", function () {
    it("Should check if it deployed", async function () {
      const { claimFaucetFactory, deployer } = await loadFixture(deployClaimFaucetFactoryFixture);

      expect(await claimFaucetFactory);
    });
    it("Should deploy ClaimFaucet and store the contract info", async function () {
      const { claimFaucetFactory, deployer } = await loadFixture(deployClaimFaucetFactoryFixture);
      const _name = "DLT Token";
      const _symbol = "DLT";


      const data = await claimFaucetFactory.deployClaimFaucet(_name, _symbol);
      await data.wait();

      const _index = 0;

      const deployedContractAddress = await claimFaucetFactory.getAllDeployedUserContractsByIndex(_index);


      const allContracts = await claimFaucetFactory.getAllDeployedContracts();


      expect(allContracts.length).to.equal(1);
      expect(allContracts[_index].deployer).to.equal(deployer.address);
      expect(allContracts[_index].deployedContract).to.equal(deployedContractAddress[1]);
    });

    it("Should return all deployed user contracts", async () => {
      const { claimFaucetFactory, deployer } = await loadFixture(deployClaimFaucetFactoryFixture);
      const _name = "EarthFi Token";
      const _symbol = "EAFI";

      const data = await claimFaucetFactory.deployClaimFaucet(_name, _symbol);
      await data.wait();

      const allContracts = await claimFaucetFactory.getAllDeployedUserContracts();

      expect(allContracts.length).to.equal(1);

      expect(allContracts[0].deployer).to.equal(deployer.address);

      const deployedContractAddress = allContracts[0].deployedContract;

      expect(deployedContractAddress).to.exist;
    });

    it("Should fetch the token name and symbol from the deployed contract", async function () {
      const { claimFaucetFactory } = await loadFixture(deployClaimFaucetFactoryFixture);

      const _name = "EarthFi Token";
      const _symbol = "EAFI";

      // Deploy the ClaimFaucet contract and get the contract address directly
      const tx = await claimFaucetFactory.deployClaimFaucet(_name, _symbol);
      const receipt = await tx.wait();
      const deployedContractAddress = await claimFaucetFactory.getAllDeployedUserContractsByIndex(0); // Retrieve the deployed contract address

      const [name, symbol] = await claimFaucetFactory.getInfoFromContract(deployedContractAddress.deployedContract_);

      expect(name).to.equal(_name);
      expect(symbol).to.equal(_symbol);
    });





  })

})