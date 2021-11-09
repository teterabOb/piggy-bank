require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "https://eth-kovan.alchemyapi.io/v2/";
const KOVAN_PRIVATE_KEY = ""

module.exports = {
  solidity: "0.8.0",
  
  networks:{
    kovan: {
      url: ALCHEMY_API_KEY,
      accounts: [`0x${KOVAN_PRIVATE_KEY}`]
    }
  }
  
};
