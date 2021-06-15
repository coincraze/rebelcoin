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
        return treasuryInstance.treasuryAddress
      }).then(function(address){
        assert.notEqual(address, 0x0, 'has treasury contract address')
        return treasuryInstance.tokenContract  
      }).then(function(address){
        assert.notEqual(address, 0x0, 'has token contact address')
        return treasuryInstance.gasFee
      }).then(function(fee){
        assert.notEqual(fee, 0, 'has gas fee')
    });
      
      
  });
  
 });
  
});
