import express from "express";
import mariaDB from 'mariadb';

const app = express();
const port = process.env.port || 7088;


//setup
app.set("case sensitive routing", false); // um url gross oder klein schreiben link /users   /Users
app.set("view engine", "ejs");


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use( express.static( "./public" ) );




app.get('/', (req, res) => {
    res.send('Hello World!');
});

//------------------------------------------------------------------------------------------------------
//const mariadb = require('mariadb');




const pool = mariaDB.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mubea2020!',
    database: 'mubeaVerkaufDataBase',
    connectionLimit: 5
});

/*
async function asyncFunction() {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT 1 as val");
        console.log(rows); //[ {val: 1}, meta: ... ]
        const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}
*/


app.get('/d', async(req, res) => {
    console.log('Halloooo from /d');
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * FROM userVerkaufMubea WHERE ID_User=1;`);
        //console.log(rows); //[ {val: 1}, meta: ... ]
        const jsonS = JSON.stringify(rows);
        console.log(jsonS)
        //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
        res.send(jsonS)
    } catch (err) {
        console.log("DB-Error, irgendwas ist passiert, weil connection limit auf 8??? max 150??? ")
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});



//------------------------------------------------------------------------------------------------------

console.log("ich bin server.mjs");


export default function sum(a, b) {
    return a + b;
}
console.log("sum: "+sum(4,3));

a_Plus_b(1,2);
function a_Plus_b(a,b){
    let result = a+b;
    console.log("a+b= "+ result);
}

app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
});
