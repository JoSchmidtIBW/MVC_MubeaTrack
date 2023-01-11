import poolDB from "../utils/db.mjs";

let counterDB = 0;
export  async  function sucheInDBKundenBearbeitenKundenIDKundenNummer(kundenID, kundennummer){
    console.log('bin MODEL sucheInDBmaNummer-Funktion, habe bekommen: ');

    let conn;
    let jsonS;


    try {
        counterDB = counterDB + 1;
        conn = await poolDB.getConnection();
        const res = await conn.query("SELECT * FROM kundeMubea WHERE ID_K = (?) AND KundenNummer = (?)", [kundenID,kundennummer]);
        jsonS = JSON.stringify(res);
        console.log("SQL-Text: "+jsonS)
        console.log("counterDB: "+counterDB);
        conn.end();
        //return res;
        return jsonS;
    } catch (err) {
        console.log("DB-Error..........")
        throw err;
    }
}

export async  function schreibeInDBKundenBearbeitet(
    kundenErfasstDatumClient, kundenNameClient, kundenNummerClient, kundenOrtClient, kundenAdresseClient, kundenLandClient, kundenID, kundennummer){
    console.log('bin schreibeInDBKundenBearbeitet: ');

    let conn;
    let jsonS;


    try {
        counterDB = counterDB + 1;
        conn = await poolDB.getConnection();
        const res = await conn.query("UPDATE kundeMubea SET ErfasstK = (?), KundeK = (?), KundenNummer = (?), OrtK = (?), AdresseK = (?), LandK = (?) WHERE ID_K = (?) AND KundenNummer = (?)", [kundenErfasstDatumClient,kundenNameClient,kundenNummerClient,kundenOrtClient,kundenAdresseClient,kundenLandClient,kundenID,kundennummer]);
        //jsonS = JSON.stringify(res);
        //console.log("SQL-Text: "+jsonS)
        //console.log("counterDB: "+counterDB);
        console.log("res: "+res);
        conn.end();
        //return res;
        //return jsonS;
    } catch (err) {
        console.log("DB-Error..........")
        throw err;
    }
}

export async  function loescheInKundeBearbeitet(kundenID, kundennummer){
    console.log('bin loescheInKundeBearbeitet: ');

    let conn;
    let jsonS;

    // ev anstatt löschen, schreibe Kundename = "DELETE", oder es muss erst die andere Liste gelöscht sein
    try {
        counterDB = counterDB + 1;
        conn = await poolDB.getConnection();
        const res = await conn.query("DELETE FROM kundeMubea WHERE ID_K = (?) AND KundenNummer = (?)", [kundenID,kundennummer]);
        //jsonS = JSON.stringify(res);
        //console.log("SQL-Text: "+jsonS)
        //console.log("counterDB: "+counterDB);
        console.log("res: "+res);
        conn.end();
        //return res;
        //return jsonS;
    } catch (err) {
        console.log("DB-Error..........")
        throw err;
    }
}
export default  {sucheInDBKundenBearbeitenKundenIDKundenNummer,schreibeInDBKundenBearbeitet, loescheInKundeBearbeitet}