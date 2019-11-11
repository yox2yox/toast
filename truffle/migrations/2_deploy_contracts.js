var Toasts = artifacts.require("./Toasts.sol");

module.exports = function(deployer) {
  deployer.deploy(Toasts);
};
