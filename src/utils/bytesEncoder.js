export const encodeToBytes = (str)=>{
    return (new TextEncoder('utf-8')).encode(str);
}

export const decodeFromHex = (hex)=>{
    const bytes = [];
    let init = false;
    while (hex != null && hex.length >= 2) {
        if (init!==false){
            bytes.push(parseInt(hex.substring(0,2),16));
        }
        init = true;
        hex = hex.substring(2,hex.length);
    }
    return (new TextDecoder).decode(Uint8Array.from(bytes));
}