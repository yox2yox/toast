import config from "../toast_config.json";

const getOgp = (url)=>{
    const http = new XMLHttpRequest();
    const data = {Url:url}
    const devmode = config.devmode;
    const serverhost = config.server[devmode]
    http.open( "POST", "http://"+serverhost+":9999/ogp", false ); // false for synchronous request
    http.setRequestHeader( 'Content-Type', 'application/json' );
    http.send( JSON.stringify(data) );
    const result = JSON.parse(http.responseText);
    if (!result||!result["Result"]){
        throw "failed to get ogp data"
    }
    return result;
}

export default getOgp;