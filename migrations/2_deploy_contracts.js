var IPFSDrive = artifacts.require("./IPFSDrive.sol");
var UniqueNFT = artifacts.require("./UniqueNFT.sol");

module.exports = function(deployer) {
  deployer.deploy(IPFSDrive);
  deployer.deploy(UniqueNFT);
};
