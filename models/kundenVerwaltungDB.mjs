import poolDB from "../utils/db.mjs";

let counterDB = 0;
export async  function sucheInDBKunden(){
      console.log('bin MODEL sucheInDBmaNummer-Funktion, habe bekommen: ');

    let conn;
    let jsonS;


    try {
        counterDB = counterDB + 1;
        conn = await poolDB.getConnection();
        const res = await conn.query("SELECT  *  FROM kundeMubea");
        jsonS = JSON.stringify(res);
        console.log("SQL-Text: "+jsonS)
        //    console.log("counterDB: "+counterDB);
        conn.end();
        return res;
        //return jsonS;
    } catch (err) {
        console.log("DB-Error..........")
        throw err;
    }
}




//----------------------------------------ALT---------------------------------------------------
// import poolDB from "../utils/db.mjs";
//
// let counterDB = 0;
// export async  function sucheInDBKunden(){
//     console.log('bin MODEL sucheInDBmaNummer-Funktion, habe bekommen: ');
//
//     let conn;
//     let jsonS;
//
//     let sqlCommand;
//
//     try {
//         counterDB = counterDB + 1;
//         conn = await poolDB.getConnection();
//         let sql ;
//         const res = await conn.query("SELECT  *  FROM kundeMubea");
//         //conn.end();
//         jsonS = JSON.stringify(res);
//         //console.log("SQL-Text: "+jsonS)
//         //    console.log("counterDB: "+counterDB);//////
//         conn.end();
//         return res;
//         //return jsonS;
//
//     } catch (err) {
//         console.log("DB-Error..........")
//         throw err;
//     }
// }