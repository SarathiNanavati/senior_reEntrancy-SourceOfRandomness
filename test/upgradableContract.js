const { expect } = require("chai");
const hre = require("hardhat");
const { ethers, upgrades } = hre;

describe("ERC721 Upgradeable", async () => {
   it("Should deploy an upgradeable ERC721 Contract", async function () {
      const LW3NFT = await ethers.getContractFactory("LW3NFT");
      const LW3NFT2 = await ethers.getContractFactory("LW3NFT2");
      //   const LW3NFT3 = await ethers.getContractFactory("LW3NFT3");

      let proxyContract = await hre.upgrades.deployProxy(LW3NFT, { kind: "uups" });
      console.log("Proxy Contract Address", proxyContract.address);
      console.log(
         "Implementation Contract Address",
         await upgrades.erc1967.getImplementationAddress(proxyContract.address)
      );

      const [owner] = await ethers.getSigners();
      const ownerOfToken1 = await proxyContract.ownerOf(1);

      expect(ownerOfToken1).to.equal(owner.address);

      proxyContract = await hre.upgrades.upgradeProxy(proxyContract, LW3NFT2);
      console.log("Proxy Contract Address", proxyContract.address);
      console.log(
         "Implementation Contract Address",
         await upgrades.erc1967.getImplementationAddress(proxyContract.address)
      );
      expect(await proxyContract.test()).to.equal("upgraded 2");

      //   let proxyContract3 = await hre.upgrades.upgradeProxy(proxyContract, LW3NFT3);
      //   console.log("proxyContract3 Address", proxyContract2.address);

      //   expect(await proxyContract3.test()).to.equal("upgraded 3");
   });
});
