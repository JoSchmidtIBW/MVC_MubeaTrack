import express from "express";
import {authentificateUser} from "../utils/authenticateUser.mjs";
import userEingeloggtArray from "../utils/userEingeloggtArray.mjs";
import {sucheInDBKunden} from "../models/kundenVerwaltung.mjs";

const router = express.Router();

//router.get('/kundenVerwaltung/:irgendwas',authentificateUser,kundenVerwaltungControllerGet);
//router.delete('/:irgendwas',authentificateUser,inHomeControllerDelete);
//router.post('/:irgendwas',authentificateUser,kundenVerwaltungControllerGetControllerPost);
//:irgendwas
router.get("/", async (req, res) => {
    console.log("bin kundenVerwaltungRozute.mjs")

    //console.log("******: "+sucheInDBKunden());
    console.log("******: "+await sucheInDBKunden());

    //maNummerLEingabe = req.body.maNummerLEingabe;
    //passwortLEingabe = req.body.passwortLEingabe;
    //res.send("Bin Kundenverwaltung")
     res.render('pages/layoutKundenVerwaltungAdmin', {
    //     //maNummerLServer : maNummerLEingabe,
    //     //passwortLServer : passwortLEingabe,
    //    // xClicker: clicker()
         data: await sucheInDBKunden(),
         FooterWerIstAngemeldet: "Seppe" + " " + "Toni"
     });
});

router.delete("/", (req, res) => {
    console.log("bin kundenVerwaltungRozute.mjs")


    let foundAdminImEingeloggt = userEingeloggtArray.find(x => (x.MaNummer_D === '0001' && x.Nachname_D==='Administrator'))
    console.log("foundAdminImEingeloggt: "+JSON.stringify(foundAdminImEingeloggt));

    for( let i = 0; i < userEingeloggtArray.length; i++){
        if ( userEingeloggtArray[i] === foundAdminImEingeloggt) {
            userEingeloggtArray.splice(i, 1);
        }
    }

    res.redirect('/api/v1/login2');
});

export default router;