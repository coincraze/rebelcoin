const CSDC = artifacts.require("./CSDC.sol");

require('chai')
.should();

contract("CSDC", accounts => {
  
  beforeEach(async function() {
    this.token = await CSDC.new();
  });
  
  describe('token attributes', function() {
    
    it('has the right name', async function() {
      const name = await this.token.name();
      name.should.equal('CSDC');
    });
    
  });
  
  
});
