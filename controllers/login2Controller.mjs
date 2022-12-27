import {sucheInDBmaNummer, sucheInDBmaNummerPasswort} from "../models/loginMaNummerPasswortDB.mjs";
import {checkMaNummer,checkPasswort} from "../utils/authenticateUser.mjs";
import splitDB_DBObj from "../utils/splitDB_DBObj_General.mjs";
import CryptoJS from "crypto-js";
import {encryptData, decryptData} from "../utils/crypto.mjs";
import User from "../utils/User.mjs";
import userEingeloggtArray from "../utils/userEingeloggtArray.mjs";
import session from "express-session";

import jwt from 'jsonwebtoken';

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
var encryptedStringPasswortLClient;
export let loginControllerPost = async(req, res)=>{
    console.log("loginControllerPost")
    let isMa_NummerInDB = false;
    let isPasswortUserInDB = false;
    maNummerLClient = req.body.maNummerLEingabe;
 //   console.log("maaaaNummerL: "+maNummerLClient)
    passwortLClient = req.body.passwortLEingabe;
 //   console.log("paaaaasswortL: "+passwortLClient)

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
     //   console.log("isMa_NummerInDB und isPasswortUserInDB sind true");
    //    console.log("encryptedString: "+encryptedStringPasswortLClient)

        let user1 = erstelleUser(maNummerLClient,encryptedStringPasswortLClient)
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
            "ErfasstDatumU_D": (await user1).getErfasstZeitU(),
            "ErfasstZeitU_D": (await user1).getErfasstZeitU(),
            "MaNummer_D": (await user1).getMaNummerU(),
            "Vorname_D": (await user1).getVornameU(),
            "Nachname_D": (await user1).getNachnameU(),
            "Passwort_D": (await user1).getPasswortU(),
            "RolleUser_D": (await user1).getRolleU(),
            "AvatarFarbeU_D": (await user1).getAvatarFarbeU(),
            "userID_D": (await user1).getID()
        }
        let userData2 = {
            "name": "hans"
        }
        //userEingeloggtArray.push(userData1,userData2);
        userEingeloggtArray.push(userData1);
       // console.log("userData1: "+ JSON.stringify(userData1))
      //  console.log("userData2: "+ JSON.stringify(userData2))
     //   console.log("userArrayuserArray.toString(): "+ JSON.stringify(userEingeloggtArray[0]))
       // console.log("finde: "+ JSON.stringify(userArray.find(userE => userE.MaNummer_D === "MaNummer_D")))



        let userGefunden = userEingeloggtArray.find(userE => userE.MaNummer_D === "70220")
    //    console.log("userGefunden: "+JSON.stringify(userGefunden));

        //let userGefunden2 = userArray.find(userE => {userE.MaNummer_D === "70220" , userE.Passwort_D === "1234"})
        //let userGefunden2 = userArray.find(userE => (userE.MaNummer_D === "70220" && userE.Passwort_D === "1234"))
        //let userGefunden2 = userArray.find(userE => (userE.MaNummer_D === "70220" , userE.Passwort_D === "1234"))
        //let userGefunden2 = userArray.find(userE => userE.MaNummer_D === "70220" && userE.Passwort_D === "1234")
        //let userGefunden2 = userArray.find(userE => userE.MaNummer_D === "70220" , userE.Passwort_D === "1234")
        //let userGefunden2 = userArray.find(userE => userE.MaNummer_D === "70220" +   userE.Passwort_D === "1234")
        //let userGefunden2 = userArray.find(userE => userE.MaNummer_D,userE.Passwort_D === "70220","1234")// +   userE.Passwort_D === "1234")
        //console.log("userGefunden2: "+JSON.stringify(userGefunden2));

        // let flightDetails = [{  "airline": "B-201",  "from": "Bangaluru(BLR)",  "to": "Delhi(DEL)",  "detail": [{    "date": "2019-12-30",    "price": "3900",    "departTime": "12:00 PM",    "arriveTime": "14:00 PM",    "seats": "10"  }, {    "date": "2019-12-31",    "price": "3000",    "departTime": "17:30 PM",    "arriveTime": "19:30 PM",    "seats": "3"  }, {    "date": "2019-06-01",    "price": "2100",    "departTime": "09:00 AM",    "arriveTime": "11:00 AM",    "seats": "7"  }]}, {  "airline": "B-202",  "from": "Delhi(DEL)",  "to": "Bangaluru(BLR)",  "detail": [{    "date": "2019-12-30",    "price": "3000",    "departTime": "12:00 PM",    "arriveTime": "14:00 PM",    "seats": "10"  }, {    "date": "2019-12-31",    "price": "3000",    "departTime": "17:30 PM",    "arriveTime": "19:30 PM",    "seats": "3"  }, {    "date": "2019-06-01",    "price": "2100",    "departTime": "09:00 AM",    "arriveTime": "11:00 AM",    "seats": "7"  }]}],
        //     MaNummer_D = "70220",
        //     Passwort_D = "1234",
            let found = userEingeloggtArray.find(userE =>({from, to}) => from.includes(userE.MaNummer_D = "70220") && to.includes(userE.Passwort_D = "1234"));
      //  console.log("found: "+JSON.stringify(found));


        function findResults(userArray, searchObj) {
            return userArray.filter(el => {
                return Object.entries(searchObj).every(([key, value]) => searchMatch(el[key], value));
                //return Object.entries(searchObj).every(el[key], value);// => searchMatch(el[key], value));
            })
        }
        function searchMatch(target, search) {
            search = String(search);//.trim().toLowerCase();
            return String(target)//;.toLowerCase().includes(search);
        }
       // console.log("Result 3: ", findResults(userEingeloggtArray, { MaNummer_D: '70220', Passwort_D: '1234'}));



        let arr = [
            { name:"string 1", value:"this", other: "that" },
            { name:"string 2", value:"this", other: "that" }
        ];

        let obj = arr.find(o => o.name === 'string 1');
       // console.log(obj);
      //  console.log("obj: "+JSON.stringify(obj));

        // console.log("user1: " + (await user1).getRolleU())
        // console.log("user1: " + (await user1).getID())
        // let userXX = (await user1).getID()===1;
        //console.log("userXXX mit id 1" + userXX.getname)

     //  req.session.userId = (await user1).getID();

        //username and password
        const myusername = 'user1'
        const mypassword = 'mypassword'

        // a variable to save a session
        var session;


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

        //console.log("req.session: "+req.session);

        console.log("////////////////////////// hier käme inHome....////////////////////////////////////////////////////////////");

        res.redirect('/api/v1/inHome/:'+ (await user1).getMaNummerU()+"*"+(await user1).getPasswortU());
        //res.redirect('/api/v1/inHome/:'+JSON.stringify(userData1));

        //res.redirect('/api/v1/inHome/:'+accessToken);
        //res.redirect('/api/v1/inHome/:'+(await user1).getMaNummerU()+(await user1).getPasswortU()+(await user1).getID()+(await user1).getRolleU())
       // res.redirect('/api/v1/inHome/:'+entries+" "+propertyValues);
       //  res.render('pages/login',{
       //      maNummerLServer : maNummerLClient,
       //      passwortLServer : encryptedStringPasswortLClient,
       //      xClicker: clicker()
       //  });

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


export async function erstelleUser(maNummerLClient, encryptedStringPasswortLClient){
    console.log("Bin erstelle User, habe bekommen: "+maNummerLClient+", "+encryptedStringPasswortLClient)
    let ausgabeDB = "";
    ausgabeDB = await sucheInDBmaNummerPasswort(maNummerLClient, encryptedStringPasswortLClient);
    //User.id1=0;

    let u1 = new User();
    //console.log("-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-*-*");
    //console.log(u1.Id)
    //console.log(u1.id1)
   // console.log(u1.getID());
   // console.log("-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-*-*");

    u1.setErfasstDatumU(splitDB_DBObj(ausgabeDB).Erfasst_D_U);
    u1.setErfasstZeitU(splitDB_DBObj(ausgabeDB).Erfasst_Z_U);
    u1.setMaNummerU(splitDB_DBObj(ausgabeDB).MA_Nummer);
    u1.setVornameU(splitDB_DBObj(ausgabeDB).Vorname);
    u1.setNachnameU(splitDB_DBObj(ausgabeDB).Nachname);
    u1.setPasswortU(splitDB_DBObj(ausgabeDB).Passwort_User);
    u1.setRolleU(splitDB_DBObj(ausgabeDB).RolleUser);
    u1.setAvatarFarbeU(splitDB_DBObj(ausgabeDB).AvatarFarbe);

    // console.log("U1--ErfasstDatumU:   "+ u1.getErfasstDatumU())
    // console.log("U1--ErfasstZeitU:   "+ u1.getErfasstZeitU())
    // console.log("U1--MaNummer:   "+ u1.getMaNummerU())
    // console.log("U1--Vorname:   "+ u1.getVornameU())
    // console.log("U1--Nachname:   "+ u1.getNachnameU())
    // console.log("U1--Passwort:   "+ u1.getPasswortU())
    // console.log("U1--RolleUser:   "+ u1.getRolleU())
    // console.log("U1--AvatarFarbeU:   "+ u1.getAvatarFarbeU())
    // console.log("u1--"+u1)
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