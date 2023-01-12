import userEingeloggtArray from "../utils/userEingeloggtArray.mjs";
import {sucheInDBVerladung} from "../models/inHomeVerladungDB.mjs";
//import {sucheInDBKundenBearbeitenKundenNameKundenNummer} from "../models/kundeVerwaltungBearbeitenDB.mjs";
import {
    loescheInDBMitarbeiterBearbeitet,
    schreibeInDBMitarbeiterBearbeitet,
    sucheInDBMitarbeiterBearbeitenMaNummerID
} from "../models/mitarbeiterVerwaltungMitarbeiterBearbeitenDB.mjs";
import splitDB_DBObj from "../utils/splitDB_DBObj_General.mjs";
import {decryptData} from "../utils/crypto.mjs";
import CryptoJS from "crypto-js";

export let mitarbeiterBearbeitenControllerGet = async (req, res) => {
    console.log("bin mitarbeiterBearbeitenControllerGet")

    // splitte von URL /:irgendwas
    const myArrFullPath = req.path.split(':');
    console.log("myArrPath: " + myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    console.log("gesplittetVonURLdenUserTeil: " + gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLmitarbeiterBearbeiten = myArr1PathMitStern[0];
    let idURLmitarbeiterBearbeiten = myArr1PathMitStern[1];
    console.log("GET maNummerURLmitarbeiterBearbeiten: " + maNummerURLmitarbeiterBearbeiten);
    console.log("GET idURLmitarbeiterBearbeiten: " + idURLmitarbeiterBearbeiten);

    let foundImEingeloggtmitarbeiterBearbeiten = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLmitarbeiterBearbeiten && x.userID_D === parseInt(idURLmitarbeiterBearbeiten)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    console.log("GET foundImEingeloggtmitarbeiterBearbeiten: " + JSON.stringify(foundImEingeloggtmitarbeiterBearbeiten));


    let gewaehlteMitarbeiterDatenURLStrich = myArr1PathMitStern[2]
    console.log("GET gewaehlteMitarbeiterDatenURLStrich: " + gewaehlteMitarbeiterDatenURLStrich);
    let gesplittetGewaehlteMitarbeiterDatenURLStrich = gewaehlteMitarbeiterDatenURLStrich.split("-")
    let idMitarbeiter = gesplittetGewaehlteMitarbeiterDatenURLStrich[1]
    console.log("GET idMitarbeiter: " + idMitarbeiter);
    let maNummer = gesplittetGewaehlteMitarbeiterDatenURLStrich[2]
    console.log("GET maNummer: " + maNummer);// ersetze %20 als lehrzeichen

    console.log("GET SQLSuche: "+await sucheInDBMitarbeiterBearbeitenMaNummerID(maNummer,idMitarbeiter))
    let mitarbeiterGewaehltUndGefundenDBobj = await sucheInDBMitarbeiterBearbeitenMaNummerID(maNummer,idMitarbeiter)

    const mitarbeiterObj = splitDB_DBObj(mitarbeiterGewaehltUndGefundenDBobj)//kundeGewaehltUndGefundenDB//JSON.stringify(splitDB_DBObj(kundeGewaehltUndGefundenDB))//{"name":"John", "age":30, "car":null};
    console.log("GET mitarbeiterObj.Nachname: "+mitarbeiterObj.Nachname)//document.getElementById("demo").innerHTML = myObj.name;

    console.log("GET mitarbeiterObj.Passwort_User: "+mitarbeiterObj.Passwort_User)

    //das ist zum wieder das normale pw anzeigen, möchte das später einbauen
    let iv  = CryptoJS.enc.Base64.parse("");//giving empty initialization vector
    let key=CryptoJS.SHA256("mySecretKey1");//hashing the key using SHA256
    let decryptedMitarbeiterPasswort=decryptData(mitarbeiterObj.Passwort_User,iv,key);
      console.log("decryptedMitarbeiterPasswort: "+decryptedMitarbeiterPasswort);
    //**************************************************************************

    //res.send("Hello KundeBearbeitenTeil")
    // res.render('pages/layoutMitarbeiterBearbeiten', {
    //     FooterWerIstAngemeldet: foundImEingeloggtmitarbeiterBearbeiten.MaNummer_D + " " + foundImEingeloggtmitarbeiterBearbeiten.Vorname_D
    // });
    res.render('pages/layoutMitarbeiterBearbeiten', {
        mitarbeiterErfasstDatum: mitarbeiterObj.Erfasst_D_U,
        mitarbeiterErfasstZeit: mitarbeiterObj.Erfasst_Z_U,
        mitarbeiterNummer: mitarbeiterObj.MA_Nummer,
        mitarbeiterVorname: mitarbeiterObj.Vorname,
        mitarbeiterNachname: mitarbeiterObj.Nachname,
        mitarbeiterPasswortX: mitarbeiterObj.Passwort_User,
        mitarbeiterPasswort: decryptedMitarbeiterPasswort,
        mitarbeiterRolle: mitarbeiterObj.RolleUser,
        mitarbeiterAvatarFarbe: mitarbeiterObj.AvatarFarbe,
        avatarFarbeServer: foundImEingeloggtmitarbeiterBearbeiten.AvatarFarbeU_D,
        FooterWerIstAngemeldet: foundImEingeloggtmitarbeiterBearbeiten.MaNummer_D + " " + foundImEingeloggtmitarbeiterBearbeiten.Vorname_D
    });

}

export let mitarbeiterBearbeitenControllerPost = async (req, res) => {
    console.log("bin mitarbeiterBearbeitenControllerGet")

    // splitte von URL /:irgendwas
    const myArrFullPath = req.path.split(':');
    console.log("myArrPath: " + myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    console.log("gesplittetVonURLdenUserTeil: " + gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLmitarbeiterBearbeiten = myArr1PathMitStern[0];
    let idURLmitarbeiterBearbeiten = myArr1PathMitStern[1];
    console.log("Post maNummerURLmitarbeiterBearbeiten: " + maNummerURLmitarbeiterBearbeiten);
    console.log("Post idURLmitarbeiterBearbeiten: " + idURLmitarbeiterBearbeiten);

    let foundImEingeloggtmitarbeiterBearbeiten = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLmitarbeiterBearbeiten && x.userID_D === parseInt(idURLmitarbeiterBearbeiten)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    console.log("Post foundImEingeloggtmitarbeiterBearbeiten: " + JSON.stringify(foundImEingeloggtmitarbeiterBearbeiten));

    let gewaehlteMitarbeiterDatenURLStrich = myArr1PathMitStern[2]
    console.log("GET gewaehlteMitarbeiterDatenURLStrich: " + gewaehlteMitarbeiterDatenURLStrich);
    let gesplittetGewaehlteMitarbeiterDatenURLStrich = gewaehlteMitarbeiterDatenURLStrich.split("-")
    let idMitarbeiter = gesplittetGewaehlteMitarbeiterDatenURLStrich[1]
    console.log("GET idMitarbeiter: " + idMitarbeiter);
    let maNummer = gesplittetGewaehlteMitarbeiterDatenURLStrich[2]
    console.log("GET maNummer: " + maNummer);// ersetze %20 als lehrzeichen

    if(req.body.ButtonZuruekZurMitarbeiterVerwaltungEjs === 'Zurück zur Mitarbeiterverwaltung'){
        res.redirect("/api/v1/inHome/mitarbeiterVerwaltung/:" + maNummerURLmitarbeiterBearbeiten + "*" + idURLmitarbeiterBearbeiten + "*")
    } else if(req.body.kundenVerwaltungButtonNameEjs==="KundenVerwaltung"){
        res.redirect("/api/v1/inHome/kundenVerwaltung/:"+ maNummerURLmitarbeiterBearbeiten + "*" + idURLmitarbeiterBearbeiten + "*")
    } else if(req.body.mitarbeiterVerwaltungButtonNameEjs==="MitarbeiterVerwaltung") {
        res.redirect("/api/v1/inHome/mitarbeiterVerwaltung/:" + maNummerURLmitarbeiterBearbeiten + "*" + idURLmitarbeiterBearbeiten + "*")
    } else if(req.body.ButtonAbrechenEjs === 'Abrechen'){
        res.redirect("/api/v1/inHome/mitarbeiterVerwaltung/:" + maNummerURLmitarbeiterBearbeiten + "*" + idURLmitarbeiterBearbeiten + "*")
    } else if(req.body.ButtonSpeichernEjs === 'Speichern'){
        let bearbeitetMitarbeiterErfasstDatumClient = req.body.MitarbeiterErfasstDatumClientEJS
        let bearbeitetMitarbeiterErfasstZeitClient = req.body.MitarbeiterErfasstZeitClientEJS
        let bearbeitetMitarbeiterNummerClient = req.body.MitarbeiterNummerClientEJS
        let bearbeitetMitarbeiterVornameClient = req.body.MitarbeiterVornameClientEJS
        let bearbeitetMitarbeiterNachnameClient = req.body.MitarbeiterNachnameClientEJS
        let bearbeitetMitarbeiterPasswortXClient = req.body.MitarbeiterPasswortXClientEJS
        let bearbeitetMitarbeiterPasswortClient = req.body.MitarbeiterPasswortClientEJS
        let bearbeitetMitarbeiterRolleSelectClient = req.body.MitarbeiterRolleSelectClientEJS
        let bearbeitetMitarbeiterAvatarFarbeSelectClient = req.body.MitarbeiterAvatarFarbeSelectClientEJS

        console.log("POST-------------------------")
        console.log("POST bearbeitetMitarbeiterErfasstDatumClient: "+bearbeitetMitarbeiterErfasstDatumClient)
        if(bearbeitetMitarbeiterErfasstDatumClient.length===64){
            bearbeitetMitarbeiterErfasstDatumClient = bearbeitetMitarbeiterErfasstDatumClient= ("0"+new Date().getDate()).slice(-2)+'.'+("0"+(new Date().getMonth()+1)).slice(-2)+'.'+new Date().getFullYear()
        }
        console.log("bearbeitetMitarbeiterErfasstDatumClient: "+bearbeitetMitarbeiterErfasstDatumClient)
        console.log("bearbeitetMitarbeiterErfasstDatumClient.length: "+bearbeitetMitarbeiterErfasstDatumClient.length)

        console.log("POST-------------------------")
        console.log("POST bearbeitetMitarbeiterErfasstZeitClient: "+bearbeitetMitarbeiterErfasstZeitClient)
        console.log("bearbeitetMitarbeiterErfasstZeitClientt.length: "+bearbeitetMitarbeiterErfasstZeitClient.length)
        if(bearbeitetMitarbeiterErfasstZeitClient.length===64){
            var datetime = bearbeitetMitarbeiterErfasstZeitClient;
            var d1 = new Date(datetime);
            var minute = d1.getMinutes()// .getUTCMinutes();
            var hour = d1.getHours() //.getUTCHours();
            let time = d1.toTimeString()// .getTime()
            let arrSplitTime = time.split(" ");
            console.log("arr0: "+arrSplitTime[0])
            bearbeitetMitarbeiterErfasstZeitClient = arrSplitTime[0]

            console.log("arr1: "+arrSplitTime[1])
            console.log("minute: "+minute)
            console.log("hour: "+hour)
            console.log("time: "+time)
            //bearbeitetMitarbeiterErfasstZeitClient+=bearbeitetMitarbeiterErfasstZeitClient= Date().toLocaleTimeString()
        }
        console.log("bearbeitetMitarbeiterErfasstZeitClient: "+bearbeitetMitarbeiterErfasstZeitClient)
        console.log("bearbeitetMitarbeiterErfasstZeitClientt.length: "+bearbeitetMitarbeiterErfasstZeitClient.length)

        console.log("POST--------------------------------------")
        console.log("POST bearbeitetMitarbeiterErfasstZeitClient: "+bearbeitetMitarbeiterErfasstZeitClient)
        console.log("POST bearbeitetMitarbeiterErfasstDatumClient: "+bearbeitetMitarbeiterErfasstDatumClient)
        console.log("POST bearbeitetMitarbeiterNummerClient: "+bearbeitetMitarbeiterNummerClient)
        console.log("POST bearbeitetMitarbeiterVornameClient: "+bearbeitetMitarbeiterVornameClient)
        console.log("POST bearbeitetMitarbeiterNachnameClient: "+bearbeitetMitarbeiterNachnameClient)
        console.log("POST bearbeitetMitarbeiterPasswortXClient: "+bearbeitetMitarbeiterPasswortXClient)
        console.log("POST bearbeitetMitarbeiterPasswortClient: "+bearbeitetMitarbeiterPasswortClient)
        console.log("POST bearbeitetMitarbeiterRolleSelectClient: "+bearbeitetMitarbeiterRolleSelectClient)
        console.log("POST bearbeitetMitarbeiterAvatarFarbeSelectClient: "+bearbeitetMitarbeiterAvatarFarbeSelectClient)

        if(bearbeitetMitarbeiterNummerClient === '0001' || bearbeitetMitarbeiterRolleSelectClient ==='Admin'){
            console.log("Der Admin sollte nicht seine Rolle wechseln können!")
            //let str = 'Admin'
            bearbeitetMitarbeiterRolleSelectClient = 'Admin'
            console.log("POST bearbeitetMitarbeiterRolleSelectClient: "+bearbeitetMitarbeiterRolleSelectClient)
        }

        schreibeInDBMitarbeiterBearbeitet(bearbeitetMitarbeiterErfasstDatumClient,bearbeitetMitarbeiterErfasstZeitClient,
            bearbeitetMitarbeiterNummerClient,bearbeitetMitarbeiterVornameClient,bearbeitetMitarbeiterNachnameClient,
            bearbeitetMitarbeiterPasswortXClient,bearbeitetMitarbeiterRolleSelectClient,bearbeitetMitarbeiterAvatarFarbeSelectClient,
            maNummer, idMitarbeiter)

        res.redirect("/api/v1/inHome/mitarbeiterVerwaltung/:" + maNummerURLmitarbeiterBearbeiten + "*" + idURLmitarbeiterBearbeiten + "*")
    } else if(req.body.ButtonLoeschenEjs === 'Löschen'){
        if(maNummer==='0001'||idMitarbeiter===1){
            console.log("Der Admin sollte sich nicht selber löschen, und wieder getraue ich mich nicht, das auszuprobieren :)")
            res.redirect("/api/v1/inHome/mitarbeiterVerwaltung/:" + maNummerURLmitarbeiterBearbeiten + "*" + idURLmitarbeiterBearbeiten + "*")
        }else {
            loescheInDBMitarbeiterBearbeitet(maNummer, idMitarbeiter)
            res.redirect("/api/v1/inHome/mitarbeiterVerwaltung/:" + maNummerURLmitarbeiterBearbeiten + "*" + idURLmitarbeiterBearbeiten + "*")
        }
    }

    //<script>alert("XSS")</script>
}


export let mitarbeiterBearbeitenControllerDelete = async (req, res) => {
    console.log("Bin DELETE mitarbeiterBearbeiten")


    const myArrFullPath = req.path.split(':');
    console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLmitarbeiterBearbeiten = myArr1PathMitStern[0];
    let idURLmitarbeiterBearbeiten = myArr1PathMitStern[1];
    console.log("DELETE maNummerURLmitarbeiterBearbeiten: " + maNummerURLmitarbeiterBearbeiten);
    console.log("DELETE idURLmitarbeiterBearbeiten: " + idURLmitarbeiterBearbeiten);

    let foundImEingeloggtmitarbeiterBearbeiten = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLmitarbeiterBearbeiten && x.userID_D === parseInt(idURLmitarbeiterBearbeiten)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    console.log("DELETE foundImEingeloggtmitarbeiterBearbeiten: "+JSON.stringify(foundImEingeloggtmitarbeiterBearbeiten));

    //suche im Array, ob User Admin eingeloggt, wenn gefunden, dann löschen
    // let foundAdminImEingeloggt = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLAngemeldet && x.Nachname_D==='Administrator'))
    // console.log("foundAdminImEingeloggt: "+JSON.stringify(foundAdminImEingeloggt));

    for( let i = 0; i < userEingeloggtArray.length; i++){
        if ( userEingeloggtArray[i] === foundImEingeloggtmitarbeiterBearbeiten) {
            userEingeloggtArray.splice(i, 1);
        }
    }
    res.clearCookie('cokMaNummer');
    res.redirect('/api/v1/login1');
};