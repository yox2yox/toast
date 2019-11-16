pragma solidity ^0.5.0;

contract Toasts {

  struct UserData {
    bytes name;
    bytes discription;
    uint balance;
  }

  struct Comment {
    address author;
    bytes article_url;
    uint article_id;
    string comment;
    uint staked;
    bool is_good;
  }

  struct Article{
    uint[] comments;
    uint staked;
    bytes url;
  }

  mapping(address => UserData) usersData;

  mapping(address => mapping(address => uint)) addressToStakeIndex;
  mapping(address => address[]) stake_for;
  mapping(address => uint[]) stake_amount;


  Comment[] public comments;
  mapping( address => uint[]) addressToComments;

  mapping( string => uint[]) tagToComments;
  string[] tags;
  mapping( string => uint ) tagToTagid;


  Article[] public articles;
  mapping( bytes32 => uint ) urlToArticleId;

  function signUp(bytes memory _name,bytes memory _discription) public {
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
    comments[commentid-1].staked += msg.value;
    articles[comments[commentid-1].article_id-1].staked += msg.value;
  }

  function toastComment(bytes memory url,string memory comment,bool isgood,uint[] memory tagsId) public returns(uint) {
    bytes32 urlhash = keccak256(url);
    uint articleId = urlToArticleId[urlhash];
    if (articleId<=0){
      urlToArticleId[urlhash] = articles.length+1;
      articleId = articles.length+1;
      uint[] memory coms;
      articles.push(Article(coms,0,url));
      articles[articleId-1].comments.push(comments.length+1);
    } else {
      articles[articleId-1].comments.push(comments.length+1);
      articles[articleId-1].url = url;
    }

    addressToComments[msg.sender].push(comments.length+1);
    comments.push(Comment(msg.sender,url,articleId,comment,0,isgood));
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

  function getUserData(address user) public view returns (bytes memory,bytes memory,uint) {
    return (usersData[user].name,usersData[user].discription,usersData[user].balance);
  }

  function getStakes(address user) public view returns (address[] memory,uint[] memory) {
    return (stake_for[user],stake_amount[user]);
  }

  function getStakeIndex(address user) public view returns (uint) {
    return (addressToStakeIndex[msg.sender][user]);
  }

  function getComment(uint commentid) public view returns (address,bytes memory,string memory,uint,bool) {
    require(commentid>0 && commentid <= comments.length,"commentid is invalid");
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
    require(tagid>=1&&tagid<=tags.length,"tagid is invalid");
    return tags[tagid-1];
  }

  function getTagId(string memory tag) public view returns (uint) {
    return tagToTagid[tag];
  }

  function getArtcileInfoFromUrl(bytes memory url) public view returns (uint,uint[] memory,uint){
    uint id = urlToArticleId[keccak256(url)];
    require(id>0&&id<=articles.length,"id is invalid");
    return (id,articles[id-1].comments,articles[id-1].staked);
  }

  function getArticleInfoFromId(uint id) public view returns (bytes memory,uint[] memory,uint){
    require(id>0&&id<=articles.length,"id is invalid");
    return (articles[id-1].url,articles[id-1].comments,articles[id-1].staked);
  }


}
