import {sucheInDBmaNummer, sucheInDBmaNummerPasswort} from "../models/loginMaNummerPasswortDB.mjs";
import splitDB_DBObj from "./splitDB_DBObj_General.mjs";
import userEingeloggtArray from "./userEingeloggtArray.mjs";

import session from "express-session";

//const jwt = require('jsonwebtoken');
//
// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//         const userId = decodedToken.userId;
//         if (req.body.userId && req.body.userId !== userId) {
//             throw 'Invalid user ID';
//         } else {
//             next();
//         }
//     } catch {
//         res.status(401).json({
//             error: new Error('Invalid request!')
//         });
//     }
// };


function isAuthorized(req, res, next) {
    const auth = req.headers.authorization;
    if (auth === 'secretpassword') {
        next();
    } else {
        res.status(401);
        res.send('Not permitted');
    }
}

var foundImEingeloggt;
//mit der User-Rolle, admin, chef, mitarbeiter, nein, nur vorwärts oder rückwärts
export function authentificateUser(req, res, next){
   // console.log("ich bin authentificateUser-Funktion in utils/authentificateUser.js")
    const auth = req.headers.authorization;
    // console.log("was ist das: "+req.headers)
    // console.log("was ist das: "+req.headers.toString())
    // console.log("was ist das req.body: "+req.body)
    // console.log("req: " + req.query)
    // console.log("pathname authentificateUser: " + req.path)
    // console.log("auth: "+auth)
    // console.log("req.json: "+req.json)
    //
    // console.log("userEingeloggtArray.length: "+userEingeloggtArray.length)
    // console.log("userEingeloggtArray[0]: "+JSON.stringify(userEingeloggtArray[0]))
    // console.log("pathname JSON.stringifyauthentificateUser: " + JSON.stringify(req.path))

    const myArr = req.path.split(':');
    let gesplittetVonURLdenUserTeil = myArr[1];
   // console.log("authentificateUser-Funktion.mjs gesplittetVonURLdenUserTeil: " + gesplittetVonURLdenUserTeil)

   // console.log("authentificateUser-Funktion gesplittetVonURLdenUserTeiiiil: " + gesplittetVonURLdenUserTeil)
    const myArr1 = gesplittetVonURLdenUserTeil.split('*');
//    console.log("authentificateUser-Funktion gesplittet myArr1[0]: " + myArr1[0] + "    authentificateUser-Funktion.mjs gesplittet myArr1[1]: " + myArr1[1]);

    let maNummerURLAuth = myArr1[0];
    let passwortURLAuth = myArr1[1];

     console.log("Authentic maNummerURL: " + maNummerURLAuth);
     console.log("Authentic passwortURL: "+passwortURLAuth);

    console.log("+++++++++++++++--------------------: ")
    console.log("Authentic userEingeloggtArray.length "+userEingeloggtArray.length)   // 2
   // console.log("Authentic JSON.stringify(userEingeloggtArray) "+JSON.stringify(userEingeloggtArray))

    let myArray = [{'id':'73','foo':'bar'},{'id':'45','foo':'bar'}]
    console.log("+++++++++++++++: "+myArray.find(x => x.id === '45').foo);
    foundImEingeloggt = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLAuth && x.Passwort_D===passwortURLAuth))
    //console.log("+++++++++++++++: "+ JSON.stringify(fff));


    // todo hier ist es ein fehler, wenn sich jemand anmeldet, und ein anderer, dann steht hier das zuvor gesuchte
    //foundImEingeloggt = userEingeloggtArray.find(userE =>({from, to}) => from.includes(userE.MaNummer_D = maNummerURLAuth) && to.includes(userE.Passwort_D = passwortURLAuth));//funktioniert, aber flasch
    //foundImEingeloggt = userEingeloggtArray.find(userE =>({from, to}) => from.includes(userE.MaNummer_D = maNummerURLAuth) && to.includes(userE.Passwort_D = passwortURLAuth));
    console.log("Authentic foundImEingeloggt: "+JSON.stringify(foundImEingeloggt));

    //console.log("wer? "+foundImEingeloggt.ErfasstDatumU_D)//funktioniert
    //console.log("split???: "+splitDB_DBObj(foundImEingeloggt))
    if(foundImEingeloggt===undefined||foundImEingeloggt.MaNummer_D.length===0 || foundImEingeloggt.MaNummer_D === undefined
    || foundImEingeloggt.Passwort_D.length===0 || foundImEingeloggt.Passwort_D === undefined){
       //return res.send("401 Unautorized :) :)");
        //res.send("401 Unautorized :) :), hätte gerne hier noch einen Button, wo man zur login seite gehen könnte, aber nicht automatisch, möchte fehlermeldung sehen"+<input type="button" onclick="location.href='/api/v1/login2';" value="Go to login" />);
        res.send("<h1>401 Unautorized :) :)</h1><input type=\"button\" onclick=\"location.href='/api/v1/login2';\" value=\"Go to login\" />")
    } else if(maNummerURLAuth != foundImEingeloggt.MaNummer_D){
        // achtung, wenn server neustartet ist user nicht im array!!!!!!
        // einen Button, wo man zur login seite gehen könnte, aber nicht automatisch, möchte fehlermeldung sehen
        res.send("<h1>MaNummer ist falsch, 401 Unautorized :) :)</h1><input type=\"button\" onclick=\"location.href='/api/v1/login2';\" value=\"Go to login\" />");
    }
    else if(passwortURLAuth != foundImEingeloggt.Passwort_D){
        res.send("<h1>passwort ist falsch, 401 Unautorized :) :)</h1><input type=\"button\" onclick=\"location.href='/api/v1/login2';\" value=\"Go to login\" />");
    }
    else{
        return next();
    }
    //if(userArray.find()) {}

    // const { user, pwd } = req.body;
    // if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    // const foundUser = usersDB.users.find(person => person.username === user);
    // if (!foundUser) return res.sendStatus(401); //Unauthorized
    // // evaluate password
    // const match = await bcrypt.compare(pwd, foundUser.password);
    // if (match) {
    //     // create JWTs
    //     res.json({ 'success': `User ${user} is logged in!` });
    // } else {
    //     res.sendStatus(401);
    // }


    //return isIrgendwas;
    //
    //return next();//next is not defined
    //return res.end("401 Unautorized :) ");
    //res.send("401 Unautorized :) :)");

    //  res.render('pages/layoutInHomeAdmin',{
    //      maNummerLServer : maNummerLClient,
    //      passwortLServer : encryptedStringPasswortLClient,
    //      xClicker: clicker()
    //  });
    /*
        return next();
          } else {
            return res.end("401 Unautorized :)");
          }
        } else {
          return next();
        }
      } else {
        res.redirect('/api/v1/login2)
     */
}





export async function checkMaNummer(maNummer){
  //  console.log("bin checkMaNummer-Funktion, habe bekommen: "+maNummer);
    let isMaNummer = false;
    let ausgabeDB = "";
    ausgabeDB = await sucheInDBmaNummer(maNummer);//das geht nicht
  //  console.log("***********************ausgabeDB: "+ausgabeDB)
    if(ausgabeDB==='[]'||ausgabeDB===undefined){//wenn manummer mehrmals????
    //    console.log("ausgabeDB ist leeeeer!!!! sowas existiert nicht in der DB!!");
   //     console.log("Diese MitarbeiterNummer gibt es nicht in der Datenbank!!!");
        isMaNummer= false;
    }else{
   //     console.log('AusgabeDB ist voll, hat was gefunden :)');
        splitDB_DBObj(ausgabeDB);
        /// console.log(splitDB_DBObj(ausgabeDB))
        //let u1 = new User("x","x","x","x","x");
        /*
        let u1 = new User();
        u1.setMa_NummerU(splitDB_DBObj(ausgabeDB).MA_Nummer);
        u1.setVornameU(splitDB_DBObj(ausgabeDB).Vorname);
        u1.setNachnameU(splitDB_DBObj(ausgabeDB).Nachname);
        u1.setPasswortU(splitDB_DBObj(ausgabeDB).Passwort_User);
        u1.setIstChefU(splitDB_DBObj(ausgabeDB).IstChef);
        console.log("U1-MaNummer:   "+ u1.getMa_NummerU())
        console.log("U1-Vorname:   "+ u1.getVornameU())
        console.log("U1-Nachname:   "+ u1.getNachnameU())
        console.log("U1-Passwort:   "+ u1.getPasswortU())
        console.log("U1-istChef:   "+ u1.getIstChefU())
        //console.log("oo2: "+splitDB_DBObj(ausgabeDB).MA_Nummer)
        */
        isMaNummer = true;
    }
    /*
     if(maNummer==="70220" && passwort==="q"){
         isMaNummerPasswort = true;
         console.log(isMaNummerPasswort)
     }else{
         isMaNummerPasswort= false;
     }
     */
   // ausgabeDB = "";
    return isMaNummer;
}

//todo wenn ma_nummer zweimal vorkommt???? und getconnection-problem!!!!
export async function checkPasswort(maNummer,passwort){
   // console.log("bin checkPasswort-Funktion, habe bekommen: "+maNummer+', '+passwort);
    let isPasswort = false;
    let ausgabeDB = "";
    ausgabeDB = await sucheInDBmaNummerPasswort(maNummer, passwort);//das geht nicht
  //  console.log("ausgabeDB: Wenn Mehrmals???????: "+ausgabeDB)
    if(ausgabeDB==='[]'||ausgabeDB===undefined){//wenn manummer mehrmals????
        // console.log("ausgabeDB ist leeeeer!!!! sowas existiert nicht in der DB!!");
        //console.log("Diese Passwort ist falsch!!!");
        isPasswort= false;
    }else{
        //console.log('AusgabeDB ist voll, hat was gefunden :)');
        splitDB_DBObj(ausgabeDB);
        /// console.log(splitDB_DBObj(ausgabeDB))
        //let u1 = new User("x","x","x","x","x");
        /*
        let u1 = new User();
        u1.setMa_NummerU(splitDB_DBObj(ausgabeDB).MA_Nummer);
        u1.setVornameU(splitDB_DBObj(ausgabeDB).Vorname);
        u1.setNachnameU(splitDB_DBObj(ausgabeDB).Nachname);
        u1.setPasswortU(splitDB_DBObj(ausgabeDB).Passwort_User);
        u1.setIstChefU(splitDB_DBObj(ausgabeDB).IstChef);
        console.log("U1-MaNummer:   "+ u1.getMa_NummerU())
        console.log("U1-Vorname:   "+ u1.getVornameU())
        console.log("U1-Nachname:   "+ u1.getNachnameU())
        console.log("U1-Passwort:   "+ u1.getPasswortU())
        console.log("U1-istChef:   "+ u1.getIstChefU())
        //console.log("oo2: "+splitDB_DBObj(ausgabeDB).MA_Nummer)
         */
        isPasswort = true;
    }
    return isPasswort;
}



export default {checkMaNummer, checkPasswort};