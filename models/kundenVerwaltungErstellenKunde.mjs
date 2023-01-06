import poolDB from "../utils/db.mjs";

export default async  function schreibeInDBKundenErstellen(neuKundenErfasstDatumClient, neuKundenNameClient, neuKundenNummerClient, neuKundenOrtClient, neuKundenAdresseClient, neuKundenLandClient){
    console.log('bin schreibeInDBKundenErstellen: ');

    let conn;
    try {
        conn = await poolDB.getConnection();
        const res = await conn.query("INSERT INTO kundeMubea (ErfasstK, KundeK, KundenNummer, OrtK, AdresseK, LandK) VALUES (?,?,?,?,?,?)", [neuKundenErfasstDatumClient, neuKundenNameClient, neuKundenNummerClient, neuKundenOrtClient, neuKundenAdresseClient, neuKundenLandClient]);
        conn.end();
    } catch (err) {
        console.log("DB-Error..........")
        throw err;
    }
}