import router from "../routes/login2Route.mjs";
import CryptoJS from "crypto-js";
import pooool from "../lib/db.mjs";
import sucheInDBmaNummer from "../models/loginMaNummerPasswortDB.mjs";

let maNummerLEingabeClient;
let passwortLEingabeClient;

export let loginControllerGet = (req, res) => {
        maNummerLEingabeClient = req.body.maNummerLEingabe;
        passwortLEingabeClient = req.body.passwortLEingabe;

        res.render('pages/login', {
            maNummerLServer : maNummerLEingabeClient,
            passwortLServer : passwortLEingabeClient,
            xClicker: clicker()     // test mit einer Funktion namens clicker()....
        });
};
//----POST-Down-------------------------------------------------------------------------

let person;
var userArr33;
let name1 = "hallo"
export { name1};
//export { userArr33};
let maNummerLClient;
let passwortLClient;
export let loginControllerPost = async(req, res)=>{
    let isMa_NummerInDB = false;
    let isPasswortUserInDB = false;
    console.log("bin Post -----------------------------------------------------")
    //werIstAngemeldet12= req.body.werIstAngemeldetH;
    maNummerLClient = req.body.maNummerLEingabe;
    //maNummerL = "haaannnnssoooo"
    console.log("maaaaNummerL: "+maNummerLClient)
    passwortLClient = req.body.passwortLEingabe;
    console.log("paaaaasswortL: "+passwortLClient)


   // console.log("cheeeeeck- MaNummer: "+ await checkMaNummer(maNummerL));

    isMa_NummerInDB = await checkMaNummer(maNummerLClient);
 //   console.log("isMa_NummerInDB: "+isMa_NummerInDB);

    //  isPasswortUserInDB = await checkPasswort(maNummerL,encryptedString);//
    //  console.log("isPasswortInDB: "+isPasswortUserInDB);

    if(isMa_NummerInDB===true && isPasswortUserInDB===false){

        //res.redirect('/api/inHome');
        res.render('pages/login',{
            maNummerLServer : "MA_Nummer IN db GEFUNDEN :)",
            passwortLServer : "pw leer oder falsch",
            xClicker: clicker()
        });
    }else if(isMa_NummerInDB===false&&isPasswortUserInDB===false){
        res.render('pages/login',{
            maNummerLServer : "MA_Nummer gibt es nicht in DB :(",
            passwortLServer : "pw ist falsch oder leer",
            xClicker: clicker()
        });
    }else if(isMa_NummerInDB===true&&isPasswortUserInDB===false){
        res.render('pages/login',{
            maNummerLServer : "MA_Nummer gefunden :)",
            passwortLServer : "Passwort ist falsch :(",
            xClicker: clicker()
        });
    }else if(isMa_NummerInDB===true&&isPasswortUserInDB===true){
        console.log("isMa_NummerInDB und isPasswortUserInDB sind true");
        console.log("encryptedString: "+encryptedString)


        console.log("//////////////////////////////////////////////////////////////////////////////////////");

        res.redirect('/api/v1/inHome/:'+entries+" "+propertyValues);

        /*
        res.redirect('/api/v1/inHome/:',({
            pathname:"/",
            query: {
                "a": 1,
                "b": 2,
                "valid":"your string here"
            }
        }));
         */
        //res.redirect('/api/v1/inHome/:'+uuu11.getID());//
        //res.redirect('/api/v1/inHome/:'+uuu11);
        /*
        res.render('pages/inHome',{

        });
         */
    }
    //funktioniert
    //res.redirect('/api/inHome');
};



//----POST-UP-------------------------------------------------------------------------


let myCounter = 0;
function clicker() {
    myCounter = myCounter +1;
    console.log("Button Working! ich bin loginRoute.mjs, myCounter: " + myCounter);
};
//----------------------------------------------------------------------------------

async function sucheInDBmaNummerPasswort(maNummerLClient,passwort){
    console.log('bin sucheInDBmaNummerPasswort-Funktion, habe bekommen: '+maNummer+', '+passwort);

    let conn;
    let jsonS;
    try {
        //counterDB = counterDB + 1;
        console.log("counterDB: "+counterDB);
        conn = await poolDB.getConnection();
        //console.log("conn: "+conn);//[object object]
        const rows = await conn.query(`SELECT * FROM userVerkaufMubea WHERE MA_Nummer=`+maNummer+` AND Passwort_User = '`+passwort+`';`);
        //console.log(rows); //[ {val: 1}, meta: ... ]
        jsonS = JSON.stringify(rows);
        console.log("sucheInDBmaNummer-Funktion-jsonS: "+jsonS)
        //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
        //res.send(jsonS)
        return jsonS;
    } catch (err) {
        console.log("DB-Error, irgendwas ist passiert, weil connection limit auf 8??? max 150??? ")
        throw err;
    } finally {
        if (conn) return conn.end();
    }

}



export async function erstelleUser(maNummerLClient, passwortL){
    console.log("Bin erstelle User, habe bekommen: "+maNummerLClient+", "+passwortL)
    let ausgabeDB = "";
    ausgabeDB = await sucheInDBmaNummerPasswort(maNummerLClient, passwortL);
    //User.id1=0;

    let u1 = new User();
    console.log("-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-*-*");
    //console.log(u1.Id)
    //console.log(u1.id1)
    console.log(u1.getID());
    console.log("-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-*-*");
    u1.setMa_NummerU(splitDB_DBObj(ausgabeDB).MA_Nummer);
    u1.setVornameU(splitDB_DBObj(ausgabeDB).Vorname);
    u1.setNachnameU(splitDB_DBObj(ausgabeDB).Nachname);
    u1.setPasswortU(splitDB_DBObj(ausgabeDB).Passwort_User);
    u1.setIstChefU(splitDB_DBObj(ausgabeDB).IstChef);

    console.log("U1--MaNummer:   "+ u1.getMa_NummerU())
    console.log("U1--Vorname:   "+ u1.getVornameU())
    console.log("U1--Nachname:   "+ u1.getNachnameU())
    console.log("U1--Passwort:   "+ u1.getPasswortU())
    console.log("U1--istChef:   "+ u1.getIstChefU())
    console.log("u1--"+u1)
    return u1;
}



//todo wenn ma_nummer zweimal vorkommt???? und getconnection-problem!!!!
async function checkPasswort(maNummer,passwort){
    console.log("bin checkPasswort-Funktion, habe bekommen: "+maNummer+', '+passwort);
    let isPasswort = false;
    let ausgabeDB = "";
    ausgabeDB = await sucheInDBmaNummerPasswort(maNummer, passwort);//das geht nicht
    console.log("ausgabeDB: Wenn Mehrmals???????: "+ausgabeDB)
    if(ausgabeDB==='[]'||ausgabeDB===undefined){//wenn manummer mehrmals????
        // console.log("ausgabeDB ist leeeeer!!!! sowas existiert nicht in der DB!!");
        //console.log("Diese Passwort ist falsch!!!");
        isPasswort= false;
    }else{
        //console.log('AusgabeDB ist voll, hat was gefunden :)');
        splitDB_DBObj(ausgabeDB);
        /// console.log(splitDB_DBObj(ausgabeDB))
        //let u1 = new User("x","x","x","x","x");
        /*
        let u1 = new User();
        u1.setMa_NummerU(splitDB_DBObj(ausgabeDB).MA_Nummer);
        u1.setVornameU(splitDB_DBObj(ausgabeDB).Vorname);
        u1.setNachnameU(splitDB_DBObj(ausgabeDB).Nachname);
        u1.setPasswortU(splitDB_DBObj(ausgabeDB).Passwort_User);
        u1.setIstChefU(splitDB_DBObj(ausgabeDB).IstChef);
        console.log("U1-MaNummer:   "+ u1.getMa_NummerU())
        console.log("U1-Vorname:   "+ u1.getVornameU())
        console.log("U1-Nachname:   "+ u1.getNachnameU())
        console.log("U1-Passwort:   "+ u1.getPasswortU())
        console.log("U1-istChef:   "+ u1.getIstChefU())
        //console.log("oo2: "+splitDB_DBObj(ausgabeDB).MA_Nummer)
         */
        isPasswort = true;
    }
    return isPasswort;
}

async function checkMaNummer(maNummer){
    console.log("bin checkMaNummer-Funktion, habe bekommen: "+maNummer);
    let isMaNummer = false;
    let ausgabeDB = "";
    ausgabeDB = await sucheInDBmaNummer(maNummer);//das geht nicht
    console.log("***********************ausgabeDB: "+ausgabeDB)
    if(ausgabeDB==='[]'||ausgabeDB===undefined){//wenn manummer mehrmals????
        console.log("ausgabeDB ist leeeeer!!!! sowas existiert nicht in der DB!!");
        console.log("Diese MitarbeiterNummer gibt es nicht in der Datenbank!!!");
        isMaNummer= false;
    }else{
        console.log('AusgabeDB ist voll, hat was gefunden :)');
        splitDB_DBObj(ausgabeDB);
        /// console.log(splitDB_DBObj(ausgabeDB))
        //let u1 = new User("x","x","x","x","x");
        /*
        let u1 = new User();
        u1.setMa_NummerU(splitDB_DBObj(ausgabeDB).MA_Nummer);
        u1.setVornameU(splitDB_DBObj(ausgabeDB).Vorname);
        u1.setNachnameU(splitDB_DBObj(ausgabeDB).Nachname);
        u1.setPasswortU(splitDB_DBObj(ausgabeDB).Passwort_User);
        u1.setIstChefU(splitDB_DBObj(ausgabeDB).IstChef);
        console.log("U1-MaNummer:   "+ u1.getMa_NummerU())
        console.log("U1-Vorname:   "+ u1.getVornameU())
        console.log("U1-Nachname:   "+ u1.getNachnameU())
        console.log("U1-Passwort:   "+ u1.getPasswortU())
        console.log("U1-istChef:   "+ u1.getIstChefU())
        //console.log("oo2: "+splitDB_DBObj(ausgabeDB).MA_Nummer)
        */
        isMaNummer = true;
    }
    /*
     if(maNummer==="70220" && passwort==="q"){
         isMaNummerPasswort = true;
         console.log(isMaNummerPasswort)
     }else{
         isMaNummerPasswort= false;
     }
     */
    ausgabeDB = "";
    return isMaNummer;
}

function splitDB_DBObj(ausgabeDBZumSplitten){
    //let ausgabeDBZumSplitten = ausgabeDBZumSplitten;
    //console.log("ausgabeDBZumSplitten: "+ausgabeDBZumSplitten);
    //let text = "[{"ID_User":8,"MA_Nummer":"70999","Vorname":"urs","Nachname":"meier","Passwort_User":"12","IstChef":"keinChef"}]";
    //const myArray = [];
    let myArray = ausgabeDBZumSplitten.split("[");
    // console.log("arr: "+myArray[1]);
    const myArray1 = myArray[1].split("]");
    //todo ev gibt es eine funktion, die beide eckigen klammmern entfernt
    // console.log("ar2: "+myArray1[0]);

    //wenn mehrere manummern vorhanden
    const myArray3 = myArray1[0].split(",{");
    // console.log("ar3: "+myArray3[0])
    //if()

    const dbObj = JSON.parse(myArray3[0]);

    //console.log("dbObj in splitDB_DBObj: "+dbObj)
    //console.log(dbObj.MA_Nummer);

    return dbObj;
    //todo: setter und getter, ev eigene Klasse
}
//export default userArr;
//export default {router, userArr};
export { userArr33};
//export default router;
/*
 router.post('/l', async(req,res) =>{//achtung, es muss hier async sein sonst geht nivcht
   let conn;
   try{
       conn = await dbPool.getConnection();
       const rows = await conn.query(`SELECT * FROM userVerkaufMubea WHERE MA_Nummer=`+"70999"+`;`);
       //console.log(rows);
       const jsonS = JSON.stringify(rows);
       console.log("jsonSss: "+jsonS)
       res.writeHead(200, {'Content-Type': 'text/html'});
       res.end(jsonS);
   }
   catch(e){
   }
 })
*/

//export default loginControllerGet;
//module.exports = loginControllerGet;
export default {loginControllerGet, loginControllerPost};
//export default {loginControllerGet, loginControllerPost};