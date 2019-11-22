import Web3 from "web3";
import config from "../toast_config.json";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const devmode = config.devmode;
        const serverhost = config.server[devmode]
        const provider = new Web3.providers.HttpProvider(
          "http://"+serverhost+":7545"
        );
        const privateKey = "46F3676AD8A08E347CC7D1B5A41EB4110F8B20F6E902CE58E1A09BE0B2BE1F8D";
        const web3 = new Web3(provider);
        web3.eth.accounts.privateKeyToAccount(privateKey);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });

export default getWeb3;
