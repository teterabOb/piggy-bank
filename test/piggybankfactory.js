const { expect, assert } = require('chai')
const { ethers } = require("hardhat");


describe("PiggyBankFactory", function(){
    let deployer, cuenta1, cuenta2

    beforeEach(async function () {
        [deployer, cuenta1, cuenta2] = await ethers.getSigners();

        const PiggyBankFactory = await ethers.getContractFactory('PiggyBankFactory', deployer);
        this.contratoPiggyFactory = await PiggyBankFactory.deploy();
      });
      
      describe("Inicializacion", function(){
        it('creates piggy bank account', async function() {
          
          const piggyAcc = await this.contratoPiggyFactory.createPiggyBank();
       
          const counter = await this.contratoPiggyFactory.getPiggyQtyAccounts();
          const addressAccount = await this.contratoPiggyFactory.getPiggyBankAddress(counter);                  

          assert(addressAccount != ethers.constants.AddressZero, "La cuenta se ha desplegado correctamente");
          console.log(`El address de la cuenta es: ${addressAccount}`);
          console.log(`La cantidad de cuentas cradas son : ${counter}`);
          
        }); 

      });
      
});