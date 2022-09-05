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

   const flashbotsProvider = await FlashbotsBundleProvider.create(
      provider,
      signer,
      "https://relay-goerli.flashbots.net",
      "goerli"
   );

   await new Promise(function (resolve) {
      provider.on("block", async (blockNumber) => {
         console.log("Block Number: ", blockNumber);
         console.log(`${blockNumber} : Sending Bundle`);

         const bundleResponse = await flashbotsProvider.sendBundle(
            [
               {
                  transaction: {
                     chainId: 5,
                     type: 2,
                     value: ethers.utils.parseEther("0.01"),
                     to: FakeNFTContract.address,
                     data: FakeNFTContract.interface.getSighash("mint()"),
                     maxFeePerGas: BigNumber.from(10).pow(9).mul(3),
                     maxPriorityFeePerGas: BigNumber.from(10).pow(9).mul(2),
                  },
                  signer: signer,
               },
            ],
            blockNumber + 1
         );

         console.log(
            `${blockNumber} : Waiting for Bundle response`,
            `${JSON.stringify(bundleResponse, null, 4)}`
         );
         const tx = await bundleResponse.wait();
         console.log(
            `${blockNumber} : ${JSON.stringify(bundleResponse, null, 4)}-\n-${JSON.stringify(
               tx,
               null,
               4
            )}`
         );

         if ("error" in bundleResponse) {
            console.log(`${blockNumber} : Error : `, bundleResponse.error.message);
         } else {
            console.log(`${blockNumber} : Success`);
            resolve(true);
         }
      });
   });

   const listener = await provider.listeners("block");
   console.log("Listener : ", listener);
};

main();
