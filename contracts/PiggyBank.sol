pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PiggyBank is Ownable{
    
    function withDraw()  public onlyOwner returns(bool){
        address _owner = owner();
        payable(_owner).transfer(address(this).balance);
        return true;
    }
    
    function getBalance() public view returns(uint256){
        return address(this).balance;
    }
    
    fallback() external payable {}
    receive() external payable {} 
}