import CryptoJS from "crypto-js";

var encryptedStringPasswortLClient;//=encryptData(data,iv,key);//muss var sein//
//console.log("bin crypto.mjs encryptedStriiiing: "+encryptedStringPasswortLClient);//genrated encryption String:  swBX2r1Av2tKpdN7CYisMg==

export function encryptData(data,iv,key){
  //  console.log("bin encryptData-Funktion in crypto.mjs");
    if(typeof data=="string"){
        data=data.slice();
        encryptedStringPasswortLClient = CryptoJS.AES.encrypt(data, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    }
    else{
        encryptedStringPasswortLClient = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    }
    return encryptedStringPasswortLClient.toString();
}


export function decryptData(encrypted,iv,key){
    let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8)
}


export default {encryptData, decryptData};