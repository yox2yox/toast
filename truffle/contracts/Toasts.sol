pragma solidity ^0.5.0;

contract Toasts {

  struct UserData {
    bytes name;
    bytes discription;
    uint balance;
    uint jelly;
  }

  struct Comment {
    uint comment_id;
    address author;
    bytes article_url;
    uint article_id;
    bytes comment;
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

  mapping( bytes => uint[]) tagToComments;
  bytes[] tags;
  mapping( bytes => uint ) tagToTagid;


  Article[] public articles;
  mapping( bytes32 => uint ) urlToArticleId;

  mapping( bytes => uint ) urlToRequestId;
  bytes[] requestsUrl;
  uint[] jellyAmount;

  function signUp(bytes memory _name,bytes memory _discription) public {
    usersData[msg.sender] = UserData(_name,_discription,0,0);
  }

  function sendEther(uint commentid) public payable {

    require(commentid <= comments.length && commentid > 0,"id is invalid");

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
    usersData[msg.sender].jelly += msg.value;
    comments[commentid-1].staked += msg.value;
    articles[comments[commentid-1].article_id-1].staked += msg.value;
  }

  function toastComment(bytes memory url,bytes memory comment,bool isgood,uint[] memory tagsId) public returns(uint) {
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
    comments.push(Comment(comments.length+1,msg.sender,url,articleId,comment,0,isgood));
    for( uint i = 0; i < tagsId.length; i++ ){
      if (tagsId[i]<=tags.length && tagsId[i] != 0){
        tagToComments[tags[tagsId[i]-1]].push(comments.length);
      }
    }
    return comments.length;
  }

  function addTag(bytes memory tag) public {
    tags.push(tag);
    tagToTagid[tag] = tags.length;
  }

  function sendRequest(bytes memory url,uint jelly) public {
    require(usersData[msg.sender].jelly>jelly,"not enough jelly");
    usersData[msg.sender].jelly -= jelly;
    uint id = urlToRequestId[url];
    if (id>0){
      jellyAmount[id-1] += jelly;
    } else {
      requestsUrl.push(url);
      jellyAmount.push(jelly);
      urlToRequestId[url] = requestsUrl.length;
    }
  }

  function withdraw() public {
    uint balance = usersData[msg.sender].balance;
    require (balance > 0,"your balance is not enough");
    usersData[msg.sender].balance = 0;
    msg.sender.transfer(balance);
  }

  function resetStake(address to) public {
    uint index = addressToStakeIndex[msg.sender][to];
    require(index!=0,"cannnot find stake");
    stake_amount[msg.sender][index-1] = 0;
  }

  function getUserData(address user) public view returns (bytes memory,bytes memory,uint,uint) {
    return (usersData[user].name,usersData[user].discription,usersData[user].balance,usersData[user].jelly);
  }

  function getStakes(address user) public view returns (address[] memory,uint[] memory) {
    return (stake_for[user],stake_amount[user]);
  }

  function getStakeIndex(address user) public view returns (uint) {
    return (addressToStakeIndex[msg.sender][user]);
  }

  function getStakeAmount(address from,address to) public view returns (uint) {
    uint index = addressToStakeIndex[from][to];
    if (index>0){
      return stake_amount[from][index-1];
    }
    else{
      return 0;
    }
  }

  function getComment(uint commentid) public view returns (address, bytes memory, bytes memory, uint, bool, uint, uint) {
    require(commentid>0 && commentid <= comments.length,"commentid is invalid");
    uint index = commentid - 1;
    return (comments[index].author,comments[index].article_url,comments[index].comment,
          comments[index].staked,comments[index].is_good,commentid,comments[index].article_id);
  }

  function getUsersCommentsIndex(address user) public view returns (uint[] memory) {
    return addressToComments[user];
  }

  function getCommentsFromTag(bytes memory tag) public view returns (uint[] memory) {
    return tagToComments[tag];
  }

  function getTagCount() public view returns (uint){
    return tags.length;
  }

  function getTag(uint tagid) public view returns (bytes memory){
    require(tagid>=1&&tagid<=tags.length,"tagid is invalid");
    return tags[tagid-1];
  }

  function getTagId(bytes memory tag) public view returns (uint) {
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

  function getRequestsJelly() public view returns (uint[] memory){
    return jellyAmount;
  }

  function getRequestUrl(uint id) public view returns (bytes memory){
    return requestsUrl[id];
  }

}
