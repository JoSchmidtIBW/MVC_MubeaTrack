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
     //   console.log("inHomeRoute.mjs req: " + JSON.stringify(req.query))
     //   console.log("inHomeRoute.mjs pathname inHomeController: " + req.path)
    //    console.log("inHomeRoute.mjs req.session: "+JSON.stringify(req.session));

        const myArr = req.path.split(':');
        let gesplittetVonURLdenUserTeil = myArr[1];
     //   console.log("inHomeRoute.mjs gesplittetVonURLdenUserTeil: " + gesplittetVonURLdenUserTeil)




       // console.log("inHomeRoute.mjs gesplittetVonURLdenUserTeiiiil: " + gesplittetVonURLdenUserTeil)
        const myArr1 = gesplittetVonURLdenUserTeil.split('*');
      //  console.log("inHomeRoute.mjs gesplittet myArr1[0]: " + myArr1[0] + "inHomeRoute.mjs gesplittet myArr1[1]: " + myArr1[1]);


        res.render('pages/layoutInHomeUser', {
            //werIstAngemeldetH:user1.getMa_NummerU()
            /*werIstAngemeldetH:user.getVornameU()+" "+user.getNachnameU(),
            kundeIHServer:  "hoi kunde",
            MaNummerServer: user.getMa_NummerU()*/
            werIstAngemeldetH: myArr1[0] + " " + myArr1[1],
            kundeIHServer: "hoi kunde",
            MaNummerServer: myArr1[0]
        });
    };

export let inHomeControllerDelete = async (req, res) => {

    console.log("bin im inHomeRoute.mjs - DELETE --------------------------------------------------------------------uerhdsui")

    console.log("inHomeRoute.mjs req.session: "+JSON.stringify(req.session));

    // const myArr = req.path.split(':');
    // let gesplittetVonURLdenUserTeil = myArr[1];
    // console.log("inHomeRoute.mjs gesplittetVonURLdenUserTeil: " + gesplittetVonURLdenUserTeil)
    //
    // console.log("inHomeRoute.mjs gesplittetVonURLdenUserTeiiiil: " + gesplittetVonURLdenUserTeil)
    // const myArr1 = gesplittetVonURLdenUserTeil.split('*');
    // console.log("inHomeRoute.mjs gesplittet myArr1[0]: " + myArr1[0] + "inHomeRoute.mjs gesplittet myArr1[1]: " + myArr1[1]);
    //
    // let maNummerURL = myArr1[0];
    // let passwortURL = myArr1[1];
    //
    // console.log("maNummerURL: " + maNummerURL);
    // console.log("passwortURL: "+passwortURL)
    //
    // let foundImEingeloggt = userEingeloggtArray.find(userE =>({from, to}) => from.includes(userE.MaNummer_D = maNummerURL) && to.includes(userE.Passwort_D = passwortURL));
    // console.log("foundImEingeloggt: "+JSON.stringify(foundImEingeloggt));
    //
    // //delete user im array
    // userEingeloggtArray = userEingeloggtArray.slice(0, foundImEingeloggt).concat(someArray.slice(-foundImEingeloggt));
    // console.log("userarrax.length: "+userEingeloggtArray.length)

    res.redirect('/api/v1/login2');
    // res.render('pages/login', {
    //
    // });
};

export default {inHomeControllerGet, inHomeControllerDelete};