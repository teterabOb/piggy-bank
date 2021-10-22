pragma solidity ^0.8.0;

import "./PiggyBank.sol";

contract PiggyBankFactory{
    uint256 private _piggyAccountsCounter;
    
    constructor(){
        _piggyAccountsCounter = 0;
    }
    
    struct PiggyAccounts{
        PiggyBank singlePiggyBank;
        uint amount;
    }
    
    mapping (uint256 => PiggyBank) private  accounts;
    
    function createPiggyBank() public {
        PiggyBank newPiggyBank = new PiggyBank();
        require(address(newPiggyBank) != address(0), "El contrato debe desplegarse");
        _piggyAccountsCounter++; 
        accounts[_piggyAccountsCounter] = newPiggyBank;
        
    }

    function getPiggyBankAddress(uint _piggyId) public view returns(PiggyBank){
        return accounts[_piggyId];
    }
    
    function getPiggyQtyAccounts() public view returns(uint256){
        return _piggyAccountsCounter;
    }
    
}