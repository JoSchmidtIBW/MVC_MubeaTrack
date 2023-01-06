import poolDB from "../utils/db.mjs";

export default async  function schreibeInDBMitarbeiterErstellenden(neuMitarbeiterErfasstDatum,neuMitarbeiterErfasstZeit,neuMitarbeiterMaNummer,neuMitarbeiterVorname,neuMitarbeiterNachname,encryptedNeuMitarbeiterPasswort,neuMitarbeiterRolle,neuMitarbeiterAvatarFarbe){
    console.log('bin schreibeInDBKundenErstellen: ');

    let conn;
    try {
        conn = await poolDB.getConnection();
        const res = await conn.query("INSERT INTO userverkaufMubea (Erfasst_D_U, Erfasst_Z_U, MA_Nummer, Vorname, Nachname, Passwort_User, RolleUser, AvatarFarbe) VALUES (?,?,?,?,?,?,?,?)", [neuMitarbeiterErfasstDatum,neuMitarbeiterErfasstZeit,neuMitarbeiterMaNummer,neuMitarbeiterVorname,neuMitarbeiterNachname,encryptedNeuMitarbeiterPasswort,neuMitarbeiterRolle,neuMitarbeiterAvatarFarbe]);
        conn.end();
    } catch (err) {
        console.log("DB-Error..........")
        throw err;
    }
}