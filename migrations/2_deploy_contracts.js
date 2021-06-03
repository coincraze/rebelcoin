var IPFSDrive = artifacts.require("./IPFSDrive.sol");
var DeStor = artifacts.require("./DeStor.sol");

module.exports = function(deployer) {
  deployer.deploy(IPFSDrive);
  deployer.deploy(DeStor);
};
