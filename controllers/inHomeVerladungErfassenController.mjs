import userEingeloggtArray from "../utils/userEingeloggtArray.mjs";
import {sucheInDBVerladung} from "../models/inHomeVerladungDB.mjs";
import {sucheInDBKunden} from "../models/kundenVerwaltungDB.mjs";
import {sucheInDBKundeMitKundenNummer} from '../models/verladungErfassenDB.mjs'
import splitDB_DBObj from "../utils/splitDB_DBObj_General.mjs";
import splitDB_DBObj_General from "../utils/splitDB_DBObj_General.mjs";
import schreibeInDBErstellteVerladung from "../models/verladungErfassenDB.mjs";

export let inHomeVerladungErfassenControllerGet = async (req, res) => {
    console.log("inHomeVerladungErfassenControllerGet")
    // console.log("inHome param maNummer:"+req.params['maNummerPATH']);
    // console.log("inHome param maNummer:"+req.params['idPATH']);


    // splitte von URL /:irgendwas
    const myArrFullPath = req.path.split(':');
    console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLinHomeVerladungErfassen = myArr1PathMitStern[0];
    let idURLinHomeVerladungErfassen = myArr1PathMitStern[1];
    console.log("inHome maNummerURLinHomeVerladungErfassen: " + maNummerURLinHomeVerladungErfassen);
    console.log("inHome idURLinHomeVerladungErfassen: " + idURLinHomeVerladungErfassen);

    let foundImEingeloggtinHomeVerladungErfassen = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLinHomeVerladungErfassen && x.userID_D === parseInt(idURLinHomeVerladungErfassen)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    console.log("inHome foundImEingeloggtinHomeVerladungErfassen: "+JSON.stringify(foundImEingeloggtinHomeVerladungErfassen));

    console.log("GET sucheInKundenDB: "+await sucheInDBKunden());
    let KundenDatenObj = await sucheInDBKunden();
    console.log("kundenobje: "+KundenDatenObj.OrtK)

    console.log("kundenobje: "+JSON.stringify(KundenDatenObj))
    let kundenObjecte = JSON.stringify(KundenDatenObj)

    // console.log("kundenobje split : "+splitDB_DBObj(kundenObjecte))
    // console.log("kundenobje split : "+splitDB_DBObj(kundenObjecte).KundeK)
    //
    // console.log("kundenobje split : "+splitDB_DBObj(kundenObjecte))
    //console.log("kundenobje split : "+JSON.stringify(kundenObjecte.KundeK))
    console.log("kundenobje split : "+kundenObjecte.KundeK)
    // const userDate = realm.objects('User').filtered('user_email == $0', value.username.toString(), );
    // Alert.alert(  JSON.stringify(userDate)  );


    if(foundImEingeloggtinHomeVerladungErfassen.RolleUser_D==='Admin'){
         res.render('pages/layoutInHomeVerladungErfassenAdmin', {
             werIstAngemeldetH: foundImEingeloggtinHomeVerladungErfassen.MaNummer_D + " " + foundImEingeloggtinHomeVerladungErfassen.Vorname_D,
             vorName: foundImEingeloggtinHomeVerladungErfassen.Vorname_D,
             nachName: foundImEingeloggtinHomeVerladungErfassen.Nachname_D,
        //     kundeIHServer: "hoi kunde",
             data:await sucheInDBKunden(),
             MaNummerServer: foundImEingeloggtinHomeVerladungErfassen.MaNummer_D,
        //     data: await sucheInDBVerladung(),////
             avatarFarbeServer: foundImEingeloggtinHomeVerladungErfassen.AvatarFarbeU_D,
             FooterWerIstAngemeldet: foundImEingeloggtinHomeVerladungErfassen.MaNummer_D + " " + foundImEingeloggtinHomeVerladungErfassen.Vorname_D
        });
    }else {// auch seite Admin
        res.render('pages/layoutInHomeVerladungErfassenUser', {
            werIstAngemeldetH: foundImEingeloggtinHomeVerladungErfassen.MaNummer_D + " " + foundImEingeloggtinHomeVerladungErfassen.Vorname_D,
            //     kundeIHServer: "hoi kunde",
            vorName: foundImEingeloggtinHomeVerladungErfassen.Vorname_D,
            nachName: foundImEingeloggtinHomeVerladungErfassen.Nachname_D,
            data: await sucheInDBKunden(),
            MaNummerServer: foundImEingeloggtinHomeVerladungErfassen.MaNummer_D,
            //     data: await sucheInDBVerladung(),
            avatarFarbeServer: foundImEingeloggtinHomeVerladungErfassen.AvatarFarbeU_D,
            FooterWerIstAngemeldet: foundImEingeloggtinHomeVerladungErfassen.MaNummer_D + " " + foundImEingeloggtinHomeVerladungErfassen.Vorname_D
        });
    }

};

export let inHomeVerladungErfassenControllerPost = async (req, res) => {
    console.log("inHomeVerladungErfassenControllerPost")
    // console.log("inHome param maNummer:"+req.params['maNummerPATH']);
    // console.log("inHome param maNummer:"+req.params['idPATH']);


    // splitte von URL /:irgendwas
    const myArrFullPath = req.path.split(':');
    console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLinHomeVerladungErfassen = myArr1PathMitStern[0];
    let idURLinHomeVerladungErfassen = myArr1PathMitStern[1];
    console.log("POST maNummerURLinHomeVerladungErfassen: " + maNummerURLinHomeVerladungErfassen);
    console.log("POST idURLinHomeVerladungErfassen: " + idURLinHomeVerladungErfassen);

    let foundImEingeloggtinHomeVerladungErfassen = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLinHomeVerladungErfassen && x.userID_D === parseInt(idURLinHomeVerladungErfassen)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    console.log("inHome foundImEingeloggtinHomeVerladungErfassen: "+JSON.stringify(foundImEingeloggtinHomeVerladungErfassen));

    //if(maNummerURLinHomeVerladungErfassen==='0001'){
    if(foundImEingeloggtinHomeVerladungErfassen.RolleUser_D==='Admin') {
        if (req.body.mitarbeiterVerwaltungButtonNameEjs === "MitarbeiterVerwaltung") {
            res.redirect("/api/v1/inHome/mitarbeiterVerwaltung/:" + maNummerURLinHomeVerladungErfassen + "*" + idURLinHomeVerladungErfassen + "*")
            //         //res.send("Hallo Post MiitarbeiterVerwaltung")

        } else if (req.body.kundenVerwaltungButtonNameEjs === "KundenVerwaltung") {
            res.redirect("/api/v1/inHome/kundenVerwaltung/:" + maNummerURLinHomeVerladungErfassen + "*" + idURLinHomeVerladungErfassen + "*")
        } else if (req.body.ButtonZurueckVerladungenEjs === "Zurück zu Verladungen") {
            res.redirect("/api/v1/inHome/:" + maNummerURLinHomeVerladungErfassen + "*" + idURLinHomeVerladungErfassen + "*")
        } else if (req.body.ButtonAbrechenEjs === 'Abrechen') {
            res.redirect("/api/v1/inHome/:" + maNummerURLinHomeVerladungErfassen + "*" + idURLinHomeVerladungErfassen + "*")
        } else if (req.body.ButtonSpeichernEjs === 'Speichern') {

            let vorName = req.body.erfassenVornameClientEJS
            let nachName = req.body.erfassenNachnameClientEJS
            let datum = req.body.erfassenDatumClientEJS
            let Zeit = req.body.erfassenZeitClientEJS
            let wunschDatum = req.body.erfassenWunschDatumClientEJS
            let datumWunsch = req.body.erfasstDatumWunschClientEJS
            let datumWunschKalender = req.body.erfasstDatumWunschKalenderClientEJS
            let kunde = req.body.erfassenKundeClientEJS
            let kundenNummerAusgewaelt = req.body.erfassenKundeNameClientEJS
            let mengeTO = req.body.erfasstMengeToClientEJS
            let artikelAL = req.body.erfasstArtikelAnLagerSelectClientEJS
            let lsILS = req.body.erfasstLSImLeitSystemSelectClientEJS
            let r_K = req.body.erfasstR_KSelectClientEJS
            let artikelNProd = req.body.erfasstArtikelNichtProdClientEJS

            console.log("******************************************************");
            console.log("POST vorName: " + vorName);
            console.log("POST nachName: " + nachName);
            console.log("POST datum: " + datum);
            console.log("POST Zeit: " + Zeit);
            console.log("POST wunschDatum: " + wunschDatum);
            console.log("POST datumWunsch: " + datumWunsch);
            console.log("POST datumWunschKalender: " + datumWunschKalender);
            console.log("POST kunde: " + kunde);
            console.log("POST kundenNummerAusgewaelt: " + kundenNummerAusgewaelt);
            console.log("POST mengeTO: " + mengeTO);
            console.log("POST artikelAL: " + artikelAL);
            console.log("POST lsILS: " + lsILS);
            console.log("POST r_K: " + r_K);
            console.log("POST artikelNProd: " + artikelNProd);


            console.log("sucheInDBKundeMitKundenNummer: " + await sucheInDBKundeMitKundenNummer(kundenNummerAusgewaelt))
            let id_K = await sucheInDBKundeMitKundenNummer(kundenNummerAusgewaelt)
            console.log("splitDB_DBObj(JSON.stringify(id_K)): " + splitDB_DBObj(JSON.stringify(id_K)))
            console.log("JSON.stringify(id_K): " + JSON.stringify(id_K))
            let JsonSid_K = JSON.stringify(id_K)
            console.log("JsonSid_K: " + JsonSid_K)
            console.log("id_K: " + JSON.stringify(splitDB_DBObj(JsonSid_K)))
            let xxx = JSON.stringify(splitDB_DBObj(JsonSid_K))
            let parseID_Kdata = JSON.parse(xxx);
            console.log("jeeeeeee: " + parseID_Kdata.ID_K)
            let parseIntParseID_Kdata = parseInt(parseID_Kdata.ID_K)

            schreibeInDBErstellteVerladung(vorName, nachName, datum, Zeit, datumWunschKalender, parseIntParseID_Kdata, mengeTO, artikelAL, lsILS, r_K, artikelNProd)

            // console.log("xxx:"+xxx)
            // console.log("JSON.stringify(xxx.ID_K):"+JSON.stringify(xxx.ID_K))
            //
            // console.log("id_K.id_K:"+id_K.ID_K)
            //
            // let id_KData = await sucheInDBKundeMitKundenNummer(kundenNummerAusgewaelt)
            // console.log("data: "+id_KData.ID_K)
            // console.log("data: "+JSON.parse(xxx.ID_K))
            //console.log("splitDB_DBObj(id_K):"+splitDB_DBObj(id_K))

            //console.log("id_K.id_K:"+JSON.stringify(splitDB_DBObj(id_K)).ID_K)
            //schreibeInDBErstellteVerladung(vorName, nachName, datum, Zeit, datumWunschKalender,)
            res.redirect("/api/v1/inHome/:" + maNummerURLinHomeVerladungErfassen + "*" + idURLinHomeVerladungErfassen + "*")
        }

    }else if (foundImEingeloggtinHomeVerladungErfassen.RolleUser_D === 'Chef' || foundImEingeloggtinHomeVerladungErfassen.RolleUser_D === 'Mitarbeiter') {

            if (req.body.ButtonZurueckVerladungenEjs === "Zurück zu Verladungen") {
                res.redirect("/api/v1/inHome/:" + maNummerURLinHomeVerladungErfassen + "*" + idURLinHomeVerladungErfassen + "*")
            } else if (req.body.ButtonAbrechenEjs === 'Abrechen') {
                res.redirect("/api/v1/inHome/:" + maNummerURLinHomeVerladungErfassen + "*" + idURLinHomeVerladungErfassen + "*")
            } else if (req.body.ButtonSpeichernEjs === 'Speichern') {

                let vorName = req.body.erfassenVornameClientEJS
                let nachName = req.body.erfassenNachnameClientEJS
                let datum = req.body.erfassenDatumClientEJS
                let Zeit = req.body.erfassenZeitClientEJS
                let wunschDatum = req.body.erfassenWunschDatumClientEJS
                let datumWunsch = req.body.erfasstDatumWunschClientEJS
                let datumWunschKalender = req.body.erfasstDatumWunschKalenderClientEJS
                let kunde = req.body.erfassenKundeClientEJS
                let kundenNummerAusgewaelt = req.body.erfassenKundeNameClientEJS
                let mengeTO = req.body.erfasstMengeToClientEJS
                let artikelAL = req.body.erfasstArtikelAnLagerSelectClientEJS
                let lsILS = req.body.erfasstLSImLeitSystemSelectClientEJS
                let r_K = req.body.erfasstR_KSelectClientEJS
                let artikelNProd = req.body.erfasstArtikelNichtProdClientEJS

                console.log("******************************************************");
                console.log("POST vorName: " + vorName);
                console.log("POST nachName: " + nachName);
                console.log("POST datum: " + datum);
                console.log("POST Zeit: " + Zeit);
                console.log("POST wunschDatum: " + wunschDatum);
                console.log("POST datumWunsch: " + datumWunsch);
                console.log("POST datumWunschKalender: " + datumWunschKalender);
                console.log("POST kunde: " + kunde);
                console.log("POST kundenNummerAusgewaelt: " + kundenNummerAusgewaelt);
                console.log("POST mengeTO: " + mengeTO);
                console.log("POST artikelAL: " + artikelAL);
                console.log("POST lsILS: " + lsILS);
                console.log("POST r_K: " + r_K);
                console.log("POST artikelNProd: " + artikelNProd);


                console.log("sucheInDBKundeMitKundenNummer: " + await sucheInDBKundeMitKundenNummer(kundenNummerAusgewaelt))
                let id_K = await sucheInDBKundeMitKundenNummer(kundenNummerAusgewaelt)
                console.log("splitDB_DBObj(JSON.stringify(id_K)): " + splitDB_DBObj(JSON.stringify(id_K)))
                console.log("JSON.stringify(id_K): " + JSON.stringify(id_K))
                let JsonSid_K = JSON.stringify(id_K)
                console.log("JsonSid_K: " + JsonSid_K)
                console.log("id_K: " + JSON.stringify(splitDB_DBObj(JsonSid_K)))
                let xxx = JSON.stringify(splitDB_DBObj(JsonSid_K))
                let parseID_Kdata = JSON.parse(xxx);
                console.log("jeeeeeee: " + parseID_Kdata.ID_K)
                let parseIntParseID_Kdata = parseInt(parseID_Kdata.ID_K)

                schreibeInDBErstellteVerladung(vorName, nachName, datum, Zeit, datumWunschKalender, parseIntParseID_Kdata, mengeTO, artikelAL, lsILS, r_K, artikelNProd)

                // console.log("xxx:"+xxx)
                // console.log("JSON.stringify(xxx.ID_K):"+JSON.stringify(xxx.ID_K))
                //
                // console.log("id_K.id_K:"+id_K.ID_K)
                //
                // let id_KData = await sucheInDBKundeMitKundenNummer(kundenNummerAusgewaelt)
                // console.log("data: "+id_KData.ID_K)
                // console.log("data: "+JSON.parse(xxx.ID_K))
                //console.log("splitDB_DBObj(id_K):"+splitDB_DBObj(id_K))

                //console.log("id_K.id_K:"+JSON.stringify(splitDB_DBObj(id_K)).ID_K)
                //schreibeInDBErstellteVerladung(vorName, nachName, datum, Zeit, datumWunschKalender,)
                res.redirect("/api/v1/inHome/:" + maNummerURLinHomeVerladungErfassen + "*" + idURLinHomeVerladungErfassen + "*")
            }


    }
};


export let inHomeVerladungErfassenControllerDelete = async (req, res) => {
    console.log("inHomeVerladungErfassenControllerDelete")


    const myArrFullPath = req.path.split(':');
    //console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    //console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLinHomeVerladungErfassen = myArr1PathMitStern[0];
    let idURLinHomeVerladungErfassen = myArr1PathMitStern[1];
    //console.log("DELETE maNummerURLinHomeVerladungErfassen: " + maNummerURLinHomeVerladungErfassen);
    //console.log("DELETE idURLinHomeVerladungErfassen: " + idURLinHomeVerladungErfassen);

    let foundImEingeloggtinHomeVerladungErfassen = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLinHomeVerladungErfassen && x.userID_D === parseInt(idURLinHomeVerladungErfassen)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    //console.log("DELETE foundImEingeloggtkundenVerwaltung: "+JSON.stringify(foundImEingeloggtkundenVerwaltung));

    //suche im Array, ob User Admin eingeloggt, wenn gefunden, dann löschen
    // let foundAdminImEingeloggt = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLAngemeldet && x.Nachname_D==='Administrator'))
    // console.log("foundAdminImEingeloggt: "+JSON.stringify(foundAdminImEingeloggt));

    for( let i = 0; i < userEingeloggtArray.length; i++){
        if ( userEingeloggtArray[i] === foundImEingeloggtinHomeVerladungErfassen) {
            userEingeloggtArray.splice(i, 1);
        }
    }
    res.clearCookie('cokMaNummer');
    res.redirect('/api/v1/login1');
};