import Console from "console";
import userEingeloggtArray from "../utils/userEingeloggtArray.mjs";

let myCounter = 0;
function xLogOut() {
    myCounter = myCounter +1;
    console.log("xLogOut: " + myCounter);
};

export let inHomeControllerGet = async (req, res) => {
    //router.get('/:maNummer', async(req, res)=> {

        console.log("bin im inHomeRoute.mjs - GET")

    const auth1 = req.headers.authorization;
    // console.log("was ist das: "+req.headers)
    // console.log("was ist das: "+req.headers.toString())
    // console.log("was ist das req.body: "+req.body)
    // console.log("req: " + req.query)
    // console.log("pathname authentificateUser: " + req.path)
    // console.log("auth: "+auth1)
    // console.log("req.json: "+req.json)
    //
    // console.log("userEingeloggtArray.length: "+userEingeloggtArray.length)
    // console.log("userEingeloggtArray[0]: "+JSON.stringify(userEingeloggtArray[0]))
    // console.log("pathname JSON.stringifyauthentificateUser: " + JSON.stringify(req.path))

    const nachURLDoppelpunktArr = req.path.split(':');
    let gesplittetVonURLabDoppelpunkt = nachURLDoppelpunktArr[1];

    const gesplittetVonURLabDoppelpunktmitStern = gesplittetVonURLabDoppelpunkt.split('*');

    let maNummerURLAngemeldet = gesplittetVonURLabDoppelpunktmitStern[0];
    let passwortURLAngemeldet = gesplittetVonURLabDoppelpunktmitStern[1];

    let foundImEingeloggt = userEingeloggtArray.find(x => (x.MaNummer_D === maNummerURLAngemeldet && x.Passwort_D===passwortURLAngemeldet))
    //let foundImEingeloggt = userEingeloggtArray.find(userE =>({from, to}) => from.includes(userE.MaNummer_D = maNummerURL) && to.includes(userE.Passwort_D = passwortURL));

    if(foundImEingeloggt===undefined||foundImEingeloggt.MaNummer_D.length===0 || foundImEingeloggt.MaNummer_D === undefined
        || foundImEingeloggt.Passwort_D.length===0 || foundImEingeloggt.Passwort_D === undefined){
        console.log("etwas ist schief gelaufen, wenn es bis nach hier kommt")
        res.send("OHA.....");
    } else if(foundImEingeloggt.RolleUser_D==="Admin"){
        // achtung, wenn server neustartet ist user nicht im array!!!!!!
        // einen Button, wo man zur login seite gehen könnte, aber nicht automatisch, möchte fehlermeldung sehen
        //res.send("Bisch Admin");
        res.render('pages/layoutInHomeAdmin', {
            //werIstAngemeldetH:user1.getMa_NummerU()
            /*werIstAngemeldetH:user.getVornameU()+" "+user.getNachnameU(),
            kundeIHServer:  "hoi kunde",
            MaNummerServer: user.getMa_NummerU()*/
            werIstAngemeldetH: foundImEingeloggt.MaNummer_D + " " + foundImEingeloggt.Vorname_D,
            kundeIHServer: "hoi kunde",
            MaNummerServer: foundImEingeloggt.MaNummer_D
        });
    } else if(foundImEingeloggt.RolleUser_D==="Chef" || foundImEingeloggt.RolleUser_D==="Mitarbeiter"){
        // achtung, wenn server neustartet ist user nicht im array!!!!!!
        // einen Button, wo man zur login seite gehen könnte, aber nicht automatisch, möchte fehlermeldung sehen
        //res.send("Bisch Chef oder Mitarbeiter");
        res.render('pages/layoutInHomeUser', {
            //werIstAngemeldetH:user1.getMa_NummerU()
            /*werIstAngemeldetH:user.getVornameU()+" "+user.getNachnameU(),
            kundeIHServer:  "hoi kunde",
            MaNummerServer: user.getMa_NummerU()*/
            werIstAngemeldetH: foundImEingeloggt.MaNummer_D + " " + foundImEingeloggt.Vorname_D,
            kundeIHServer: "hoi kunde",
            MaNummerServer: foundImEingeloggt.MaNummer_D
        });
    }








        // res.render('pages/layoutInHomeUser', {
        //     //werIstAngemeldetH:user1.getMa_NummerU()
        //     /*werIstAngemeldetH:user.getVornameU()+" "+user.getNachnameU(),
        //     kundeIHServer:  "hoi kunde",
        //     MaNummerServer: user.getMa_NummerU()*/
        //     werIstAngemeldetH: myArr1[0] + " " + myArr1[1],
        //     kundeIHServer: "hoi kunde",
        //     MaNummerServer: myArr1[0]
        // });
    };

export let inHomeControllerDelete = async (req, res) => {

    console.log("bin im inHomeRoute.mjs - DELETE --------------------------------------------------------------------uerhdsui")

    console.log("inHomeRoute.mjs req.session: "+JSON.stringify(req.session));

    const myArra = req.path.split(':');
    let gesplittetVonURLdenUserTeilDelete = myArra[1];
       console.log("inHomeRoute.mjs gesplittetVonURLdenUserTeilDelete: " + gesplittetVonURLdenUserTeilDelete)

    console.log("inHomeRoute.mjs gesplittetVonURLdenUserTeiiiilDelete: " + gesplittetVonURLdenUserTeilDelete)
    const myArr11 = gesplittetVonURLdenUserTeilDelete.split('*');
    console.log("inHomeRoute.mjs gesplittet myArr1[0]: " + myArr11[0] + "inHomeRoute.mjs gesplittet myArr1[1]: " + myArr11[1]);

    let maNummerURLdelete = myArr11[0];
    let passwortURLdelete = myArr11[1];

    console.log("maNummerURLdelete: " + maNummerURLdelete);
    console.log("passwortURLdelete: "+passwortURLdelete)

    // let foundImEingeloggtDelete = userEingeloggtArray.find(userE =>({from, to}) => from.includes(userE.MaNummer_D = maNummerURL) && to.includes(userE.Passwort_D = passwortURL));
    // console.log("foundImEingeloggtDelete: "+JSON.stringify(foundImEingeloggtDelete));
    //
     console.log("userarrax.length vor delete: "+userEingeloggtArray.length)
    //delete user im array
    //userEingeloggtArray = userEingeloggtArray.slice(0, foundImEingeloggtDelete).concat(userEingeloggtArray.slice(-foundImEingeloggtDelete));
   // console.log("userarrax.length nach del: "+userEingeloggtArray.length)



    const myArray = [1, 2, 3, 4, 5];
    console.log(`myArray values: ${myArray}`);
    console.log(`myArray.length vor delete: `+myArray.length);

    function removeValue(value, index, arr) {
        // If the value at the current array index matches the specified value (2)
        if (value === 3) {
            // Removes the value from the original array
            arr.splice(index, 1);
            return true;
        }
        return false;
    }

// Pass the removeValue function into the filter function to return the specified value
    const x = myArray.filter(removeValue);

    console.log(`myArray values: ${myArray}`);
    console.log(`myArray.length nach del: `+myArray.length);
    console.log(`variable x value: ${x}`);

    console.log("userEingeloggtArray.length "+userEingeloggtArray.length)   // 2
    console.log("userEingeloggtArray.toString() "+userEingeloggtArray.toString()) // [object Object],[object Object]
    console.log("JSON.stringify(userEingeloggtArray) "+JSON.stringify(userEingeloggtArray))

    let foundImEingeloggt = userEingeloggtArray.find(userE =>({from, to}) => from.includes(userE.MaNummer_D = maNummerURLdelete) && to.includes(userE.Passwort_D = passwortURLdelete));
    console.log("foundImEingeloggt: "+JSON.stringify(foundImEingeloggt));

   // var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    for( let i = 0; i < userEingeloggtArray.length; i++){

        if ( userEingeloggtArray[i] === foundImEingeloggt) {

            userEingeloggtArray.splice(i, 1);
        }

    }
    console.log("JSON.stringify(userEingeloggtArray) nach del "+JSON.stringify(userEingeloggtArray))
    //=> [1, 2, 3, 4, 6, 7, 8, 9, 0]

// Pass the removeValue function into the filter function to return the specified value
    //const xw = userEingeloggtArray.filter(removeValue1(foundImEingeloggt));

   // console.log(`myArray values: ${userEingeloggtArray}`);
    console.log(`myArray.length nach del: `+userEingeloggtArray.length);
    //console.log(`variable x value: ${xw}`);




    //var list = ["bar", "baz", "foo", "qux"];

    //list.splice(0, 2);
    // Starting at index position 0, remove two elements ["bar", "baz"] and retains ["foo", "qux"].

    res.redirect('/api/v1/login2');
    // res.render('pages/login', {
    //
    // });
};

export let inHomeControllerPost = async (req, res) => {
    console.log("bin im inHomeRoute.mjs - POST")
    res.send('hallllllloo Post');
};
export default {inHomeControllerGet, inHomeControllerDelete,inHomeControllerPost};