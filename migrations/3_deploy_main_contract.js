var MainContract = artifacts.require("./MainContract.sol");

module.exports = function(deployer) {
  deployer.deploy(MainContract);
};
