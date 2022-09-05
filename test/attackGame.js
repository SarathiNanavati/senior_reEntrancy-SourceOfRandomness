const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { parseEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

describe("Attack Game", () => {
   it("should be able to guess the exact number", async () => {
      const GameFactory = await ethers.getContractFactory("Game");
      const gameContract = await GameFactory.deploy({ value: parseEther("0.1") });
      await gameContract.deployed();

      console.log("Game Contract address", gameContract.address);

      const AttackGameFactory = await ethers.getContractFactory("AttackGame");
      const attackGameContract = await AttackGameFactory.deploy(gameContract.address);
      await attackGameContract.deployed();

      console.log("AttackGame Contract address", attackGameContract.address);

      const balanceGameBefore = await gameContract.getBalance();
      const balanceAttactGameBefore = await ethers.provider.getBalance(attackGameContract.address);

      const tx = await attackGameContract.attack();
      await tx.wait();

      const balanceGameAfter = await gameContract.getBalance();
      const balanceAttactGameAfter = await ethers.provider.getBalance(attackGameContract.address);

      console.log("Game Balance Before ", balanceGameBefore.toString());
      console.log("AttactGame Balance Before ", balanceAttactGameBefore.toString());
      console.log("Game Balance After ", balanceGameAfter.toString());
      console.log("AttactGame Balance After ", balanceAttactGameAfter.toString());

      expect(balanceGameAfter).to.equal(BigNumber.from("0"));
   });
});
