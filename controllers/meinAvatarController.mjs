import userEingeloggtArray from "../utils/userEingeloggtArray.mjs";
import {sucheInDBVerladung} from "../models/inHomeVerladungDB.mjs";

export let meinAvatarControllerGet = async (req, res) => {
    console.log("meinAvatarControllerGet - GET")

    const myArrFullPath = req.path.split(':');
    console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLinHome = myArr1PathMitStern[0];
    let idURLinHome = myArr1PathMitStern[1];
    console.log("inHome maNummerURLinHome: " + maNummerURLinHome);
    console.log("inHome idURLinHome: " + idURLinHome);

    let foundImEingeloggtinHome = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLinHome && x.userID_D === parseInt(idURLinHome)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    console.log("inHome foundImEingeloggtinHome: "+JSON.stringify(foundImEingeloggtinHome));


    if(foundImEingeloggtinHome===undefined){
        console.log("etwas ist schief gelaufen, wenn es bis nach hier kommt")
        res.send("OHA.....");
    } else if(foundImEingeloggtinHome.RolleUser_D==="Admin"){
        // achtung, wenn server neustartet ist user nicht im array!!!!!!
        //res.send("Bisch Admin");
        res.render('pages/layoutMeinAvatarAdmin', {
            MaNummerServer: foundImEingeloggtinHome.MaNummer_D,
            werIstAngemeldetH: foundImEingeloggtinHome.MaNummer_D + " " + foundImEingeloggtinHome.Vorname_D,
            avatarFarbeServer: foundImEingeloggtinHome.AvatarFarbeU_D,
            mitarbeiterNummer: foundImEingeloggtinHome.MaNummer_D,
            mitarbeiterVorname: foundImEingeloggtinHome.Vorname_D,
            mitarbeiterNachname : foundImEingeloggtinHome.Nachname_D,
            FooterWerIstAngemeldet: foundImEingeloggtinHome.MaNummer_D + " " + foundImEingeloggtinHome.Vorname_D
        });
    } else if(foundImEingeloggtinHome.RolleUser_D==="Chef" || foundImEingeloggtinHome.RolleUser_D==="Mitarbeiter"){
        // achtung, wenn server neustartet ist user nicht im array!!!!!!
        //res.send("Bisch Chef oder Mitarbeiter");
        res.render('pages/layoutMeinAvatarUser', {
            MaNummerServer: foundImEingeloggtinHome.MaNummer_D,
            werIstAngemeldetH: foundImEingeloggtinHome.MaNummer_D + " " + foundImEingeloggtinHome.Vorname_D,
            avatarFarbeServer: foundImEingeloggtinHome.AvatarFarbeU_D,
            mitarbeiterNummer: foundImEingeloggtinHome.MaNummer_D,
            mitarbeiterVorname: foundImEingeloggtinHome.Vorname_D,
            mitarbeiterNachname : foundImEingeloggtinHome.Nachname_D,
            FooterWerIstAngemeldet: foundImEingeloggtinHome.MaNummer_D + " " + foundImEingeloggtinHome.Vorname_D
        });
    }

};


export let meinAvatarControllerPost =async (req, res) => {
    console.log("bin meinAvatarControllerPost")

    const myArrFullPath = req.path.split(':');
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLmeinAvatar = myArr1PathMitStern[0];
    let idURLmeinAvatar = myArr1PathMitStern[1];

    let foundImEingeloggtmeinAvatar = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLmeinAvatar && x.userID_D === parseInt(idURLmeinAvatar)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))


    if(req.body.meinAvatarButtonRetourInHomeNameEjs==="Zurück zur Verladungserfassung") {
        res.redirect('/api/v1/inHome/:' + maNummerURLmeinAvatar + "*" + idURLmeinAvatar + "*");
    } else if(req.body.ButtonAbrechenEjs==="Abrechen"){
        res.redirect('/api/v1/inHome/:' + maNummerURLmeinAvatar + "*" + idURLmeinAvatar + "*");
    } else if(req.body.meinAvatarButtonNameEjs==="meinAvatar") {
        res.redirect("/api/v1/inHome/meinAvatar/:" + maNummerURLmeinAvatar+"*"+idURLmeinAvatar+"*")
    } else if(req.body.kundenVerwaltungButtonNameEjs==="KundenVerwaltung"){
        res.redirect("/api/v1/inHome/kundenVerwaltung/:"+ maNummerURLmeinAvatar+"*"+idURLmeinAvatar+"*")
    } else if(req.body.mitarbeiterVerwaltungButtonNameEjs==="MitarbeiterVerwaltung") {
        res.redirect("/api/v1/inHome/mitarbeiterVerwaltung/:" + maNummerURLmeinAvatar+"*"+idURLmeinAvatar+"*")
    }

};




export let meinAvatarControllerDelete = (req, res) => {
    console.log("bin meinAvatarControllerDelete")

    //suche im Array, ob User Admin eingeloggt, wenn gefunden, dann löschen
    const myArrFullPath = req.path.split(':');
    //console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    //console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLmeinAvatar = myArr1PathMitStern[0];
    let idURLmeinAvatar = myArr1PathMitStern[1];
    //console.log("DELETE maNummerURLmitarbeiterVerwaltung: " + maNummerURLmitarbeiterVerwaltung);
    //console.log("DELETE idURLmitarbeiterVerwaltung: " + idURLmitarbeiterVerwaltung);

    let foundImEingeloggtmeinAvatar = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLmeinAvatar && x.userID_D === parseInt(idURLmeinAvatar)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    //console.log("DELETE foundImEingeloggtmitarbeiterVerwaltung: "+JSON.stringify(foundImEingeloggtmitarbeiterVerwaltung));


    for( let i = 0; i < userEingeloggtArray.length; i++){
        if ( userEingeloggtArray[i] === foundImEingeloggtmeinAvatar) {
            userEingeloggtArray.splice(i, 1);
        }
    }
    res.clearCookie('cokMaNummer');
    res.redirect('/api/v1/login1');
};
