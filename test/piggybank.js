//const PiggyBank = require("PiggyBank.sol");
const ganache = require('ganache-cli')
const Web3 = require('web3')

const web3 = new Web3(ganache.provider());

let piggyBank;

beforeEach("setup contract for each test", async() => {
    piggyBank = await PiggyBank.new();
});

contract("PiggyBank", accounts => {
    it("should be deployed", () => {
        assert.ok(piggyBank.address)
    });
    
    it("should has a owner", async() => {
        assert.equal(await piggyBank.owner(), accounts[0]);
    });

    it("should accepts funds", async() => {        
        await piggyBank.send(web3.utils.toWei('2', 'ether'), accounts[1]);

        const piggyBankAddress = await piggyBank.address;
        let piggyBalance = web3.eth.getBalance(piggyBankAddress)
        let accountBalance = web3.eth.getBalance(accounts[0])
        console.log("piggyBalance");
        //assert.equal(web3.eth.getBalance(piggyBankAddress), web3.utils.toWei('2', 'ether'));
        assert(piggyBalance == 0);
     
    });

    it("should be owner to withdraw amount", async () => {
        const PiggyBankInstance = await PiggyBank.deployed();
        await PiggyBankInstance.withDraw({ from: accounts[0] });
    });

})