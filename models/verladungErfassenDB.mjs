import poolDB from "../utils/db.mjs";

export default async  function schreibeInDBErstellteVerladung(vorName, nachName, datum, Zeit, datumWunschKalender, parseIntParseID_Kdata, mengeTO, artikelAL, lsILS, r_K, artikelNProd){
    console.log('bin schreibeInDBErstellteVerladung: ');

    let conn;
    try {
        conn = await poolDB.getConnection();
        const res = await conn.query("INSERT INTO versandlisteMubea (VnameE, NnameE, DatumE, UhrzeitE, WunschDatum, ID_KV, MengeTo, ArtikelAnLager, LSimLeitsystem, R_K, ArtikelNichtProd) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [vorName, nachName, datum, Zeit, datumWunschKalender, parseIntParseID_Kdata, mengeTO, artikelAL, lsILS, r_K,artikelNProd]);
        conn.end();
    } catch (err) {
        console.log("DB-Error..........")
        throw err;
    }
}

export async function sucheInDBKundeMitKundenNummer(kundenNummerAusgewaelt){
    let conn;
    let jsonS
    try {
        conn = await poolDB.getConnection();
        const res = await conn.query("SELECT ID_K FROM kundeMubea WHERE KundenNummer = (?)", [kundenNummerAusgewaelt]);
        jsonS = JSON.stringify(res);
        console.log("SQL-Text: "+jsonS)
        conn.end();

        return res;
    } catch (err) {
        console.log("DB-Error..........")
        throw err;
    }
}