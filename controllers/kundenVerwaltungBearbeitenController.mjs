import {sucheInDBKunden} from "../models/kundenVerwaltungDB.mjs";
import userEingeloggtArray from "../utils/userEingeloggtArray.mjs";
import {
    schreibeInDBKundenBearbeitet,
    sucheInDBKundenBearbeitenKundenIDKundenNummer,
    loescheInKundeBearbeitet
} from "../models/kundeVerwaltungBearbeitenDB.mjs";
import splitDB_DBObj from "../utils/splitDB_DBObj_General.mjs";
//import loescheInKundeBearbeitet from '../models/kundeVerwaltungBearbeitenDB.mjs'

export let kundenVerwaltungKundeBearbeitenControllerGet = async (req, res) => {
    console.log("Bin GET BearbeitenKunde")
    console.log(req.path)
    //bodyParser.json()
    let meineEingabe3 = JSON.stringify(req.path);
    console.log("meineEingabe3: "+meineEingabe3)

    const myArrFullPath = req.path.split(':');
    //console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    // console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLkundenVerwaltungKundeBearbeiten = myArr1PathMitStern[0];
    let idURLkundenVerwaltungKundeBearbeiten = myArr1PathMitStern[1];
    console.log("GET maNummerURLkundenVerwaltungKundeBearbeiten: " + maNummerURLkundenVerwaltungKundeBearbeiten);
    console.log("GET idURLkundenVerwaltungKundeBearbeiten: " + idURLkundenVerwaltungKundeBearbeiten);

    let foundImEingeloggtkundenVerwaltung = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLkundenVerwaltungKundeBearbeiten && x.userID_D === parseInt(idURLkundenVerwaltungKundeBearbeiten)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    //console.log("POST foundImEingeloggtkundenVerwaltung: "+JSON.stringify(foundImEingeloggtkundenVerwaltung));

    let gewaehlteKundenDatenURLStrich = myArr1PathMitStern[2]
    console.log("GET gewaehlteKundenDatenURLStrich: " + gewaehlteKundenDatenURLStrich);
    let gesplittetGewaehlteKundenDatenURLStrich = gewaehlteKundenDatenURLStrich.split("-")
    let kundenID = gesplittetGewaehlteKundenDatenURLStrich[1]
    console.log("GET kundenID: " + kundenID);// ersetze %20 als lehrzeichen
    //kundenName=kundenName.replace(/%20/g, " ");
    //console.log("GET kundenName: " + kundenName);// ersetze %20 als lehrzeichen
    let kundenNummer = gesplittetGewaehlteKundenDatenURLStrich[2]
    console.log("GET kundenNummer: " + kundenNummer);// ersetze %20 als lehrzeichen

    console.log("GET SQLSuche: "+await sucheInDBKundenBearbeitenKundenIDKundenNummer(kundenID,kundenNummer))
    let kundeGewaehltUndGefundenDBobj = await sucheInDBKundenBearbeitenKundenIDKundenNummer(kundenID, kundenNummer)
    // console.log("GET dbOBJ: "+JSON.stringify(splitDB_DBObj(kundeGewaehltUndGefundenDB)))//.ID_K)
    // let kundeGewaehltUndGefundenDBJson = JSON.stringify(splitDB_DBObj(kundeGewaehltUndGefundenDB))
    // console.log("GET ??: "+kundeGewaehltUndGefundenDBJson.ID_K)

    const kundenObj = splitDB_DBObj(kundeGewaehltUndGefundenDBobj)//kundeGewaehltUndGefundenDB//JSON.stringify(splitDB_DBObj(kundeGewaehltUndGefundenDB))//{"name":"John", "age":30, "car":null};
    console.log("GET kundenObj.name: "+kundenObj.KundeK)//document.getElementById("demo").innerHTML = myObj.name;

    //res.send("Hello KundeBearbeitenTeil")
    res.render('pages/layoutKundenVerwaltungKundeBearbeiten', {
        kundeErfasst: kundenObj.ErfasstK,
        kundenName: kundenObj.KundeK,
        kundenNummer: kundenObj.KundenNummer,
        kundenOrt: kundenObj.OrtK,
        kundenAdresse: kundenObj.AdresseK,
        kundenLand: kundenObj.LandK,
        avatarFarbeServer: foundImEingeloggtkundenVerwaltung.AvatarFarbeU_D,
        FooterWerIstAngemeldet: foundImEingeloggtkundenVerwaltung.MaNummer_D + " " + foundImEingeloggtkundenVerwaltung.Vorname_D
    });
};

export let kundenVerwaltungKundeBearbeitenControllerPost = async (req, res) => {
    console.log("Bin POST BearbeitenKunde")

    const myArrFullPath = req.path.split(':');
    //console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    // console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLkundenVerwaltungKundeBearbeiten = myArr1PathMitStern[0];
    let idURLkundenVerwaltungKundeBearbeiten = myArr1PathMitStern[1];
    console.log("POST maNummerURLkundenVerwaltungKundeBearbeiten: " + maNummerURLkundenVerwaltungKundeBearbeiten);
    console.log("POST idURLkundenVerwaltungKundeBearbeiten: " + idURLkundenVerwaltungKundeBearbeiten);

    let foundImEingeloggtkundenVerwaltung = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLkundenVerwaltungKundeBearbeiten && x.userID_D === parseInt(idURLkundenVerwaltungKundeBearbeiten)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))


    let gewaehlteKundenDatenURLStrich = myArr1PathMitStern[2]
    console.log("POST gewaehlteKundenDatenURLStrich: " + gewaehlteKundenDatenURLStrich);
    let gesplittetGewaehlteKundenDatenURLStrich = gewaehlteKundenDatenURLStrich.split("-")
    let kundenID = gesplittetGewaehlteKundenDatenURLStrich[1]
    console.log("POST kundenID: " + kundenID);// ersetze %20 als lehrzeichen
    //kundenName=kundenName.replace(/%20/g, " ");
    //console.log("POST kundenName: " + kundenName);// ersetze %20 als lehrzeichen
    let kundenNummer = gesplittetGewaehlteKundenDatenURLStrich[2]
    console.log("POST kundenNummer: " + kundenNummer);// ersetze %20 als lehrzeichen



    if(req.body.ButtonSpeichernEjs==='Speichern'){
        let kundenErfasstClient = req.body.KundenErfasstClientEJS
        let kundenErfasstDatumClient = req.body.KundenErfasstDatumClientEJS
        let kundenNameClient = req.body.KundenNameClientEJS
        let kundenNummerClient = req.body.KundenNummerClientEJS
        let kundenOrtClient = req.body.KundenOrtClientEJS
        let kundenAdresseClient = req.body.KundenAdresseClientEJS
        let kundenLandClient = req.body.KundenLandClientEJS

        //console.log("kundenErfasstClient: "+kundenErfasstClient)
        console.log("kundenErfasstDatumClient: "+kundenErfasstDatumClient)
        console.log("kundenErfasstDatumClient.length: "+kundenErfasstDatumClient.length)
        if(kundenErfasstDatumClient.length===64){
            kundenErfasstDatumClient=kundenErfasstDatumClient= ("0"+new Date().getDate()).slice(-2)+'.'+("0"+(new Date().getMonth()+1)).slice(-2)+'.'+new Date().getFullYear()
        }
        console.log("kundenErfasstDatumClient: "+kundenErfasstDatumClient)
        console.log("kundenErfasstDatumClient.length: "+kundenErfasstDatumClient.length)

        schreibeInDBKundenBearbeitet(kundenErfasstDatumClient, kundenNameClient, kundenNummerClient, kundenOrtClient, kundenAdresseClient, kundenLandClient, kundenID, kundenNummer)

        res.redirect("/api/v1/inHome/kundenVerwaltung/:" + maNummerURLkundenVerwaltungKundeBearbeiten + "*" + idURLkundenVerwaltungKundeBearbeiten + "*")

        // console.log("kundenNameClient: "+kundenNameClient)
        // console.log("kundenNummerClient: "+kundenNummerClient)
        // console.log("kundenOrtClient: "+kundenOrtClient)
        // console.log("kundenAdresseClient: "+kundenAdresseClient)
        // console.log("kundenLandClient: "+kundenLandClient)
    } else if(req.body.ButtonLoeschenEjs=== 'Löschen') {
        loescheInKundeBearbeitet(kundenID, kundenNummer)
        res.redirect("/api/v1/inHome/kundenVerwaltung/:" + maNummerURLkundenVerwaltungKundeBearbeiten + "*" + idURLkundenVerwaltungKundeBearbeiten + "*")

    } else if(req.body.ButtonZuruekZurKundenVerwaltungEjs=== 'Zurück zur Kundenverwaltung') {
        res.redirect("/api/v1/inHome/kundenVerwaltung/:" + maNummerURLkundenVerwaltungKundeBearbeiten + "*" + idURLkundenVerwaltungKundeBearbeiten + "*")
    } else if(req.body.mitarbeiterVerwaltungButtonNameEjs==="MitarbeiterVerwaltung") {
        res.redirect("/api/v1/inHome/mitarbeiterVerwaltung/:" + maNummerURLkundenVerwaltungKundeBearbeiten + "*" + idURLkundenVerwaltungKundeBearbeiten + "*")
        //         //res.send("Hallo Post MiitarbeiterVerwaltung")

    } else if(req.body.kundenVerwaltungButtonNameEjs==="KundenVerwaltung"){
        res.redirect("/api/v1/inHome/kundenVerwaltung/:"+maNummerURLkundenVerwaltungKundeBearbeiten+"*"+idURLkundenVerwaltungKundeBearbeiten+"*")
    }

};

export let kundenVerwaltungKundeBearbeitenControllerDelete = async (req, res) => {
    console.log("Bin DELETE BearbeitenKunde")

    console.log("bin DELETE kundenVerwaltungBearbeitenKundeRoute.mjs")

    const myArrFullPath = req.path.split(':');
    //console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    //console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLkundenVerwaltung = myArr1PathMitStern[0];
    let idURLkundenVerwaltung = myArr1PathMitStern[1];
    //console.log("DELETE maNummerURLkundenVerwaltungBearbeitenKunde: " + maNummerURLkundenVerwaltung);
    //console.log("DELETE idURLkundenVerwaltungBearbeitenKunde: " + idURLkundenVerwaltung);

    let foundImEingeloggtkundenVerwaltung = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLkundenVerwaltung && x.userID_D === parseInt(idURLkundenVerwaltung)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    //console.log("DELETE foundImEingeloggtkundenVerwaltung: "+JSON.stringify(foundImEingeloggtkundenVerwaltung));

    //suche im Array, ob User Admin eingeloggt, wenn gefunden, dann löschen
    // let foundAdminImEingeloggt = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLAngemeldet && x.Nachname_D==='Administrator'))
    // console.log("foundAdminImEingeloggt: "+JSON.stringify(foundAdminImEingeloggt));

    for( let i = 0; i < userEingeloggtArray.length; i++){
        if ( userEingeloggtArray[i] === foundImEingeloggtkundenVerwaltung) {
            userEingeloggtArray.splice(i, 1);
        }
    }
    res.clearCookie('cokMaNummer');
    res.redirect('/api/v1/login1');
};