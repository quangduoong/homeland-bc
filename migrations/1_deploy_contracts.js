const contract = artifacts.require("./build/contracts/index");

module.exports = function (deployer) {
  deployer.deploy(contract);
};
