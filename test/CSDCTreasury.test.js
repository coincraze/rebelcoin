const CSDC = artifacts.require("./CSDC.sol");
const CSDCTreasury = artifacts.require("./CSDCTreasury.sol");

require('chai')
.should();

contract("CSDCTreasury", accounts => {
  
  describe('treasury tests', function() {
    var treasuryInstance;
    
    it('inializes CSDCTreasury contract with correct values', async function() {
      return CSDCTreasury.deployed().then(function(instance) {
        treasuryInstance = instance;
        treasuryAddress = treasuryInstance.address
        tokenContract = treasuryInstance.tokenContract 
        gasFee = treasuryInstance.gasFee
        assert.notEqual(treasuryAddress, 0x0, 'has treasury contract address')
        assert.notEqual(tokenContract, 0x0, 'has token contact address')
        assert.notEqual(tokenContract, treasuryAddress, 'treasury address and token address are different')
        assert.notEqual(gasFee, 0, 'has gas fee')
      });
      
  });
  
 });
  
});
