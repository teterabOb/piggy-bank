

var PiggyBank = artifacts.require("./PiggyBank.sol");

module.exports = function(deployer) {
  deployer.deploy(PiggyBank, "0x5bb0C1A9EDcAA971105D870501C788A3339286d9");
};


