export function splitDB_DBObj(ausgabeDBZumSplitten){
    //console.log("bin splitDB_DBObj")

    //let text = "[{"ID_User":8,"MA_Nummer":"70999","Vorname":"urs","Nachname":"meier","Passwort_User":"12","IstChef":"keinChef"}]";
    let myArray = ausgabeDBZumSplitten.split("[");
    // console.log("arr: "+myArray[1]);
    const myArray1 = myArray[1].split("]");

    //wenn mehrere manummern vorhanden
    const myArray3 = myArray1[0].split(",{");
    const dbObj = JSON.parse(myArray3[0]);

    return dbObj;
}

export default splitDB_DBObj;








//------------------------------------------ALT--------------------------------------------------------
// export function splitDB_DBObj(ausgabeDBZumSplitten){
//     //console.log("bin splitDB_DBObj")
//
//     //let ausgabeDBZumSplitten = ausgabeDBZumSplitten;
//     //console.log("ausgabeDBZumSplitten: "+ausgabeDBZumSplitten);
//     //let text = "[{"ID_User":8,"MA_Nummer":"70999","Vorname":"urs","Nachname":"meier","Passwort_User":"12","IstChef":"keinChef"}]";
//     //const myArray = [];
//     let myArray = ausgabeDBZumSplitten.split("[");
//     // console.log("arr: "+myArray[1]);
//     const myArray1 = myArray[1].split("]");
//     //todo ev gibt es eine funktion, die beide eckigen klammmern entfernt
//     // console.log("ar2: "+myArray1[0]);
//
//     //wenn mehrere manummern vorhanden
//     const myArray3 = myArray1[0].split(",{");
//     // console.log("ar3: "+myArray3[0])
//     //if()
//
//     const dbObj = JSON.parse(myArray3[0]);
//
//     //console.log("dbObj in splitDB_DBObj: "+dbObj)
//     //console.log(dbObj.MA_Nummer);
//
//     return dbObj;
//     //todo: setter und getter, ev eigene Klasse
// }
//
// export default splitDB_DBObj;