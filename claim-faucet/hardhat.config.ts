require("@nomicfoundation/hardhat-verify");
import { vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";



const ALCHEMY_API_URL = vars.get("ALCHEMY_API_URL");
const BASESCAN_API_KEY = vars.get("BASESCAN_API_KEY");
const PRIVATE_KEY = vars.get("PRIVATE_KEY");

module.exports = {
  solidity: "0.8.27",
  networks: {
    baseTestnet: {
      url: `https://base-sepolia.g.alchemy.com/v2/${ALCHEMY_API_URL}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },

  etherscan: {
    apiKey: BASESCAN_API_KEY,
    customChains: [
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
    ],
  },
};