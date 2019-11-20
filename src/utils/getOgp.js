const getOgp = (url)=>{
    const http = new XMLHttpRequest();
    const data = {Url:url}
    http.open( "POST", "http://192.168.0.8:9999/ogp", false ); // false for synchronous request
    http.setRequestHeader( 'Content-Type', 'application/json' );
    http.send( JSON.stringify(data) );
    const result = JSON.parse(http.responseText);
    if (!result||!result["Result"]){
        throw "failed to get ogp data"
    }
    return result;
}

export default getOgp;