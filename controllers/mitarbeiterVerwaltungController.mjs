import userEingeloggtArray from "../utils/userEingeloggtArray.mjs";


export let mitarbeiterVerwaltungControllerGet = async (req, res) => {
    console.log("bin GET mitarbeiterVerwaltungRoute.mjs")

    const myArrFullPath = req.path.split(':');
    //console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    //console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLmitarbeiterVerwaltung = myArr1PathMitStern[0];
    let idURLmitarbeiterVerwaltung = myArr1PathMitStern[1];
    console.log("GET maNummerURLmitarbeiterVerwaltung: " + maNummerURLmitarbeiterVerwaltung);
    console.log("GET idURLmitarbeiterVerwaltung: " + idURLmitarbeiterVerwaltung);

    let foundImEingeloggtmitarbeiterVerwaltung = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLmitarbeiterVerwaltung && x.userID_D === parseInt(idURLmitarbeiterVerwaltung)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    //console.log("GET foundImEingeloggtmitarbeiterVerwaltung: "+JSON.stringify(foundImEingeloggtmitarbeiterVerwaltung));

    // let mitarbeiterVerwaltungButton = req.body.mitarbeiterVerwaltungButton;
    // console.log("MitarbeiterVerwaltungButton: "+mitarbeiterVerwaltungButton)



    res.render('pages/layoutMitarbeiterVerwaltungAdmin', {
        //data: await sucheInDBKunden(),
        FooterWerIstAngemeldet: maNummerURLmitarbeiterVerwaltung + " " + idURLmitarbeiterVerwaltung
    });
};


export let mitarbeiterVerwaltungControllerPost =async (req, res) => {
    console.log("bin POST mitarbeiterVerwaltungRoute.mjs")

    const myArrFullPath = req.path.split(':');
    //console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    //console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLmitarbeiterVerwaltung = myArr1PathMitStern[0];
    let idURLmitarbeiterVerwaltung = myArr1PathMitStern[1];
    console.log("POST maNummerURLmitarbeiterVerwaltung: " + maNummerURLmitarbeiterVerwaltung);
    console.log("POST idURLmitarbeiterVerwaltung: " + idURLmitarbeiterVerwaltung);

    let foundImEingeloggtmitarbeiterVerwaltung = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLmitarbeiterVerwaltung && x.userID_D === parseInt(idURLmitarbeiterVerwaltung)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    //console.log("POST foundImEingeloggtmitarbeiterVerwaltung: "+JSON.stringify(foundImEingeloggtmitarbeiterVerwaltung));


    // let mitarbeiterVerwaltungButton = req.body.mitarbeiterVerwaltungButton;
    // console.log("MitarbeiterVerwaltungButton: "+mitarbeiterVerwaltungButton)
     let mitarbeiterVerwaltungButtonRetourInHomeNameEjs = req.body.mitarbeiterVerwaltungButtonRetourInHomeNameEjs;
     console.log("mitarbeiterVerwaltungButtonRetourInHomeNameEjs "+mitarbeiterVerwaltungButtonRetourInHomeNameEjs)

    if(req.body.mitarbeiterVerwaltungButtonRetourInHomeNameEjs==="Zurück zur Verladungserfassung"){
        console.log("mitarbeiterVerwaltungButtonRetourInHomeNameEjs -----------------------------------------------sollte kommen")
        res.redirect('/api/v1/inHome/:'+ maNummerURLmitarbeiterVerwaltung+"*"+idURLmitarbeiterVerwaltung);//
    }
    else if(req.body.kundenVerwaltungButtonNameEjs==="KundenVerwaltung"){
        console.log("kundenVerwaltungButtonNameEjs********************************************************************** sollte kommen")
        res.redirect("/api/v1/inHome/kundenVerwaltung/:"+maNummerURLmitarbeiterVerwaltung+"*"+idURLmitarbeiterVerwaltung)
    }

};




export let mitarbeiterVerwaltungControllerDelete = (req, res) => {
    console.log("bin DELETE mitarbeiterVerwaltungRoute.mjs")

    //suche im Array, ob User Admin eingeloggt, wenn gefunden, dann löschen
    const myArrFullPath = req.path.split(':');
    //console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[1];
    //console.log("gesplittetVonURLdenUserTeil: "+gesplittetVonURLdenUserTeil)
    const myArr1PathMitStern = gesplittetVonURLdenUserTeil.split('*');
    let maNummerURLmitarbeiterVerwaltung = myArr1PathMitStern[0];
    let idURLmitarbeiterVerwaltung = myArr1PathMitStern[1];
    console.log("DELETE maNummerURLmitarbeiterVerwaltung: " + maNummerURLmitarbeiterVerwaltung);
    console.log("DELETE idURLmitarbeiterVerwaltung: " + idURLmitarbeiterVerwaltung);

    let foundImEingeloggtmitarbeiterVerwaltung = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLmitarbeiterVerwaltung && x.userID_D === parseInt(idURLmitarbeiterVerwaltung)));// x.Passwort_D==='rTtGwkAwxI6ajLjBmMtZ3w=='))//x.userID_D === idURLAuth))//; x.Passwort_D===passwortURLAuth))
    console.log("DELETE foundImEingeloggtmitarbeiterVerwaltung: "+JSON.stringify(foundImEingeloggtmitarbeiterVerwaltung));


    for( let i = 0; i < userEingeloggtArray.length; i++){
        if ( userEingeloggtArray[i] === foundImEingeloggtmitarbeiterVerwaltung) {
            userEingeloggtArray.splice(i, 1);
        }
    }
    res.clearCookie('cokMaNummer');
    res.redirect('/api/v1/login1');
};
