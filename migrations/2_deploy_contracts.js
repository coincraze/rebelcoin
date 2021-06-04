var IPFSDrive = artifacts.require("./IPFSDrive.sol");
var DSNet = artifacts.require("./DSNet.sol");

module.exports = function(deployer) {
  deployer.deploy(IPFSDrive);
  deployer.deploy(DSNet);
};
