import {sucheInDBmaNummer, sucheInDBmaNummerPasswort} from "../models/loginMaNummerPasswortDB.mjs";
import {checkMaNummer,checkPasswort} from "../utils/authenticateUser.mjs";
import splitDB_DBObj from "../utils/splitDB_DBObj_General.mjs";
import CryptoJS from "crypto-js";
import {encryptData, decryptData} from "../utils/crypto.mjs";
import User from "../utils/User.mjs";
import userEingeloggtArray from "../utils/userEingeloggtArray.mjs";
import jwt from 'jsonwebtoken'

import cookieParser from 'cookie-parser';
import session from 'express-session';


let maNummerLEingabeClient;
let passwortLEingabeClient;

export let login1ControllerGet = (req, res) => {
    maNummerLEingabeClient = req.body.maNummerLEingabe;
    passwortLEingabeClient = req.body.passwortLEingabe;

    res.render('pages/login', {
        maNummerLServer : maNummerLEingabeClient,
        passwortLServer : passwortLEingabeClient,
        xClicker: clicker()     // test mit einer Funktion namens clicker()....
    });

    //console.log("lllreq.session.page_views: "+JSON.stringify(req.session.page_views))
    // if(req.session.page_views){
    //     req.session.page_views++;
    //     res.send("You visited this page " + req.session.page_views + " times");
    // } else {
    //     req.session.page_views = 1;
    //     res.send("Welcome to this page for the first time!");
    // }
};




//----POST-Down-------------------------------------------------------------------------
let maNummerLClient;
let passwortLClient;
var encryptedStringPasswortLClient;
export let login1ControllerPost = async(req, res)=>{
    console.log("loginControllerPost")
    let isMa_NummerInDB = false;
    let isPasswortUserInDB = false;
    maNummerLClient = req.body.maNummerLEingabe;
    //   console.log("maNummerLClient: "+maNummerLClient)
    passwortLClient = req.body.passwortLEingabe;
    //   console.log("passwortLClient: "+passwortLClient)

    // passwort wird hier gehascht und schreibt es in den: encryptedStringPasswortLClient
    //**************************************************************************
    let data= passwortLClient;//Message to Encrypt
    let iv  = CryptoJS.enc.Base64.parse("");//giving empty initialization vector
    let key=CryptoJS.SHA256("mySecretKey1");//hashing the key using SHA256  --> diesen in config oder in .env Datei auslagern!!!!
    //var encryptedStringPasswortLClient=encryptData(data,iv,key);//muss var sein//
    encryptedStringPasswortLClient=encryptData(data,iv,key);//muss var sein//
    //   console.log("encryptedString: "+encryptedStringPasswortLClient);//genrated encryption String:  swBX2r1Av2tKpdN7CYisMg==
    //--------------------------------------------------------------------------
    //das ist zum wieder das normale pw anzeigen, möchte das später einbauen
    let decrypteddata=decryptData(encryptedStringPasswortLClient,iv,key);
    //  console.log("decrypteddata: "+decrypteddata);
    //**************************************************************************



    isMa_NummerInDB = await checkMaNummer(maNummerLClient);
    //   console.log("isMa_NummerInDB: "+isMa_NummerInDB);

    isPasswortUserInDB = await checkPasswort(maNummerLClient,encryptedStringPasswortLClient);//
    //  console.log("isPasswortInDB: "+isPasswortUserInDB);

    //wenn login manummer falsch, zeige das in der loginseite an
    if(isMa_NummerInDB===true && isPasswortUserInDB===false){
        res.render('pages/login',{
            maNummerLServer : "MA_Nummer gefunden :)",
            passwortLServer : "Passwort falsch :(",
            xClicker: clicker()
        });
    }else if(isMa_NummerInDB===false&&isPasswortUserInDB===false){
        res.render('pages/login',{
            maNummerLServer : "MA_Nummer falsch :(",
            passwortLServer : "Passwort falsch :(",
            xClicker: clicker()
        });
    }else if(isMa_NummerInDB===true&&isPasswortUserInDB===false){
        res.render('pages/login',{
            maNummerLServer : "MA_Nummer gefunden :)",
            passwortLServer : "Passwort falsch :(",
            xClicker: clicker()
        });
    }else if(isMa_NummerInDB===true&&isPasswortUserInDB===true) {
        //   console.log("isMa_NummerInDB und isPasswortUserInDB sind true");
        //    console.log("encryptedString: "+encryptedStringPasswortLClient)

        let user1 = erstelleUser(maNummerLClient, encryptedStringPasswortLClient)
        // console.log("user1--ErfasstDatumU:   "+ (await user1).getErfasstDatumU())
        // console.log("user1--ErfasstZeitU:   "+ (await user1).getErfasstZeitU())
        // console.log("user1--MaNummer:   "+ (await user1).getMaNummerU())
        // console.log("user1--Vorname:   "+ (await user1).getVornameU())
        // console.log("user1--Nachname:   "+ (await user1).getNachnameU())
        // console.log("user1--Passwort:   "+ (await user1).getPasswortU())
        // console.log("user1--RolleUser:   "+ (await user1).getRolleU())
        // console.log("user1--AvatarFarbeU:   "+ (await user1).getAvatarFarbeU())
        // console.log("user1--ID:   "+ (await user1).getID())

        //userArray.push(user1);

        let userData1 = {
            "ErfasstDatumU_D": (await user1).getErfasstDatumU(),
            "ErfasstZeitU_D": (await user1).getErfasstZeitU(),
            "MaNummer_D": (await user1).getMaNummerU(),
            "Vorname_D": (await user1).getVornameU(),
            "Nachname_D": (await user1).getNachnameU(),
            "Passwort_D": (await user1).getPasswortU(),
            "RolleUser_D": (await user1).getRolleU(),
            "AvatarFarbeU_D": (await user1).getAvatarFarbeU(),
            "userID_D": (await user1).getId_UserU()// .getID()
        }
        // let userData2 = {
        //     "name": "hans"
        // }
        // userEingeloggtArray.push(userData1,userData2);


        userEingeloggtArray.push(userData1);
        //console.log("login userEingeloggtArray: "+userEingeloggtArray)



        res.cookie('cokMaNummer', (await user1).getMaNummerU(), {
            maxAge: 1000 * 600, // 1 min    600=10min   1000 = 1s
            httpOnly: true // http only, prevents JavaScript cookie access
        });


        //console.log("req.session: "+req.session);
        console.log("////////////////////////// hier käme inHome....////////////////////////////////////////////////////////////");
        //res.redirect('/api/v1/inHome/:'+ (await user1).getMaNummerU()+"*"+(await user1).getPasswortU());

        let x = 1;
        //let session=req.session;
       // let session = (await user1).getID();
        // console.log("llreq.session: " + req.session);//[object Object]
        // console.log("llJSON.stringifyreq.session--------: " + JSON.stringify(req.session))
        // console.log("llsession: " + session)//[object Object]
        // console.log("llJSON.stringifysession: " + JSON.stringify(session))
        // if(req.session.cookie.maxAge){
        //     req.session.cookie.maxAge = false;


        //res.send("oki")
      //  const token = jwt.sign({id: 7, role: "captain"}, "YOUR_SECRET_KEY");
        //console.log("l token: "+ token)

    //     return res
    //         .cookie("access_token", token, {
    //             httpOnly: true,
    //             secure: process.env.NODE_ENV === "production",
    //         })
    //         .status(200)
    //         .json({message: "Logged in successfully 😊 👌"});
    // }
             res.redirect('/api/v1/inHome/:'+ (await user1).getMaNummerU()+"*"+(await user1).getId_UserU()+"*")//+"*"+session);
        // }
        // else{
        //     res.send('afewrtrdfgXX!');
        // }





        //res.redirect('/api/v1/inHome/:'+JSON.stringify(userData1));
        //res.redirect('/api/v1/inHome/:'+accessToken);
        //res.redirect('/api/v1/inHome/:'+(await user1).getMaNummerU()+(await user1).getPasswortU()+(await user1).getID()+(await user1).getRolleU())
        // res.redirect('/api/v1/inHome/:'+entries+" "+propertyValues);
        //res.redirect('/api/v1/inHome/:'+uuu11.getID());//
        //res.redirect('/api/v1/inHome/:'+uuu11);
        //res.render('pages/inHome',{});
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

        // const JWT_SECRET =
        //     "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";
        //
        // const accessToken = jwt.sign(
        //     { "sub": "123", "name": "Alice" },
        //     JWT_SECRET,
        //     {
        //         expiresIn:process.env.NODE_ENV=== "production" ?"6h" :"2 days",
        //     }
        // );
        //res.json({msg: "User logged in!",accessToken});
        // console.log("accessToken: "+accessToken);
        //console.log("res.json: "+res.json());
        //console.log("res.json: "+res.json);
    }
};
//----------POST--UP-------------------------------------------------------------------------------------------



//zum lernen, wenn ejs eine clickerfunktion ausführt
let myCounter = 0;
function clicker() {
    myCounter = myCounter +1;
   // console.log("Button Working! ich bin loginRoute1.mjs, myCounter: " + myCounter);
};





export async function erstelleUser(maNummerLClient, encryptedStringPasswortLClient){
    console.log("Bin erstelle User, habe bekommen: "+maNummerLClient+", "+encryptedStringPasswortLClient)

    let ausgabeDB = "";

    ausgabeDB = await sucheInDBmaNummerPasswort(maNummerLClient, encryptedStringPasswortLClient);
    console.log("////////*************** ausgabe:"+ausgabeDB)
    let u1 = new User();
    console.log("---------------------------------------------------------------------------"+u1.setId_UserU(splitDB_DBObj(ausgabeDB)))
    u1.setId_UserU(splitDB_DBObj(ausgabeDB).ID_User)
    u1.setErfasstDatumU(splitDB_DBObj(ausgabeDB).Erfasst_D_U);
    u1.setErfasstZeitU(splitDB_DBObj(ausgabeDB).Erfasst_Z_U);
    u1.setMaNummerU(splitDB_DBObj(ausgabeDB).MA_Nummer);
    u1.setVornameU(splitDB_DBObj(ausgabeDB).Vorname);
    u1.setNachnameU(splitDB_DBObj(ausgabeDB).Nachname);
    u1.setPasswortU(splitDB_DBObj(ausgabeDB).Passwort_User);
    u1.setRolleU(splitDB_DBObj(ausgabeDB).RolleUser);
    u1.setAvatarFarbeU(splitDB_DBObj(ausgabeDB).AvatarFarbe);

    return u1;
}



export default {login1ControllerGet, login1ControllerPost};





// zum lernen, braucht es nicht, aber hier entsteht jedesmal ein neuer hash
//------------------------------+++++++++++++-+--------------------------------------------------
//import CryptoJS from 'crypto-js';         erstellt jedesmal ein neuer hash
let cipherPasswortL = CryptoJS.AES.encrypt("1", 'secret key 123').toString();////
console.log("login1Controller cipherPasswortL: "+cipherPasswortL)
//problem: man kann ma-nummer suchen, objekt erstellen mit pw, wenn pw gleich decrypt dann gut
//aber mann möchte ma_nummer und pw suchen in db, was wenn es zwei gleiche ma_nummern hat
// Decrypt
let bytes  = CryptoJS.AES.decrypt("U2FsdGVkX1+nJNyUfcMjzGmoApYQeogYR3oBzoCB19Q=", 'secret key 123');
console.log("login1Controller bytespasswortL: "+bytes)
let originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log("login1Controller originalTextpasswortL: "+originalText); // 'my message'
//------------------------------------+++++++++++++++++---------------------------------------------




