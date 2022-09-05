const { FlashbotsBundleProvider } = require("@flashbots/ethers-provider-bundle");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

const main = async () => {
   const fakeNFTFactory = await ethers.getContractFactory("FakeNFT");
   const FakeNFTContract = await fakeNFTFactory.deploy();
   await FakeNFTContract.deployed();

   console.log("Address of Fake NFT Contract:", FakeNFTContract.address);

   const provider = new ethers.providers.WebSocketProvider(process.env.QUICKNODE_WS_URL, "goerli");

   const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
   console.log(`Signer : ${signer.address}`);

   const flashbotsProvider = await FlashbotsBundleProvider.create(
      provider,
      signer,
      "https://relay-goerli.flashbots.net",
      "goerli"
   );
   const data = await FakeNFTContract.interface.getSighash("mint");
   console.log(data);

   provider.on("block", async (blockNumber) => {
      console.log("Block Number: ", blockNumber);

      const bundleResponse = await flashbotsProvider.sendBundle(
         [
            {
               transaction: {
                  chainId: 5,
                  type: 2,
                  value: ethers.utils.parseEther("0.01"),
                  to: FakeNFTContract.address,
                  data: "0x1249c58b",
                  maxFeePerGas: BigNumber.from(10).pow(9).mul(5),
                  maxPriorityFeePerGas: BigNumber.from(10).pow(9).mul(3),
               },
               signer: signer,
            },
         ],
         blockNumber + 1
      );

      if ("error" in bundleResponse) {
         console.log(`${blockNumber} : Error : `, bundleResponse.error.message);
      } else {
         console.log(`${blockNumber} : Success`);
      }
   });
};

main();
