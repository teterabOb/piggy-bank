pragma solidity ^0.8.0;

import "./PiggyBank.sol";

contract PiggyBankFactory{
    uint256 private _piggyAccountsCounter = 1;
    
    struct PiggyAccounts{
        PiggyBank singlePiggyBank;
        uint amount;
    }
    
    /*
    struct PiggyAmounts{
        address piggyAccount;
        uint amountAccount;
    }
    */
    
    mapping (uint256 => PiggyAccounts) public _piggyBanks;
    //mapping (uint256 => PiggyAmounts) public _piggyDetails;

    function createPiggyBank() public returns(PiggyBank){
        PiggyBank newPiggyBank = new PiggyBank();
        _piggyBanks[_piggyAccountsCounter] = PiggyAccounts(newPiggyBank, address(newPiggyBank).balance);
        _piggyAccountsCounter++;
        return newPiggyBank;
    }
    
}