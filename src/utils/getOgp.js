const getOgp = (url)=>{
    const http = new XMLHttpRequest();
    const data = {Url:url}
    http.open( "POST", "http://localhost:9999/ogp", false ); // false for synchronous request
    http.setRequestHeader( 'Content-Type', 'application/json' );
    http.send( JSON.stringify(data) );
    const result = JSON.parse(http.responseText);
    return result;
}

export default getOgp;