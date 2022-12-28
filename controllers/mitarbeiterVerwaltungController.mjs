import userEingeloggtArray from "../utils/userEingeloggtArray.mjs";


export let mitarbeiterVerwaltungControllerGet = async (req, res) => {
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



    res.render('pages/layoutMitarbeiterVerwaltungAdmin', {
        //data: await sucheInDBKunden(),
        FooterWerIstAngemeldet: maNummerURLAngemeldet + " " + passwortURLAngemeldet
    });
};


export let mitarbeiterVerwaltungControllerPost =async (req, res) => {
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

    if(req.body.mitarbeiterVerwaltungButtonRetourInHomeNameEjs==="Zurück zur Verladungserfassung"){
        res.redirect('/api/v1/inHome/:'+ maNummerURLAngemeldet+"*"+passwortURLAngemeldet);
    }
    else if(req.body.kundenVerwaltungButtonNameEjs==="KundenVerwaltung"){
        res.redirect("/api/v1/inHome/kundenVerwaltung/:"+maNummerURLAngemeldet+"*"+passwortURLAngemeldet)
    }

};




export let mitarbeiterVerwaltungControllerDelete = (req, res) => {
    console.log("bin mitarbeiterVerwaltungRoute.mjs")

    //suche im Array, ob User Admin eingeloggt, wenn gefunden, dann löschen
    let foundAdminImEingeloggt = userEingeloggtArray.find(x => (x.MaNummer_D === '0001' && x.Nachname_D==='Administrator'))
    console.log("foundAdminImEingeloggt: "+JSON.stringify(foundAdminImEingeloggt));

    for( let i = 0; i < userEingeloggtArray.length; i++){
        if ( userEingeloggtArray[i] === foundAdminImEingeloggt) {
            userEingeloggtArray.splice(i, 1);
        }
    }
    res.redirect('/api/v1/login2');
};
