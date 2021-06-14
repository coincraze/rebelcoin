var IPFSDrive = artifacts.require("./IPFSDrive.sol");
var CSDC = artifacts.require("./CSDC.sol");

module.exports = function(deployer) {
  deployer.deploy(IPFSDrive);
  deployer.deploy(CSDC);
};
