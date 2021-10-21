const { expect, assert } = require('chai')
const { ethers } = require("hardhat");


describe("PiggyBank", function(){
    let deployer, cuenta1, cuenta2

    beforeEach(async function () {
        [deployer, cuenta1, cuenta2] = await ethers.getSigners();

        const PiggyBank = await ethers.getContractFactory('PiggyBank', deployer);
        this.contratoPiggy = await PiggyBank.deploy();
      });
      
      describe("Inicializacion", function(){
        it('should accept ether', async function() {
          const tx = await deployer.sendTransaction({ to: this.contratoPiggy.address, value: ethers.utils.parseEther('1') });
          let balance = await ethers.provider.getBalance(this.contratoPiggy.address);
  
          expect(balance).to.eq(ethers.utils.parseEther('1'));
          console.log(`El contrato tiene: ${ethers.utils.formatEther(balance.toString())}`);
        }); 

      });

      describe("Transfiere", function(){
        it('comprueba el owner', async function() {
          const owner = await this.contratoPiggy.owner();
      
          expect(deployer.address).to.eq(owner);
          console.log(`El deployer es: ${deployer.address}`);
          console.log(`El owner es: ${owner}`);

        });

      describe("Withdraw ethers", function(){
        it("should be the owner to withdraw ether", async function() {          
          await deployer.sendTransaction({to: this.contratoPiggy.address, value: ethers.utils.parseEther('5')})

          const contractFunds = await ethers.provider.getBalance(this.contratoPiggy.address);
          expect(contractFunds).to.be.gt(0);
          console.log(`El contrato tiene: ${ethers.utils.formatEther(contractFunds.toString())}`);
          
          const ownerFunds =  ethers.utils.formatEther((await ethers.provider.getBalance(deployer.address)).toString())
                    
          console.log(`El owner tiene: ${ownerFunds}`);
                              
          await this.contratoPiggy.withDraw({from: deployer.address});

          console.log(`El owner ahora tiene: ${ethers.utils.formatEther((await ethers.provider.getBalance(deployer.address)).toString())}`);
          console.log(`El contrato ahora tiene: ${await ethers.provider.getBalance(this.contratoPiggy.address)}`);

        });
      });

      });
});