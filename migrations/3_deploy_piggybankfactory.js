var PiggyBankFactory = artifacts.require("./PiggyBankFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(PiggyBankFactory);
};


