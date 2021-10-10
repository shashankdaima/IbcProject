var authContract = artifacts.require("./Auth.sol");

module.exports = function(deployer) {
  deployer.deploy(authContract);
};