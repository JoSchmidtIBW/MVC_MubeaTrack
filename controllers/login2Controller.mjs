import {sucheInDBmaNummer, sucheInDBmaNummerPasswort} from "../models/loginMaNummerPasswortDB.mjs";
import {checkMaNummer,checkPasswort} from "../utils/authenticateUser.mjs";
import CryptoJS from "crypto-js";

let maNummerLEingabeClient;
let passwortLEingabeClient;

export let loginControllerGet = (req, res) => {
        maNummerLEingabeClient = req.body.maNummerLEingabe;
        passwortLEingabeClient = req.body.passwortLEingabe;

        res.render('pages/login', {
            maNummerLServer : maNummerLEingabeClient,
            passwortLServer : passwortLEingabeClient,
            xClicker: clicker()     // test mit einer Funktion namens clicker()....
        });
};
//----POST-Down-------------------------------------------------------------------------

let maNummerLClient;
let passwortLClient;
export let loginControllerPost = async(req, res)=>{
    console.log("loginControllerPost")
    let isMa_NummerInDB = false;
    let isPasswortUserInDB = false;
    maNummerLClient = req.body.maNummerLEingabe;
    console.log("maaaaNummerL: "+maNummerLClient)
    passwortLClient = req.body.passwortLEingabe;
    console.log("paaaaasswortL: "+passwortLClient)

    //***************************************************************************//
    let data= passwortLClient;//Message to Encrypt
    let iv  = CryptoJS.enc.Base64.parse("");//giving empty initialization vector
    let key=CryptoJS.SHA256("mySecretKey1");//hashing the key using SHA256  --> diesen in config oder in .env Datei auslagern!!!!
    var encryptedStringPasswortLClient=encryptData(data,iv,key);//muss var sein//
    console.log("encryptedString: "+encryptedStringPasswortLClient);//genrated encryption String:  swBX2r1Av2tKpdN7CYisMg==

    function encryptData(data,iv,key){
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

//var iv  = CryptoJS.enc.Base64.parse("");
//var key=CryptoJS.SHA256("Message");


    //das ist zum wieder das normale pw anzeigen, möchte das später einbauen
    let decrypteddata=decryptData(encryptedStringPasswortLClient,iv,key);
    console.log("decrypteddata: "+decrypteddata);//genrated decryption string:  Example1

    function decryptData(encrypted,iv,key){
        let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8)
    }
    //***************************************************************************



    isMa_NummerInDB = await checkMaNummer(maNummerLClient);
    console.log("isMa_NummerInDB: "+isMa_NummerInDB);

    isPasswortUserInDB = await checkPasswort(maNummerLClient,encryptedStringPasswortLClient);//
    console.log("isPasswortInDB: "+isPasswortUserInDB);

    if(isMa_NummerInDB===true && isPasswortUserInDB===false){

        //res.redirect('/api/inHome');
        res.render('pages/login',{
            maNummerLServer : "MA_Nummer IN db GEFUNDEN :)",
            passwortLServer : "pw leer oder falsch",
            xClicker: clicker()
        });
    }else if(isMa_NummerInDB===false&&isPasswortUserInDB===false){
        res.render('pages/login',{
            maNummerLServer : "MA_Nummer gibt es nicht in DB :(",
            passwortLServer : "pw ist falsch oder leer",
            xClicker: clicker()
        });
    }else if(isMa_NummerInDB===true&&isPasswortUserInDB===false){
        res.render('pages/login',{
            maNummerLServer : "MA_Nummer gefunden :)",
            passwortLServer : "Passwort ist falsch :(",
            xClicker: clicker()
        });
    }else if(isMa_NummerInDB===true&&isPasswortUserInDB===true){
        console.log("isMa_NummerInDB und isPasswortUserInDB sind true");
        console.log("encryptedString: "+encryptedStringPasswortLClient)


        console.log("////////////////////////// hier käme inHome....////////////////////////////////////////////////////////////");

       // res.redirect('/api/v1/inHome/:'+entries+" "+propertyValues);
        res.render('pages/login',{
            maNummerLServer : maNummerLClient,
            passwortLServer : encryptedStringPasswortLClient,
            xClicker: clicker()
        });

        /*
        res.redirect('/api/v1/inHome/:',({
            pathname:"/",
            query: {
                "a": 1,
                "b": 2,
                "valid":"your string here"
            }
        }));
         */
        //res.redirect('/api/v1/inHome/:'+uuu11.getID());//
        //res.redirect('/api/v1/inHome/:'+uuu11);
        /*
        res.render('pages/inHome',{

        });
         */
    }
    //funktioniert
    //res.redirect('/api/inHome');
};



//----POST-UP-------------------------------------------------------------------------


let myCounter = 0;
function clicker() {
    myCounter = myCounter +1;
    console.log("Button Working! ich bin loginRoute.mjs, myCounter: " + myCounter);
};
//----------------------------------------------------------------------------------


export async function erstelleUser(maNummerLClient, passwortL){
    console.log("Bin erstelle User, habe bekommen: "+maNummerLClient+", "+passwortL)
    let ausgabeDB = "";
    ausgabeDB = await sucheInDBmaNummerPasswort(maNummerLClient, passwortL);
    //User.id1=0;

    let u1 = new User();
    console.log("-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-*-*");
    //console.log(u1.Id)
    //console.log(u1.id1)
    console.log(u1.getID());
    console.log("-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-*-*");
    u1.setMa_NummerU(splitDB_DBObj(ausgabeDB).MA_Nummer);
    u1.setVornameU(splitDB_DBObj(ausgabeDB).Vorname);
    u1.setNachnameU(splitDB_DBObj(ausgabeDB).Nachname);
    u1.setPasswortU(splitDB_DBObj(ausgabeDB).Passwort_User);
    u1.setIstChefU(splitDB_DBObj(ausgabeDB).IstChef);

    console.log("U1--MaNummer:   "+ u1.getMa_NummerU())
    console.log("U1--Vorname:   "+ u1.getVornameU())
    console.log("U1--Nachname:   "+ u1.getNachnameU())
    console.log("U1--Passwort:   "+ u1.getPasswortU())
    console.log("U1--istChef:   "+ u1.getIstChefU())
    console.log("u1--"+u1)
    return u1;
}



export default {loginControllerGet, loginControllerPost};



//------------------------------+++++++++++++-+--------------------------------------------------
//import CryptoJS from 'crypto-js';         erstellt jedesmal ein neuer hash
let cipherPasswortL = CryptoJS.AES.encrypt("1", 'secret key 123').toString();////
console.log("cipherPasswortL: "+cipherPasswortL)
//problem: man kann ma-nummer suchen, objekt erstellen mit pw, wenn pw gleich decrypt dann gut
//aber mann möchte ma_nummer und pw suchen in db, was wenn es zwei gleiche ma_nummern hat
// Decrypt
let bytes  = CryptoJS.AES.decrypt("U2FsdGVkX1+nJNyUfcMjzGmoApYQeogYR3oBzoCB19Q=", 'secret key 123');
console.log("bytespasswortL: "+bytes)
let originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log("originalTextpasswortL: "+originalText); // 'my message'
//------------------------------------+++++++++++++++++---------------------------------------------