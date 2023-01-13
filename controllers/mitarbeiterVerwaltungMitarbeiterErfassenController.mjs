import userEingeloggtArray from "../utils/userEingeloggtArray.mjs";
import {sucheInDBVerladung} from "../models/inHomeVerladungDB.mjs";
import schreibeInDBMitarbeiterErstellen from '../models/mitarbeiterVerwaltungMitarbeiterErstellenDB.mjs'
import CryptoJS from "crypto-js";
import {encryptData, decryptData} from "../utils/crypto.mjs";

export let mitarbeiterErfassenControllerGet = async (req, res) => {
    console.log("bin mitarbeiterErfassenControllerGet")

    // splitte von URL /:irgendwas
    const myArrFullPath = req.path.split(':');
    console.log("myArrPath: " + myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    console.log("gesplittetVonURLdenUserTeil: " + gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLmitarbeiterErfassen = myArr1PathMitStern[0];
    let idURLmitarbeiterErfassen = myArr1PathMitStern[1];
    console.log("Get maNummerURLinHome: " + maNummerURLmitarbeiterErfassen);
    console.log("Get idURLinHome: " + idURLmitarbeiterErfassen);

    let foundImEingeloggtmitarbeiterErfassen = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLmitarbeiterErfassen && x.userID_D === parseInt(idURLmitarbeiterErfassen)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    console.log("inHome foundImEingeloggtmitarbeiterErfassen: " + JSON.stringify(foundImEingeloggtmitarbeiterErfassen));

    let cookieVorhanden = req.cookies.cokMaNummer;
    console.log("coockie:"+cookieVorhanden)
        if(cookieVorhanden){
            console.log("coockie:"+cookieVorhanden)
            res.render('pages/layoutMitarbeiterErfassen', {
                FehlerEingabeMaNummer: "",
                avatarFarbeServer: foundImEingeloggtmitarbeiterErfassen.AvatarFarbeU_D,
                FooterWerIstAngemeldet: foundImEingeloggtmitarbeiterErfassen.MaNummer_D + " " + foundImEingeloggtmitarbeiterErfassen.Vorname_D
            });
        }else{
            res.send("<h1>Sie waren zu lange eingeloggt, Sie müssen sich nochmals einloggen, 401 Unautorized :) :)</h1><input type=\"button\" onclick=\"location.href='/api/v1/login1';\" value=\"Go to login\" />");
        }


}


export let mitarbeiterErfassenControllerPOST = async (req, res) => {
    console.log("bin mitarbeiterErfassenControllerPost")

    // splitte von URL /:irgendwas
    const myArrFullPath = req.path.split(':');
    console.log("myArrPath: " + myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    console.log("gesplittetVonURLdenUserTeil: " + gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLmitarbeiterErfassen = myArr1PathMitStern[0];
    let idURLmitarbeiterErfassen = myArr1PathMitStern[1];
    console.log("POST maNummerURLinHome: " + maNummerURLmitarbeiterErfassen);
    console.log("POST idURLinHome: " + idURLmitarbeiterErfassen);

    let foundImEingeloggtmitarbeiterErfassen = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLmitarbeiterErfassen && x.userID_D === parseInt(idURLmitarbeiterErfassen)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    console.log("POST foundImEingeloggtmitarbeiterErfassen: " + JSON.stringify(foundImEingeloggtmitarbeiterErfassen));


    let neuMitarbeiterErfasstDatum = req.body.neuMitarbeiterErfasstDatumClientEJS
    let neuMitarbeiterErfasstZeit = req.body.neuMitarbeiterErfasstZeitClientEJS
    let neuMitarbeiterMaNummer = req.body.neuMitarbeiterMaNummerClientEJS
    let neuMitarbeiterVorname = req.body.neuMitarbeiterVornameClientEJS
    let neuMitarbeiterNachname = req.body.neuMitarbeiterNachnameClientEJS
    let neuMitarbeiterPasswort = req.body.neuMitarbeiterPasswortClientEJS
    let neuMitarbeiterRolle = req.body.neuMitarbeiterRolleSelectClientEJS
    let neuMitarbeiterAvatarFarbe = req.body.neuMitarbeiterAvatarFarbeSelectClientEJS

    console.log("neuMitarbeiterErfasstDatum: " + neuMitarbeiterErfasstDatum)
    console.log("neuMitarbeiterErfasstZeit: " + neuMitarbeiterErfasstZeit)
    console.log("neuMitarbeiterMaNummer: " + neuMitarbeiterMaNummer)
    console.log("neuMitarbeiterVorname: " + neuMitarbeiterVorname)
    console.log("neuMitarbeiterNachname: " + neuMitarbeiterNachname)
    console.log("neuMitarbeiterPasswort: " + neuMitarbeiterPasswort)
    console.log("neuMitarbeiterRolle: " + neuMitarbeiterRolle)
    console.log("neuMitarbeiterAvatarFarbe: " + neuMitarbeiterAvatarFarbe)

    let data = neuMitarbeiterPasswort;//Message to Encrypt
    let iv = CryptoJS.enc.Base64.parse("");//giving empty initialization vector
    let key = CryptoJS.SHA256("mySecretKey1");//hashing the key using SHA256  --> diesen in config oder in .env Datei auslagern!!!!
    //var encryptedStringPasswortLClient=encryptData(data,iv,key);//muss var sein//
    var encryptedNeuMitarbeiterPasswort = encryptData(data, iv, key);//muss var sein//
    console.log("encryptedNeuMitarbeiterPasswort: " + encryptedNeuMitarbeiterPasswort);//genrated encryption String:  swBX2r1Av2tKpdN7CYisMg==
    //--------------------------------------------------------------------------
    if(req.body.ButtonSpeichernEjs === 'Speichern'){
        if(neuMitarbeiterMaNummer===undefined || neuMitarbeiterMaNummer === null || neuMitarbeiterMaNummer===""){
            res.render('pages/layoutMitarbeiterErfassen', {
                FehlerEingabeMaNummer: "MaNummer muss geschrieben werden!",
                FooterWerIstAngemeldet: foundImEingeloggtmitarbeiterErfassen.MaNummer_D + " " + foundImEingeloggtmitarbeiterErfassen.Vorname_D
            });

            //res.redirect("/api/v1/inHome/mitarbeiterVerwaltung/MitarbeiterErfassen/:" + maNummerURLmitarbeiterErfassen + "*" + idURLmitarbeiterErfassen + "*")
        }
        schreibeInDBMitarbeiterErstellen(neuMitarbeiterErfasstDatum,neuMitarbeiterErfasstZeit,neuMitarbeiterMaNummer,neuMitarbeiterVorname,neuMitarbeiterNachname,encryptedNeuMitarbeiterPasswort,neuMitarbeiterRolle,neuMitarbeiterAvatarFarbe)

        res.redirect("/api/v1/inHome/mitarbeiterVerwaltung/:" + maNummerURLmitarbeiterErfassen + "*" + idURLmitarbeiterErfassen + "*")
    } else if(req.body.ButtonAbrechenEjs==='Abrechen'){
        res.redirect("/api/v1/inHome/mitarbeiterVerwaltung/:" + maNummerURLmitarbeiterErfassen + "*" + idURLmitarbeiterErfassen + "*")
    } else if(req.body.ButtonZuruekZurMitarbeiterVerwaltungEjs=== 'Zurück zur Mitarbeiterverwaltung') {
        res.redirect("/api/v1/inHome/mitarbeiterVerwaltung/:" + maNummerURLmitarbeiterErfassen + "*" + idURLmitarbeiterErfassen + "*")
    } else if(req.body.mitarbeiterVerwaltungButtonNameEjs==="MitarbeiterVerwaltung") {
        res.redirect("/api/v1/inHome/mitarbeiterVerwaltung/:" + maNummerURLmitarbeiterErfassen + "*" + idURLmitarbeiterErfassen + "*")
    } else if(req.body.kundenVerwaltungButtonNameEjs==="KundenVerwaltung"){
        res.redirect("/api/v1/inHome/kundenVerwaltung/:"+maNummerURLmitarbeiterErfassen + "*" + idURLmitarbeiterErfassen + "*")
    }

}

export let mitarbeiterErfassenControllerDelete = async (req, res) => {
    console.log("Bin DELETE mitarbeiterErfassen")

    const myArrFullPath = req.path.split(':');
    console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLmitarbeiterErfassen = myArr1PathMitStern[0];
    let idURLmitarbeiterErfassen = myArr1PathMitStern[1];
    console.log("DELETE maNummerURLmitarbeiterErfassen: " + maNummerURLmitarbeiterErfassen);
    console.log("DELETE idURLmitarbeiterErfassen: " + idURLmitarbeiterErfassen);

    let foundImEingeloggtmitarbeiterErfassen = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLmitarbeiterErfassen && x.userID_D === parseInt(idURLmitarbeiterErfassen)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    console.log("DELETE foundImEingeloggtmitarbeiterErfassen: "+JSON.stringify(foundImEingeloggtmitarbeiterErfassen));


    for( let i = 0; i < userEingeloggtArray.length; i++){
        if ( userEingeloggtArray[i] === foundImEingeloggtmitarbeiterErfassen) {
            userEingeloggtArray.splice(i, 1);
        }
    }
    res.clearCookie('cokMaNummer');
    //res.clearCookie('cokMaNummer',maNummerURLmitarbeiterErfassen);

    //res.clearCookie("key");

    let cookieVorhanden = req.cookies.cokMaNummer;
    //cookieVorhanden.set('cokMaNummer', {maxAge: 0})
    console.log("coockie:"+cookieVorhanden)

    //res.clean()

//    res.clearCookie('cokMaNummer', {domain: COOKIE_DOMAIN, path: COOKIE_PATH});

//     res.clearCookie('cokMaNummer',  {
//         sameSite: "none",
//         secure: true,
//     });

    res.cookie('cokMaNummer', maNummerURLmitarbeiterErfassen, {
        maxAge: 0, // 1 min    600=10min   1000 = 1s
        httpOnly: true // http only, prevents JavaScript cookie access
    });
    let cookieVorhanden1 = req.cookies.cokMaNummer;
    console.log("coockie1:"+cookieVorhanden1)

    //res.redirect('/api/v1/login1');
    res.redirect('/api/v1/logOut/:out');//commit und andere nicht geladen
};