import dotenv from 'dotenv';
import express from "express";
import mariaDB from 'mariadb';
//import poolDB from "./lib/db.mjs";
import bodyParser from "body-parser";

import cookieParser from 'cookie-parser';
import session from 'express-session';

import jwt from "jsonwebtoken";
import methodOverride from 'method-override';

import loginRoutes from './routes/loginRoute.mjs';
import adminUserNewDeleteChangeRoute from "./routes/adminUserNewDeleteChangeRoute.mjs";
import login2Route from './routes/login2Route.mjs';
import inHomeRoutes from "./routes/inHomeRoute.mjs";
import kundenVerwaltungRoutes from './routes/kundenVerwaltungRoute.mjs'


//import {authentificateUser} from "../utils/authenticateUser.mjs";


const app = express();
let PORT;// = process.env.PORT || 7088;



const resultDotenv = dotenv.config()

if (resultDotenv.error) {
    throw resultDotenv.error
}

const buf = Buffer.from('BASIC=basic')
const config = dotenv.parse(buf) // will return an object
console.log(typeof config, config) // object { BASIC : 'basic' }

process.env.STATUS === 'production' ? (PORT = process.env.DEV_PORT) : (PORT = process.env.PROD_PORT);


//console.log("resultDotenv: "+resultDotenv.parsed);  // [object Object]



//setup
app.set("case sensitive routing", false); // um url gross oder klein schreiben link /users   /Users
app.set("view engine", "ejs");


//Middleware
app.use(express.json());
// parsing the incoming data
// parse requests of content-type - application/x-www-form-urlencoded   bei true
app.use(express.urlencoded({ extended: false }));//cookie was mit true
app.use(bodyParser.urlencoded({ extended: false }))

app.use( express.static( "./public" ) );
//app.use('/api/v1/login', loginRoutes);
app.use('/q', adminUserNewDeleteChangeRoute);
app.use('/api/v1/login2', login2Route);

app.use(methodOverride('_method'));

// cookie parser middleware
app.use(cookieParser());
//app.use(session({secret: "Shh, its a secret!"}));


// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

var date = new Date();
date.setTime(date.getTime() + (2 * 1000)); //add 30s to current date-time 1s = 1000ms

//session middleware
app.use(session({
    secret: "Shh, its a secret!",//"thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: date },
    resave: false
}));

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: true }
// }));

app.use('/api/v1/inHome', inHomeRoutes);
//app.use('/api/v1/inHome/:0001*rTtGwkAwxI6ajLjBmMtZ3w==/kundenVerwaltung', kundenVerwaltungRoutes);
app.use('/api/v1/kundenVerwaltung', kundenVerwaltungRoutes);


// a variable to save a session
//var session;
//var x = 1;
//let x = 1;
app.get('/xx',(req,res) => {
    let x = 1;
    let session=req.session;
   // session = x;
    console.log(req.session);
    console.log(session)
    if(req.session.cookie.maxAge){
        req.session.cookie.maxAge = false;
        res.send('Hello XXXXXXXX!');
    }
    else{
        res.send('afewrtrdfgXX!');
    }
    // if(session.userid){
    //     res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    // }else
    //     res.sendFile('views/index.html',{root:__dirname})
    //res.send("session:" + session)
    //res.send('Hello XXXXXXXX!');
});

/*
app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});
 */



app.get('/c', function(req, res){
    console.log("bin in cccccccc")
    if(req.session.page_views){
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
    } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
});



app.get('/w', (req, res) => {
    res.send('Hello WWWWWWWW!');
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//------------------------------------------------------------------------------------------------------
//const mariadb = require('mariadb');



/*
const pool = mariaDB.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mubea2020!',
    database: 'mubeaVerkaufDataBase',
    connectionLimit: 5
});
*/
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

/*
app.get('/d', async(req, res) => {
    console.log('Halloooo from /d');
    let conn;
    try {
        conn = await poolDB.getConnection();
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
*/


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

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});
