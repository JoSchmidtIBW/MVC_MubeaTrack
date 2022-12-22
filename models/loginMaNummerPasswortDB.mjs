import poolDB from "../utils/db.mjs";
import pooool from "../lib/db.mjs";
import {loginControllerGet, loginControllerPost} from "../controllers/login2Controller.mjs";


let counterDB = 0;
export async  function sucheInDBmaNummer(maNummerLClient){
    console.log('bin MODEL sucheInDBmaNummer-Funktion, habe bekommen: '+maNummerLClient);

    let conn;
    let jsonS;
    /*
    try {
        counterDB = counterDB + 1;
        console.log("counterDB: "+counterDB);
        conn = await poolDB.getConnection();
        //console.log("conn: "+conn);//[object object]
        const rows = await conn.query(`SELECT * FROM userVerkaufMubea WHERE MA_Nummer=`+maNummer+`;`);
        //console.log(rows); //[ {val: 1}, meta: ... ]
         jsonS = JSON.stringify(rows);
        console.log("sucheInDBmaNummer-Funktion-jsonS: "+jsonS)
        //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
        //res.send(jsonS)
        //conn.end();
        return jsonS;
    } catch (err) {
        console.log("DB-Error, irgendwas ist passiert, weil connection limit auf 8??? max 150??? ")
        throw err;
    } finally {
        if (conn){
            console.log("irgendwas geht nicht.... schon wieder connection-limit....")
            return conn.end();
        }
    }
*/
/*
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
   */

    // const sqlInsert = ("INSERT INTO subscribers(email) VALUES ?")
    // const sqlInsert = ("INSERT INTO subscribers(email) VALUES (?)")
    // const values=[
    //     "test value"
    // ]
    let sqlCommand;

//todo har neuen fehler, wenn statt nummer ein buchstabe eingibt...
    //Connection Pools with MariaDB Connector/Node.js (Promise API)
    try {
        counterDB = counterDB + 1;
        conn = await poolDB.getConnection();
        let sql ;
       // sql = '"`SELECT * FROM userVerkaufMubea WHERE MA_Nummer= `'+ maNummerLClient + ';"';
       // sql = '"`SELECT * FROM userVerkaufMubea WHERE MA_Nummer= `'+ maNummerLClient + ';"';
       // var sql = 'SELECT * FROM userVerkaufMubea WHERE MA_Nummer='+ maNummerLClient+';';

      //  sqlCommand.CommandText = "SELECT * FROM userVerkaufMubea WHERE MA_Nummer = @Name;";
       // sqlCommand.Parameters.AddWithValue("@Name", "%" + maNummerLClient + "%");
      //  sql = "SELECT * FROM userVerkaufMubea WHERE MA_Nummer = @Name;";
      //  sql .Parameters.AddWithValue("@Name", "%" + maNummerLClient + "%");
        //console.log("sqlCommand.CommandText: "+sqlCommand)
//`SELECT * FROM userVerkaufMubea WHERE MA_Nummer=`+maNummer+`;`;//"SELECT id,username,email,role FROM USERS";
        //let sql = "'SELECT * FROM userVerkaufMubea WHERE MA_Nummer=70220;'";//';'+maNummerLClient+';';
        // const rows = await conn.query(sql);                               '" + convID + "'    '$name'
        //const rows = await conn.query("'SELECT * FROM userVerkaufMubea WHERE MA_Nummer='"+maNummer+"';'");
        // const rows = await conn.query("SELECT * FROM userVerkaufMubea WHERE MA_Nummer="+maNummer+";");
        //const rows = await conn.query(`SELECT * FROM userVerkaufMubea WHERE MA_Nummer=`+${maNummer}+`;`);
        // const rows = await conn.query("`SELECT * FROM userVerkaufMubea WHERE MA_Nummer=`'+maNummer+'`;`");
        //let sql = '`SELECT * FROM userVerkaufMubea WHERE MA_Nummer= `'+maNummer+'`;`';// ab hier wieder getconnection probleme
        //let sql = "'SELECT * FROM userVerkaufMubea WHERE MA_Nummer= '"+maNummer+"';'";
        //let sql = "SELECT * FROM userVerkaufMubea WHERE MA_Nummer= "+maNummer+"';'";
        //let sql = `SELECT * FROM ?? ORDER BY ??`;
        // const values = ['userVerkaufMubea', maNummer];
        //let sql = `'SELECT * FROM userVerkaufMubea WHERE MA_Nummer=  '`+maNummer+`';'`;
        //let sql = `SELECT * FROM userVerkaufMubea WHERE MA_Nummer=`+maNummerLClient+`;`;
        //const rows = await conn.query(sql);
        const res = await conn.query("SELECT * FROM userVerkaufMubea WHERE MA_Nummer = (?)", [maNummerLClient]);
        //conn.end();
        jsonS = JSON.stringify(res);
        console.log("SQL-Text: "+jsonS)
        console.log("counterDB: "+counterDB);//////
        conn.end();
        return jsonS;

    } catch (err) {
        console.log("DB-Error..........")
        throw err;
    }
}

export async function sucheInDBmaNummerPasswort(maNummerLClient,encryptedStringPasswortLClient){
    console.log('bin sucheInDBmaNummerPasswort-Funktion, habe bekommen: '+maNummerLClient+', '+encryptedStringPasswortLClient);

    let conn;
    let jsonS;
    // try {
    //     counterDB = counterDB + 1;
    //     console.log("counterDB: "+counterDB);
    //     conn = await poolDB.getConnection();
    //     //console.log("conn: "+conn);//[object object]
    //     const rows = await conn.query(`SELECT * FROM userVerkaufMubea WHERE MA_Nummer=`+maNummerLClient+` AND Passwort_User = '`+encryptedStringPasswortLClient+`';`);
    //     //console.log(rows); //[ {val: 1}, meta: ... ]
    //     jsonS = JSON.stringify(rows);
    //     console.log("sucheInDBmaNummer-Funktion-jsonS: "+jsonS)
    //     //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    //     //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    //     //res.send(jsonS)
    //     return jsonS;
    // } catch (err) {
    //     console.log("DB-Error, irgendwas ist passiert, weil connection limit auf 8??? max 150??? ")
    //     throw err;
    // } finally {
    //     if (conn) return conn.end();
    // }
    try {
        counterDB = counterDB + 1;
        conn = await poolDB.getConnection();
        let sql ;
        // sql = '"`SELECT * FROM userVerkaufMubea WHERE MA_Nummer= `'+ maNummerLClient + ';"';
        // sql = '"`SELECT * FROM userVerkaufMubea WHERE MA_Nummer= `'+ maNummerLClient + ';"';
        // var sql = 'SELECT * FROM userVerkaufMubea WHERE MA_Nummer='+ maNummerLClient+';';

        //  sqlCommand.CommandText = "SELECT * FROM userVerkaufMubea WHERE MA_Nummer = @Name;";
        // sqlCommand.Parameters.AddWithValue("@Name", "%" + maNummerLClient + "%");
        //  sql = "SELECT * FROM userVerkaufMubea WHERE MA_Nummer = @Name;";
        //  sql .Parameters.AddWithValue("@Name", "%" + maNummerLClient + "%");
        //console.log("sqlCommand.CommandText: "+sqlCommand)
//`SELECT * FROM userVerkaufMubea WHERE MA_Nummer=`+maNummer+`;`;//"SELECT id,username,email,role FROM USERS";
        //let sql = "'SELECT * FROM userVerkaufMubea WHERE MA_Nummer=70220;'";//';'+maNummerLClient+';';
        // const rows = await conn.query(sql);                               '" + convID + "'    '$name'
        //const rows = await conn.query("'SELECT * FROM userVerkaufMubea WHERE MA_Nummer='"+maNummer+"';'");
        // const rows = await conn.query("SELECT * FROM userVerkaufMubea WHERE MA_Nummer="+maNummer+";");
        //const rows = await conn.query(`SELECT * FROM userVerkaufMubea WHERE MA_Nummer=`+${maNummer}+`;`);
        // const rows = await conn.query("`SELECT * FROM userVerkaufMubea WHERE MA_Nummer=`'+maNummer+'`;`");
        //let sql = '`SELECT * FROM userVerkaufMubea WHERE MA_Nummer= `'+maNummer+'`;`';// ab hier wieder getconnection probleme
        //let sql = "'SELECT * FROM userVerkaufMubea WHERE MA_Nummer= '"+maNummer+"';'";
        //let sql = "SELECT * FROM userVerkaufMubea WHERE MA_Nummer= "+maNummer+"';'";
        //let sql = `SELECT * FROM ?? ORDER BY ??`;
        // const values = ['userVerkaufMubea', maNummer];
        //let sql = `'SELECT * FROM userVerkaufMubea WHERE MA_Nummer=  '`+maNummer+`';'`;
        //let sql = `SELECT * FROM userVerkaufMubea WHERE MA_Nummer=`+maNummerLClient+`;`;
        //const rows = await conn.query(sql);//   encryptedStringPasswortLClient
        //const res = await conn.query("SELECT * FROM userVerkaufMubea WHERE MA_Nummer = (?)", [maNummerLClient]);
        const res = await conn.query("SELECT * FROM userVerkaufMubea WHERE MA_Nummer = (?) AND Passwort_User = (?)", [maNummerLClient,encryptedStringPasswortLClient]);
        //conn.end();
        jsonS = JSON.stringify(res);
        console.log("SQL-Text: "+jsonS)
        console.log("counterDB: "+counterDB);//////
        conn.end();
        return jsonS;

    } catch (err) {
        console.log("DB-Error..........")
        throw err;
    }
}


//export default sucheInDBmaNummer;
export default {sucheInDBmaNummer, sucheInDBmaNummerPasswort};