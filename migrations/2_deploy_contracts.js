var IPFSDrive = artifacts.require("./IPFSDrive.sol");
var UniqueNFT = artifacts.require("./DeStor.sol");

module.exports = function(deployer) {
  deployer.deploy(IPFSDrive);
  deployer.deploy(DeStor);
};
