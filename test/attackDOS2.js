const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers, waffle } = require("hardhat");

describe("Attack DOS2", function () {
   it("AttackDOS2.sol will be able to change the owner of GoodDOS2.sol", async function () {
      const [_, addr1] = await ethers.getSigners();

      const goodContract = await ethers.getContractFactory("GoodDOS2");
      const _goodContract = await goodContract.connect(addr1).deploy();
      await _goodContract.deployed();
      console.log("GoodDOS2 Contract's Address:", _goodContract.address);

      const attackContract = await ethers.getContractFactory("AttackDOS2");
      const _attackContract = await attackContract.deploy(_goodContract.address);
      await _attackContract.deployed();
      console.log("AttackDOS2 Contract's Address", _attackContract.address);

      let tx = await _attackContract.connect(addr1).attack();
      await tx.wait();

      expect(await _goodContract.owner()).to.equal(_attackContract.address);
   });
});
