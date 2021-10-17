const PiggyBankFactory = artifacts.require("PiggyBankFactory");

contract("PiggyBankFactoryTest", async accounts => {
    it(""), async() => {
        const instance = await PiggyBankFactory.deployed();

        const newPiggy = await instance.createPiggyBank({from: accounts[0]})

        assert.equal(newPiggy, address(0));
    }  
});