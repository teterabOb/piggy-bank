async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const PiggyBank = await ethers.getContractFactory("PiggyBank", deployer);
    const piggyBank = await PiggyBank.deploy(deployer.address);

    const PiggyBankFactory = await ethers.getContractFactory("PiggyBankFactory", deployer);
    const piggyBankFactory = await PiggyBankFactory.deploy();

    console.log("PiggyBank address:", piggyBankFactory.address);
    console.log("PiggyBankFactory address:", piggyBank.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });