pragma solidity 0.8.0;

contract PiggyBank{

    address private contractOwner;
    
    constructor(address _owner){
        require(_owner != address(0), "Debe ser un addres valido");
        contractOwner = _owner;
    }
    
    function owner() public view returns(address){
        return contractOwner;
    }

    modifier isOwner(){
        require(msg.sender == contractOwner);
        _;
    }
    
    function withDraw()  public isOwner returns(bool){
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