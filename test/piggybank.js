const PiggyBank = artifacts.require("PiggyBank.sol");
const ganache = require('ganache-cli')
const Web3 = require('web3')

const web3 = new Web3(ganache.provider());


contract("PiggyBank", accounts => {
    let piggyBank;

    beforeEach("setup contract for each test", async() => {
        piggyBank = await PiggyBank.new();
    });

    it("should has a owner", async() => {
        assert.equal(await piggyBank.owner(), accounts[0]);
    });

    it("should accepts funds", async() => {
        await piggyBank.sendTransaction({value: web3.utils.toWei('2', 'ether'), from: accounts[1]});

        const piggyBankAddress = await piggyBank.address;
        assert.equal(web3.eth.getBalance(piggyBankAddress), web3.utils.toWei('2', 'ether'));
    });

    it("should be owner to withdraw amount", async () => {
        const PiggyBankInstance = await PiggyBank.deployed();
        await PiggyBankInstance.withDraw({ from: accounts[0] });
    });

})