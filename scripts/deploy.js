const hre = require("hardhat");
const { ethers } = hre;

async function main() {
   const LW3NFT = await ethers.getContractFactory("LW3NFT");

   let proxyContract = await hre.upgrades.deployProxy(LW3NFT, { kind: "uups" });
   await proxyContract.deployed();
   console.log("Proxy Contract Address", proxyContract.address);
   console.log(
      "Implementation Contract Address",
      await upgrades.erc1967.getImplementationAddress(proxyContract.address)
   );

   // console.log("Verify Contract Address:", proxyContract.address);
   // console.log("Sleeping 60 Seconds.....");
   // await sleep(60000);

   // await hre.run("verify:verify", {
   //    address: deployedRandomWinnerGameContract.address,
   //    constructorArguments: [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE],
   // });
}

function sleep(ms) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}

// Call the main function and catch if there is any error
main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
