import poolDB from "../utils/db.mjs";

let counterDB = 0;
export  async  function sucheInDBMitarbeiterBearbeitenMaNummerID(maNummer,idMitarbeiter){
    console.log('bin MODEL sucheInDBmaNummer-Funktion, habe bekommen: ');

    let conn;
    let jsonS;


    try {
        counterDB = counterDB + 1;
        conn = await poolDB.getConnection();
        const res = await conn.query("SELECT * FROM userverkaufMubea WHERE MA_Nummer = (?) AND ID_USER = (?)", [maNummer,idMitarbeiter]);
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

export async  function schreibeInDBMitarbeiterBearbeitet(bearbeitetMitarbeiterErfasstDatumClient,bearbeitetMitarbeiterErfasstZeitClient,
                                                         bearbeitetMitarbeiterNummerClient,bearbeitetMitarbeiterVornameClient,bearbeitetMitarbeiterNachnameClient,
                                                         bearbeitetMitarbeiterPasswortXClient,bearbeitetMitarbeiterRolleSelectClient,bearbeitetMitarbeiterAvatarFarbeSelectClient,
                                                         maNummer, idMitarbeiter){
    console.log('bin schreibeInDBKundenBearbeitet: ');

    let conn;
    let jsonS;


    try {
        counterDB = counterDB + 1;
        conn = await poolDB.getConnection();
        const res = await conn.query("UPDATE userverkaufMubea SET Erfasst_D_U = (?), Erfasst_Z_U = (?), MA_Nummer = (?), Vorname = (?), Nachname = (?), Passwort_User = (?), RolleUser = (?), AvatarFarbe = (?) WHERE MA_Nummer = (?) AND ID_User = (?)", [bearbeitetMitarbeiterErfasstDatumClient,bearbeitetMitarbeiterErfasstZeitClient,
            bearbeitetMitarbeiterNummerClient,bearbeitetMitarbeiterVornameClient,bearbeitetMitarbeiterNachnameClient,
            bearbeitetMitarbeiterPasswortXClient,bearbeitetMitarbeiterRolleSelectClient,bearbeitetMitarbeiterAvatarFarbeSelectClient,maNummer, idMitarbeiter]);
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

export async  function loescheInDBMitarbeiterBearbeitet(maNummer, idMitarbeiter){
    console.log('bin loescheInKundeBearbeitet: ');

    let conn;
    let jsonS;

    // ev anstatt löschen, schreibe Kundename = "DELETE", oder es muss erst die andere Liste gelöscht sein
    try {
        counterDB = counterDB + 1;
        conn = await poolDB.getConnection();
        const res = await conn.query("DELETE FROM userverkaufMubea WHERE MA_Nummer = (?) AND ID_User = (?)", [maNummer, idMitarbeiter]);
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
