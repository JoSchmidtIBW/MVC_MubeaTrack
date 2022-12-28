import express from "express";
import userEingeloggtArray from "../utils/userEingeloggtArray.mjs";
import {sucheInDBKunden} from "../models/kundenVerwaltungDB.mjs";

const router = express.Router();

//router.get('/kundenVerwaltung/:irgendwas',authentificateUser,kundenVerwaltungControllerGet);
//router.delete('/:irgendwas',authentificateUser,inHomeControllerDelete);
//router.post('/:irgendwas',authentificateUser,kundenVerwaltungControllerGetControllerPost);


//:irgendwas
// router.get("/", async (req, res) => {
//     console.log("bin kundenVerwaltungRozute.mjs")
//
//      res.render('pages/layoutKundenVerwaltungAdmin', {
//          data: await sucheInDBKunden(),
//          FooterWerIstAngemeldet: "Seppe" + " " + "Toni"
//      });
// });

router.get("/:irgendwas", async (req, res) => {
    console.log("bin kundenVerwaltungRozute.mjs")

    const nachURLDoppelpunktArr = req.path.split(':');
    let gesplittetVonURLabDoppelpunkt = nachURLDoppelpunktArr[1];
    const gesplittetVonURLabDoppelpunktmitStern = gesplittetVonURLabDoppelpunkt.split('*');
    let maNummerURLAngemeldet = gesplittetVonURLabDoppelpunktmitStern[0];
    let passwortURLAngemeldet = gesplittetVonURLabDoppelpunktmitStern[1];

    console.log("maNummerURLAngemeldetPOST: "+maNummerURLAngemeldet)
    console.log("passwortURLAngemeldetPOST: "+passwortURLAngemeldet)

    let mitarbeiterVerwaltungButton = req.body.mitarbeiterVerwaltungButton;
    console.log("MitarbeiterVerwaltungButton: "+mitarbeiterVerwaltungButton)


        res.render('pages/layoutKundenVerwaltungAdmin', {
            data: await sucheInDBKunden(),
            FooterWerIstAngemeldet: "Seppe" + " " + "Toni"
        });
});


router.post("/:irgendwas", async (req, res) => {
    console.log("bin mitarbeiterVerwaltungRoute.mjs")

    const nachURLDoppelpunktArr = req.path.split(':');
    let gesplittetVonURLabDoppelpunkt = nachURLDoppelpunktArr[1];
    const gesplittetVonURLabDoppelpunktmitStern = gesplittetVonURLabDoppelpunkt.split('*');
    let maNummerURLAngemeldet = gesplittetVonURLabDoppelpunktmitStern[0];
    let passwortURLAngemeldet = gesplittetVonURLabDoppelpunktmitStern[1];

    console.log("maNummerURLAngemeldetPOST: "+maNummerURLAngemeldet)
    console.log("passwortURLAngemeldetPOST: "+passwortURLAngemeldet)

    let mitarbeiterVerwaltungButton = req.body.mitarbeiterVerwaltungButton;
    console.log("MitarbeiterVerwaltungButton: "+mitarbeiterVerwaltungButton)

    if(req.body.kundenVerwaltungButtonRetourInHomeNameEjs==="Zurück zur Verladungserfassung"){
        res.redirect('/api/v1/inHome/:'+ maNummerURLAngemeldet+"*"+passwortURLAngemeldet);
    }
    else if(req.body.mitarbeiterVerwaltungButtonNameEjs==="MitarbeiterVerwaltung"){
        res.redirect("/api/v1/inHome/mitarbeiterVerwaltung/:"+maNummerURLAngemeldet+"*"+passwortURLAngemeldet)
    }

});



router.delete("/:irgendwas", (req, res) => {
    console.log("bin kundenVerwaltungRozute.mjs")

    const nachURLDoppelpunktArr = req.path.split(':');
    let gesplittetVonURLabDoppelpunkt = nachURLDoppelpunktArr[1];
    const gesplittetVonURLabDoppelpunktmitStern = gesplittetVonURLabDoppelpunkt.split('*');
    let maNummerURLAngemeldet = gesplittetVonURLabDoppelpunktmitStern[0];
    let passwortURLAngemeldet = gesplittetVonURLabDoppelpunktmitStern[1];

    console.log("maNummerURLAngemeldetPOST: "+maNummerURLAngemeldet)
    console.log("passwortURLAngemeldetPOST: "+passwortURLAngemeldet)
    //suche im Array, ob User Admin eingeloggt, wenn gefunden, dann löschen
    let foundAdminImEingeloggt = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLAngemeldet && x.Nachname_D==='Administrator'))
    console.log("foundAdminImEingeloggt: "+JSON.stringify(foundAdminImEingeloggt));

    for( let i = 0; i < userEingeloggtArray.length; i++){
        if ( userEingeloggtArray[i] === foundAdminImEingeloggt) {
            userEingeloggtArray.splice(i, 1);
        }
    }
    res.redirect('/api/v1/login2');
});

export default router;






//--------------------------------------ALT--------------------------------------------
// import express from "express";
// import {authentificateUser} from "../utils/authenticateUser.mjs";
// import userEingeloggtArray from "../utils/userEingeloggtArray.mjs";
// import {sucheInDBKunden} from "../models/kundenVerwaltungDB.mjs";
// import splitDB_DBObj_General from "../utils/splitDB_DBObj_General.mjs";
//
// const router = express.Router();
//
// //router.get('/kundenVerwaltung/:irgendwas',authentificateUser,kundenVerwaltungControllerGet);
// //router.delete('/:irgendwas',authentificateUser,inHomeControllerDelete);
// //router.post('/:irgendwas',authentificateUser,kundenVerwaltungControllerGetControllerPost);
// //:irgendwas
// router.get("/", async (req, res) => {
//     console.log("bin kundenVerwaltungRozute.mjs")
//
//     //console.log("******: "+sucheInDBKunden());
//     //console.log("******: "+await sucheInDBKunden());
//     let KundenVonDBObjArr = await sucheInDBKunden();
//     console.log("++++:"+(KundenVonDBObjArr))
//     for (let i = 0; i< KundenVonDBObjArr.length;i++) {
//         // if (jsObjects[i].b == 6) {
//         //console.log((KundenVonDBObjArr[i]));
//         // }
//     }
//
//     // for (const [key, value] of Object.entries(KundenVonDBObjArr)) {
//     //     console.log(`KundeK: ${key}, value: ${value}`)
//     // }
//
//     //console.log(Object.keys(KundenVonDBObjArr)) // ['a', 'b', 'c']
//     //
//     // console.log(Object.values(KundenVonDBObjArr)) // [1, 2, 3]
//
//     //console.log(KundenVonDBObjArr.entries())
//     //console.log(Object.entries(KundenVonDBObjArr))
//     //let splitKundenVonDB = splitDB_DBObj_General(KundenVonDB)
//     // let KundenVonDBArrayVorEckige = KundenVonDBObjArr.split("[");
//     //  //console.log("KundenVonDBArrayVorEckige: "+KundenVonDBArrayVorEckige[1]);
//     // let KundenVonDBArrayNachEckige = KundenVonDBArrayVorEckige[1].split("]");
//     //  //console.log("KundenVonDBArrayNachEckige: "+KundenVonDBArrayNachEckige[0]);
//     //  let kunden = KundenVonDBArrayNachEckige[0]
//     // console.log("kunden: "+kunden);
//     // console.log("******: "+kunden.KundeK);
//     // console.log("kunden.length: "+kunden.length);
//
//
//     //wenn mehrere manummern vorhanden
//     // const myArray3
//     //console.log("******: "+JSON.stringify(splitKundenVonDB));
//     //console.log("******: "+splitKundenVonDB.KundeK);
//
//     //maNummerLEingabe = req.body.maNummerLEingabe;
//     //passwortLEingabe = req.body.passwortLEingabe;
//     //res.send("Bin Kundenverwaltung")
//     res.render('pages/layoutKundenVerwaltungAdmin', {
//         //     //maNummerLServer : maNummerLEingabe,
//         //     //passwortLServer : passwortLEingabe,
//         //    // xClicker: clicker()
//         data: await sucheInDBKunden(),
//         FooterWerIstAngemeldet: "Seppe" + " " + "Toni"
//     });
// });
//
// router.delete("/", (req, res) => {
//     console.log("bin kundenVerwaltungRozute.mjs")
//
//
//     let foundAdminImEingeloggt = userEingeloggtArray.find(x => (x.MaNummer_D === '0001' && x.Nachname_D==='Administrator'))
//     console.log("foundAdminImEingeloggt: "+JSON.stringify(foundAdminImEingeloggt));
//
//     for( let i = 0; i < userEingeloggtArray.length; i++){
//         if ( userEingeloggtArray[i] === foundAdminImEingeloggt) {
//             userEingeloggtArray.splice(i, 1);
//         }
//     }
//
//     res.redirect('/api/v1/login2');
// });
//
// export default router;