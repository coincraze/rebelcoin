var CSDCTreasury = artifacts.require("./CSDCTreasury.sol");
var CSDC = artifacts.require("./CSDC.sol");

module.exports = function(deployer) {
  deployer.deploy(CSDC).then(function() {
    return deployer.deploy(CSDCTreasury,CSDC.address);
  });
};
