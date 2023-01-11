import poolDB from "../utils/db.mjs";

let counterDB = 0;
export async  function sucheInDBMitarbeiter(){
    console.log('bin MODEL sucheInDBmaNummer-Funktion, habe bekommen: ');

    let conn;
    let jsonS;


    try {
        counterDB = counterDB + 1;
        conn = await poolDB.getConnection();
        const res = await conn.query("SELECT  *  FROM userverkaufMubea");
        jsonS = JSON.stringify(res);
        //console.log("SQL-Text: "+jsonS)
        //    console.log("counterDB: "+counterDB);
        conn.end();
        return res;
        //return jsonS;
    } catch (err) {
        console.log("DB-Error..........")
        throw err;
    }
}