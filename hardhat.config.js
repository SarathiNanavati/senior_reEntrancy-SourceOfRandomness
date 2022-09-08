require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config({ path: ".env" });

const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;
const POLYGONSCAN_KEY = process.env.POLYGONSCAN_KEY;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;
const QUICKNODE_RPC_URL = process.env.QUICKNODE_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
   solidity: "0.8.9",
   networks: {
      // mumbai: {
      //    url: ALCHEMY_API_KEY_URL,
      //    accounts: [MUMBAI_PRIVATE_KEY],
      // },
      goerli: {
         url: QUICKNODE_RPC_URL,
         accounts: [PRIVATE_KEY],
      },
   },
   etherscan: {
      apiKey: {
         polygonMumbai: POLYGONSCAN_KEY,
         goerli: ETHERSCAN_KEY,
      },
   },
};