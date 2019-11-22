const path = require("path");

/*const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "666142701E0427A39AE0645A5CA8241B0DD67FBE2F45EFE43AAF18AE5E853A92";
const infura_url = "https://ropsten.infura.io/v3/d5c73d298b2e4401b9ed5d5cb7694078";*/

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "../src/contracts"),
  networks: {
    develop: {
      port: 7545
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    /*ropsten: {
      provider: function () {
        return new HDWalletProvider(mnemonic, infura_url)
      },
      network_id: 3,
      gas: 4700000
    }*/
  }
};
