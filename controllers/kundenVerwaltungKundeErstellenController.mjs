import {sucheInDBKunden} from "../models/kundenVerwaltungDB.mjs";
import userEingeloggtArray from "../utils/userEingeloggtArray.mjs";
import schreibeInDBKundenErstellen from "../models/kundenVerwaltungErstellenKunde.mjs";
// import {
//     schreibeInDBKundenBearbeitet,
//     sucheInDBKundenBearbeitenKundenIDKundenNummer
// } from "../models/kundeVerwaltungBearbeitenDB.mjs";
import splitDB_DBObj from "../utils/splitDB_DBObj_General.mjs";
import isPositivNumber from "../utils/kundenErstellenValidate.mjs";

export let kundenVerwaltungKundeErstellenControllerGet = async (req, res) => {
    console.log("Bin GET ErstelleKunde")

    const myArrFullPath = req.path.split(':');
    //console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    // console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLkundenVerwaltungKundeErstellen = myArr1PathMitStern[0];
    let idURLkundenVerwaltungKundeErstellen = myArr1PathMitStern[1];
    console.log("GET maNummerURLkundenVerwaltungKundeErstellen: " + maNummerURLkundenVerwaltungKundeErstellen);
    console.log("GET idURLkundenVerwaltungKundeErstellen: " + idURLkundenVerwaltungKundeErstellen);

    let foundImEingeloggtkundenVerwaltungKundeErstellen = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLkundenVerwaltungKundeErstellen && x.userID_D === parseInt(idURLkundenVerwaltungKundeErstellen)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))

     res.render('pages/layoutKundenVerwaltungKundeErstellen', {

         FehlerKundenName: "",
         FehlerKundenNummer: "",
         FehlerKundenOrt: "",
         FehlerKundenAdresse: "",
         FehlerKundenLand: "",
         avatarFarbeServer: foundImEingeloggtkundenVerwaltungKundeErstellen.AvatarFarbeU_D,
         FooterWerIstAngemeldet: foundImEingeloggtkundenVerwaltungKundeErstellen.MaNummer_D + " " + foundImEingeloggtkundenVerwaltungKundeErstellen.Vorname_D
     });
};

export let kundenVerwaltungKundeErstellenControllerPost = async (req, res) => {
    console.log("Bin POST erstelleKunde")

    const myArrFullPath = req.path.split(':');
    //console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    // console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLkundenVerwaltungKundeErstellen = myArr1PathMitStern[0];
    let idURLkundenVerwaltungKundeErstellen = myArr1PathMitStern[1];
    console.log("POST maNummerURLkundenVerwaltungKundeErstellen: " + maNummerURLkundenVerwaltungKundeErstellen);
    console.log("POST idURLkundenVerwaltungKundeErstellen: " + idURLkundenVerwaltungKundeErstellen);

    let foundImEingeloggtkundenVerwaltungKundeErstellen = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLkundenVerwaltungKundeErstellen && x.userID_D === parseInt(idURLkundenVerwaltungKundeErstellen)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))




    if(req.body.ButtonSpeichernEjs==='Speichern'){
        let neuKundenErfasstDatumClient = req.body.neuKundenErfasstDatumClientEJS
        let neuKundenNameClient = req.body.neuKundenNameClientEJS
        let neuKundenNummerClient = req.body.neuKundenNummerClientEJS
        let neuKundenOrtClient = req.body.neuKundenOrtClientEJS
        let neuKundenAdresseClient = req.body.neuKundenAdresseClientEJS
        let neuKundenLandClient = req.body.neuKundenLandClientEJS

        neuKundenNameClient = neuKundenNameClient.trim();
        neuKundenNummerClient = neuKundenNummerClient.trim()
        neuKundenOrtClient = neuKundenOrtClient.trim()
        neuKundenAdresseClient = neuKundenAdresseClient.trim()
        neuKundenLandClient = neuKundenLandClient.trim()

        console.log("neuKundenNameClient: "+neuKundenNameClient)
        console.log("neuKundenNummerClient: "+neuKundenNummerClient)
        console.log("neuKundenOrtClient: "+neuKundenOrtClient)
        console.log("neuKundenAdresseClient: "+neuKundenAdresseClient)
        console.log("neuKundenLandClient: "+neuKundenLandClient)

        console.log("neuKundenErfasstDatumClient: "+neuKundenErfasstDatumClient)
        console.log("neuKundenErfasstDatumClient.length: "+neuKundenErfasstDatumClient.length)
        if(neuKundenErfasstDatumClient.length===64){
            neuKundenErfasstDatumClient=neuKundenErfasstDatumClient= ("0"+new Date().getDate()).slice(-2)+'.'+("0"+(new Date().getMonth()+1)).slice(-2)+'.'+new Date().getFullYear()
        }
        console.log("neuKundenErfasstDatumClient: "+neuKundenErfasstDatumClient)
        console.log("neuKundenErfasstDatumClient.length: "+neuKundenErfasstDatumClient.length)


        let isNeuKundenNameClientPositivNumber = false;
        //console.log("isNeuKundenNameClientNumber: "+isPositivNumber(neuKundenNummerClient))

        isNeuKundenNameClientPositivNumber = isPositivNumber(neuKundenNummerClient);
        console.log(neuKundenNummerClient + ": " + (isNeuKundenNameClientPositivNumber ? "Yes" : "No"));


        if(neuKundenNameClient==="") {
            res.render('pages/layoutKundenVerwaltungKundeErstellen', {
                FehlerKundenName: "Fehlende Eingabe!",
                FehlerKundenNummer: neuKundenNummerClient,
                FehlerKundenOrt: neuKundenOrtClient,
                FehlerKundenAdresse: neuKundenAdresseClient,
                FehlerKundenLand: neuKundenLandClient,
                avatarFarbeServer: foundImEingeloggtkundenVerwaltungKundeErstellen.AvatarFarbeU_D,
                FooterWerIstAngemeldet: foundImEingeloggtkundenVerwaltungKundeErstellen.MaNummer_D + " " + foundImEingeloggtkundenVerwaltungKundeErstellen.Vorname_D
            });
        } else if(neuKundenNummerClient==="") {
            res.render('pages/layoutKundenVerwaltungKundeErstellen', {
                FehlerKundenName: neuKundenNameClient,
                FehlerKundenNummer: "Fehlende Eingabe!",
                FehlerKundenOrt: neuKundenOrtClient,
                FehlerKundenAdresse: neuKundenAdresseClient,
                FehlerKundenLand: neuKundenLandClient,
                avatarFarbeServer: foundImEingeloggtkundenVerwaltungKundeErstellen.AvatarFarbeU_D,
                FooterWerIstAngemeldet: foundImEingeloggtkundenVerwaltungKundeErstellen.MaNummer_D + " " + foundImEingeloggtkundenVerwaltungKundeErstellen.Vorname_D
            });

        } else if(isNeuKundenNameClientPositivNumber===false){
            res.render('pages/layoutKundenVerwaltungKundeErstellen', {
                FehlerKundenName: neuKundenNameClient,
                FehlerKundenNummer: "Falsche Eingabe! Nur positive Zahlen!",
                FehlerKundenOrt: neuKundenOrtClient,
                FehlerKundenAdresse: neuKundenAdresseClient,
                FehlerKundenLand: neuKundenLandClient,
                avatarFarbeServer: foundImEingeloggtkundenVerwaltungKundeErstellen.AvatarFarbeU_D,
                FooterWerIstAngemeldet: foundImEingeloggtkundenVerwaltungKundeErstellen.MaNummer_D + " " + foundImEingeloggtkundenVerwaltungKundeErstellen.Vorname_D
            });
        } else if(neuKundenNameClient==="" && neuKundenNummerClient==="") {
            res.render('pages/layoutKundenVerwaltungKundeErstellen', {
                FehlerKundenName: "Fehlende Eingabe!",
                FehlerKundenNummer: "Fehlende Eingabe!",
                FehlerKundenOrt: neuKundenOrtClient,
                FehlerKundenAdresse: neuKundenAdresseClient,
                FehlerKundenLand: neuKundenLandClient,
                avatarFarbeServer: foundImEingeloggtkundenVerwaltungKundeErstellen.AvatarFarbeU_D,
                FooterWerIstAngemeldet: foundImEingeloggtkundenVerwaltungKundeErstellen.MaNummer_D + " " + foundImEingeloggtkundenVerwaltungKundeErstellen.Vorname_D
            });
        } else if(neuKundenNameClient==="" && isNeuKundenNameClientPositivNumber===false) {
            res.render('pages/layoutKundenVerwaltungKundeErstellen', {
                FehlerKundenName: "Fehlende Eingabe!",
                FehlerKundenNummer: "Falsche Eingabe! Nur positive Zahlen!",
                FehlerKundenOrt: neuKundenOrtClient,
                FehlerKundenAdresse: neuKundenAdresseClient,
                FehlerKundenLand: neuKundenLandClient,
                avatarFarbeServer: foundImEingeloggtkundenVerwaltungKundeErstellen.AvatarFarbeU_D,
                FooterWerIstAngemeldet: foundImEingeloggtkundenVerwaltungKundeErstellen.MaNummer_D + " " + foundImEingeloggtkundenVerwaltungKundeErstellen.Vorname_D
            });
        } else{
            schreibeInDBKundenErstellen(neuKundenErfasstDatumClient, neuKundenNameClient, neuKundenNummerClient, neuKundenOrtClient, neuKundenAdresseClient, neuKundenLandClient)
            res.redirect("/api/v1/inHome/kundenVerwaltung/:" + maNummerURLkundenVerwaltungKundeErstellen + "*" + idURLkundenVerwaltungKundeErstellen + "*")

        }



    } else if(req.body.ButtonAbrechenEjs==='Abrechen'){
        res.redirect("/api/v1/inHome/kundenVerwaltung/:" + maNummerURLkundenVerwaltungKundeErstellen + "*" + idURLkundenVerwaltungKundeErstellen + "*")
    } else if(req.body.ButtonZuruekZurKundenVerwaltungEjs=== 'Zurück zur Kundenverwaltung') {
        res.redirect("/api/v1/inHome/kundenVerwaltung/:" + maNummerURLkundenVerwaltungKundeErstellen + "*" + idURLkundenVerwaltungKundeErstellen + "*")
    } else if(req.body.meinAvatarButtonNameEjs==="meinAvatar") {
        res.redirect("/api/v1/inHome/meinAvatar/:" +  maNummerURLkundenVerwaltungKundeErstellen + "*" + idURLkundenVerwaltungKundeErstellen + "*")
    } else if(req.body.mitarbeiterVerwaltungButtonNameEjs==="MitarbeiterVerwaltung") {
        res.redirect("/api/v1/inHome/mitarbeiterVerwaltung/:" + maNummerURLkundenVerwaltungKundeErstellen + "*" + idURLkundenVerwaltungKundeErstellen + "*")
    } else if(req.body.kundenVerwaltungButtonNameEjs==="KundenVerwaltung"){
        res.redirect("/api/v1/inHome/kundenVerwaltung/:"+maNummerURLkundenVerwaltungKundeErstellen+"*"+idURLkundenVerwaltungKundeErstellen+"*")
    }

};

export let kundenVerwaltungKundeErstellenControllerDelete = async (req, res) => {
    console.log("Bin DELETE BearbeitenKunde")

    console.log("bin DELETE kundenVerwaltungBearbeitenKundeRoute.mjs")

    const myArrFullPath = req.path.split(':');
    console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLkundenVerwaltung = myArr1PathMitStern[0];
    let idURLkundenVerwaltung = myArr1PathMitStern[1];
    console.log("DELETE maNummerURLkundenVerwaltungBearbeitenKunde: " + maNummerURLkundenVerwaltung);
    console.log("DELETE idURLkundenVerwaltungBearbeitenKunde: " + idURLkundenVerwaltung);

    let foundImEingeloggtkundenVerwaltung = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLkundenVerwaltung && x.userID_D === parseInt(idURLkundenVerwaltung)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    console.log("DELETE foundImEingeloggtkundenVerwaltung: "+JSON.stringify(foundImEingeloggtkundenVerwaltung));


    for( let i = 0; i < userEingeloggtArray.length; i++){
        if ( userEingeloggtArray[i] === foundImEingeloggtkundenVerwaltung) {
            userEingeloggtArray.splice(i, 1);
        }
    }
    res.clearCookie('cokMaNummer');
    res.redirect('/api/v1/login1');
};