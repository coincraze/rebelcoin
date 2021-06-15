pragma solidity ^0.8.0;

import "./CSDC.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract CSDCTreasury {
  address admin;
  CSDC public tokenContract;
  uint256 public gasFee;
  address[] reservations;
  
  constructor(CSDC _tokenContract) {
    admin = msg.sender;
    tokenContract = _tokenContract;
    gasFee = 20000000000000000;
  }
  
  function reserveAirdrop() public payable {
    require(msg.value >= gasFee);
    reservations.push(msg.sender);
  }
  
  function sendAirdrop() private {

  }
  
  function setGasFee(uint256 _gasFee) public {

  }
  
  
}