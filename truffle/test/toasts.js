const Toasts = artifacts.require("./Toasts.sol");

contract("Toasts", accounts => {
  it("...should store the value 89.", async () => {
    const toastsInstance = await Toasts.deployed();

    await toastsInstance.signUp("new","yes i am");

    const user = await toastsInstance.getUserData(accounts[0]);

    console.log(user);

    assert.equal(user[0],"new","The value new was not sotored");

    let commentBN = await toastsInstance.toastComment("url","comment",true,[]);

    let commentid = 1

    let comment = await toastsInstance.getComment(commentid);
    console.log(comment);

    await toastsInstance.sendEther(commentid,{value:30});

    let stakeinfo = await toastsInstance.getStakes(accounts[0]);
    console.log(Number(stakeinfo[1][0]))
    assert.equal(stakeinfo[0][0],accounts[0],"failed to stake");
    assert.equal(Number(stakeinfo[1][0]),30,"failed to stake");

    let stakeidx = await toastsInstance.getStakeIndex(accounts[0]);
    console.log(stakeidx);

    await toastsInstance.sendEther(commentid,{value:30});
    
    stakeinfo = await toastsInstance.getStakes(accounts[0]);
    console.log(Number(stakeinfo[1][0]))
    assert.equal(stakeinfo[0][0],accounts[0],"failed to stake");
    assert.equal(Number(stakeinfo[1][0]),60,"failed to stake");

  });
});
