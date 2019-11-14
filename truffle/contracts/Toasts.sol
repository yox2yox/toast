pragma solidity ^0.5.0;

contract Toasts {

  struct UserData {
    string name;
    string discription;
    uint balance;
  }

  struct Comment {
    address author;
    string article_url;
    string comment;
    uint staked;
    bool is_good;
  }

  mapping(address => UserData) usersData;

  mapping(address => mapping(address => uint)) addressToStakeIndex;
  mapping(address => address[]) stake_for;
  mapping(address => uint[]) stake_amount;


  Comment[] public comments;
  mapping( address => uint[]) addressToComments;

  mapping( string => uint[] ) articleToComments;
  mapping( string => uint ) articleStaked;

  mapping( string => uint[]) tagToComments;
  string[] tags;
  mapping( string => uint ) tagToTagid;

  function signUp(string memory _name,string memory _discription) public {
    usersData[msg.sender] = UserData(_name,_discription,0);
  }

  function sendEther(uint commentid) public payable {

    require(commentid <= comments.length && commentid > 0);
    address to = comments[commentid-1].author;
    usersData[to].balance += msg.value;
    uint index = addressToStakeIndex[msg.sender][to];
    if (index==0){
      addressToStakeIndex[msg.sender][to] = stake_for[msg.sender].length+1;
      stake_for[msg.sender].push(to);
      stake_amount[msg.sender].push(msg.value);
    } else{
      uint val = stake_amount[msg.sender][index-1];
      stake_amount[msg.sender][index-1] = val + msg.value;
    }

  }

  function toastComment(string memory url,string memory comment,bool isgood,uint[] memory tagsId) public returns(uint) {
    comments.push(Comment(msg.sender,url,comment,0,isgood));
    addressToComments[msg.sender].push(comments.length);
    for( uint i = 0; i < tagsId.length; i++ ){
      if (tagsId[i]<=tags.length && tagsId[i] != 0){
        tagToComments[tags[tagsId[i]-1]].push(comments.length);
      }
    }
    return comments.length;
  }

  function addTag(string memory tag) public {
    tags.push(tag);
    tagToTagid[tag] = tags.length;
  }

  function withdraw() public {
    uint balance = usersData[msg.sender].balance;
    require (balance > 0,"your balance is not enough");
    usersData[msg.sender].balance = 0;
    msg.sender.transfer(balance);
  }

  function getUserData(address user) public view returns (string memory,string memory,uint) {
    return (usersData[user].name,usersData[user].discription,usersData[user].balance);
  }

  function getStakes(address user) public view returns (address[] memory,uint[] memory) {
    return (stake_for[user],stake_amount[user]);
  }

  function getStakeIndex(address user) public view returns (uint) {
    return (addressToStakeIndex[msg.sender][user]);
  }

  function getComment(uint commentid) public view returns (address,string memory,string memory,uint,bool) {
    uint index = commentid - 1;
    return (comments[index].author,comments[index].article_url,comments[index].comment,
            comments[index].staked,comments[index].is_good);
  }

  function getUsersCommentsIndex(address user) public view returns (uint[] memory) {
    return addressToComments[user];
  }

  function getCommentsFromTag(string memory tag) public view returns (uint[] memory) {
    return tagToComments[tag];
  }

  function getTagCount() public view returns (uint){
    return tags.length;
  }

  function getTag(uint tagid) public view returns (string memory){
    return tags[tagid];
  }

  function getArtcileInfo(string memory url) public view returns (uint[] memory,uint){
    return (articleToComments[url],articleStaked[url]);
  }


}
