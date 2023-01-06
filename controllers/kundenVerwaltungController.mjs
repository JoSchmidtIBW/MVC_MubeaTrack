import {sucheInDBKunden} from "../models/kundenVerwaltungDB.mjs";
import userEingeloggtArray from "../utils/userEingeloggtArray.mjs";


export let kundenVerwaltungControllerGet = async (req, res) => {
    console.log("bin GET kundenVerwaltungRozute.mjs")

    const myArrFullPath = req.path.split(':');
    //console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    //console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLkundenVerwaltung = myArr1PathMitStern[0];
    let idURLkundenVerwaltung = myArr1PathMitStern[1];
    console.log("GET maNummerURLkundenVerwaltung: " + maNummerURLkundenVerwaltung);
    console.log("GET idURLkundenVerwaltung: " + idURLkundenVerwaltung);

    let foundImEingeloggtkundenVerwaltung = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLkundenVerwaltung && x.userID_D === parseInt(idURLkundenVerwaltung)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    //console.log("GET foundImEingeloggtkundenVerwaltung: "+JSON.stringify(foundImEingeloggtkundenVerwaltung));

    // let mitarbeiterVerwaltungButton = req.body.mitarbeiterVerwaltungButton;
    // console.log("MitarbeiterVerwaltungButton: "+mitarbeiterVerwaltungButton)


    res.render('pages/layoutKundenVerwaltungAdmin', {
        MaNummerServer: maNummerURLkundenVerwaltung,
        iDUserServer: idURLkundenVerwaltung,
        data: await sucheInDBKunden(),
        FooterWerIstAngemeldet: maNummerURLkundenVerwaltung + ", " + idURLkundenVerwaltung
    });
};


export let kundenVerwaltungControllerPost = async (req, res) => {
    console.log("bin POST mitarbeiterVerwaltungRoute.mjs")

    const myArrFullPath = req.path.split(':');
    //console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
   // console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLkundenVerwaltung = myArr1PathMitStern[0];
    let idURLkundenVerwaltung = myArr1PathMitStern[1];
    console.log("POST maNummerURLkundenVerwaltung: " + maNummerURLkundenVerwaltung);
    console.log("POST idURLkundenVerwaltung: " + idURLkundenVerwaltung);

    let foundImEingeloggtkundenVerwaltung = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLkundenVerwaltung && x.userID_D === parseInt(idURLkundenVerwaltung)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    //console.log("POST foundImEingeloggtkundenVerwaltung: "+JSON.stringify(foundImEingeloggtkundenVerwaltung));

    // let mitarbeiterVerwaltungButton = req.body.mitarbeiterVerwaltungButton;
    // console.log("MitarbeiterVerwaltungButton: "+mitarbeiterVerwaltungButton)

    if(req.body.kundenVerwaltungButtonRetourInHomeNameEjs==="Zurück zur Verladungserfassung"){
        res.redirect('/api/v1/inHome/:'+ maNummerURLkundenVerwaltung+"*"+idURLkundenVerwaltung+"*");
    }
    else if(req.body.mitarbeiterVerwaltungButtonNameEjs==="MitarbeiterVerwaltung") {
        res.redirect("/api/v1/inHome/mitarbeiterVerwaltung/:" + maNummerURLkundenVerwaltung + "*" + idURLkundenVerwaltung + "*")
    }else if(req.body.ButtonNeuerKundeErfassenEjs==='Neuer Kunde Erfassen'){
        res.redirect("/api/v1/inHome/kundenVerwaltung/kundeErstellen/:" + maNummerURLkundenVerwaltung + "*" + idURLkundenVerwaltung + "*")
    }
    // else if(req.body.iButtonKundenBearbeitenNameEjs==="1") {
    //     let ausgabe = req.body.meineEingabe
    //     console.log("ausgabe: " + ausgabe)
    // } else if(req.body.iButtonKundenBearbeitenNameEjs==="X"){
    // let ausgabe = req.body.meineEingabe
    // console.log("ausgabe: "+ausgabe)






        //res.redirect('/api/v1/inHome/kundenVerwaltung/kundeBearbeiten/:'+maNummerURLkundenVerwaltung+"*"+idURLkundenVerwaltung)
        //res.send("111"+gDaten)
        // res.send("111111111111111",{
        //     gewaehlteDaten: req.body.gewaehlteDaten
        // })
    // }else if(req.body.iButtonKundenBearbeitenNameEjs==="2"){
    //     res.send("2222222222222")
    // }else if(req.body.iiButtonKundenBearbeitenNameEjs==="i"){
    //     //res.send("2222222222222")
    //     //let ausgabe = req.body.maNummerLEingabe1//funktioniert
    //     //console.log("ausgabe: "+ausgabe)
    //
    //
    //
    //     //res.redirect('/api/v1/inHome/kundenVerwaltung/kundeBearbeiten/:'+maNummerURLkundenVerwaltung+"*"+idURLkundenVerwaltung)
    // }

};



export let kundenVerwaltungControllerDelete = (req, res) => {
    console.log("bin DELETE kundenVerwaltungRozute.mjs")

    const myArrFullPath = req.path.split(':');
    console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLkundenVerwaltung = myArr1PathMitStern[0];
    let idURLkundenVerwaltung = myArr1PathMitStern[1];
    console.log("DELETE maNummerURLkundenVerwaltung: " + maNummerURLkundenVerwaltung);
    console.log("DELETE idURLkundenVerwaltung: " + idURLkundenVerwaltung);

    let foundImEingeloggtkundenVerwaltung = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLkundenVerwaltung && x.userID_D === parseInt(idURLkundenVerwaltung)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    console.log("DELETE foundImEingeloggtkundenVerwaltung: "+JSON.stringify(foundImEingeloggtkundenVerwaltung));

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