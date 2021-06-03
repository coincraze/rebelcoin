const DeStor = artifacts.require("./DeStor.sol");

require('chai')
.should();

contract("DeStor", accounts => {
  
  beforeEach(async function() {
    this.token = await DeStor.new();
  });
  
  describe('token attributes', function() {
    
    it('has the right name', async function() {
      const name = await this.token.name();
      name.should.equal('DeStor');
    });
    
  });
  
  
});
