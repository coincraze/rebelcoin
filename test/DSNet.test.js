const DSNet = artifacts.require("./DSNet.sol");

require('chai')
.should();

contract("DSNet", accounts => {
  
  beforeEach(async function() {
    this.token = await DSNet.new();
  });
  
  describe('token attributes', function() {
    
    it('has the right name', async function() {
      const name = await this.token.name();
      name.should.equal('DSNet');
    });
    
  });
  
  
});
