import poolDB from "../utils/db.mjs";

let counterDB = 0;
export async  function sucheInDBVerladung(){
    console.log('bin MODEL sucheInDBVerladung-Funktion');

    let conn;
    let jsonS;

    let sqlCommand;

    try {
        counterDB = counterDB + 1;
        conn = await poolDB.getConnection();
        let sql ;
        const res = await conn.query("SELECT versandListeMubea.ID_E, versandListeMubea.VnameE, versandListeMubea.NnameE, versandListeMubea.DatumE, versandListeMubea.UhrzeitE, versandListeMubea.WunschDatum, kundeMubea.KundeK, versandListeMubea.MengeTo, versandListeMubea.ArtikelAnLager, versandListeMubea.LSimLeitSystem, versandListeMubea.R_K, versandListeMubea.ArtikelNichtProd FROM versandListeMubea INNER JOIN kundeMubea ON kundeMubea.ID_K=versandListeMubea.ID_KV;");
        //conn.end();
        jsonS = JSON.stringify(res);
        console.log("SQL-Text: "+jsonS)
        //    console.log("counterDB: "+counterDB);//////
        conn.end();
        //return jsonS;
        return res;

    } catch (err) {
        console.log("DB-Error..........")
        throw err;
    }
}