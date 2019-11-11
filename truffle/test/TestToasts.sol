pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Toasts.sol";

contract TestToasts {

  function testItStoresAValue() public {
    Toasts simpleStorage = Toasts(DeployedAddresses.Toasts());

    simpleStorage.set(89);

    uint expected = 89;

    Assert.equal(simpleStorage.get(), expected, "It should store the value 89.");

    simpleStorage.signUp("new","yes i am");

    string memory expectedName = "new";
    string memory expectedDiscription = "yes i am";

    (string memory name, string memory disc,uint balance) = simpleStorage.getUserData(address(this));
    Assert.equal(name, expectedName, "It should store the value new.");
    Assert.equal(disc, expectedDiscription, "It should store the value 'yes i am'.");

    bool staked = simpleStorage.stakeCoin(msg.sender);

    Assert.equal(staked, true, "It should store the value true.");

/*
    address[] memory from;
    uint[] memory amount;

    (from,amount) = simpleStorage.getReputations(address(this));
*/    

  }

}
