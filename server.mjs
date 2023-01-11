import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import methodOverride from 'method-override';
import helmet from "helmet";

//import loginRoute1 from './routes/loginRoute1.mjs';
import login2Route from './routes/login2Route.mjs';
import inHomeRoutes from "./routes/inHomeRoute.mjs";
import kundenVerwaltungRoutes from './routes/kundenVerwaltungRoute.mjs';
import mitarbeiterVerwaltungRoute from "./routes/mitarbeiterVerwaltungRoute.mjs";
import kundenVerwaltungKundeBearbeitenRoutes from './routes/kundenVerwaltungBearbeitenRoute.mjs'
import kundenVerwaltungKundeErstellenRoutes from './routes/kundenVerwaltungKundeErstellen.mjs'
import mitarbeiterVerwaltungMitarbeiterBearbeitenRoute from './routes/mitarbeiterVerwaltungMitarbeiterBearbeitenRoute.mjs'
import mitarbeiterVerwaltungMitarbeiterErfassenRoute from './routes/mitarbeiterVerwaltungMitarbeiterErfassenRoute.mjs'
import inHomeVerladungErfassenRoute from './routes/inHomeVerladungErfassenRoute.mjs'

import session2 from './utils/session.mjs'
import loginRoute1 from "./routes/loginRoute1.mjs";

//import app from "./app.mjs";

//const server = app();

 const app = express();


//
//
 let PORT;// = process.env.PORT || 7088;

dotenv.config({ path: './config.env' });


//dotenv.config({ path: './config.env' });
// .env Erfahrungen sammeln un lernen
const resultDotenv = dotenv.config()
if (resultDotenv.error) {
    throw resultDotenv.error
}
const buf = Buffer.from('BASIC=basic')
const config = dotenv.parse(buf) // will return an object
//console.log(typeof config, config) // object { BASIC : 'basic' }
process.env.STATUS === 'production' ? (PORT = process.env.DEV_PORT) : (PORT = process.env.PROD_PORT);

//server.use(app)

//server.listen(app);// .use(app)
//



//setup
app.set("case sensitive routing", false); // um url gross oder klein schreiben link /users   /Users
app.set("view engine", "ejs");


//Middleware
//app.use(express.json());
// app.use(express.urlencoded({ extended: false }));//cookie was mit true
// //app.use(bodyParser.urlencoded({ extended: false }))
// //app.use(bodyParser.urlencoded())
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(express.json());
app.use( express.static( "./public" ) );

app.use(methodOverride('_method'));
app.use(cookieParser());


// app.use(
//     helmet({
//         contentSecurityPolicy: false,
//         crossOriginResourcePolicy: false,
//         crossOriginEmbedderPolicy: false,
//     }),
// );


// app.use((req, res, next) => {
//     res.setHeader("X-XSS-Protection", "0");//0 sollte ausgeschaltet sein damit xss testen, weil nun xss nicht mehr geht, obwohl helmet ausgeschaltet
//     next();
// });
//app.use(helmet.xssFilter()); // nun kann man im inputfeld zb beim Login nicht <script>alert("XSS")</script> schreiben, und es kommt kein alert    aber nicht mit script testen, sondern mit <iframe src=javascript:alert(1)>
//app.use(helmet.xframe('sameorigin'));

//app.use(helmet.);
// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             //defaultSrc: ["'self'"],
//             //scriptSrc: scriptSources,
//             // ...
//         },
//     })
// )

//app.use(helmet); //sicherheit, damit nicht weiss das express genutzt wird
// app.use(helmet.contentSecurityPolicy());
// app.use(helmet.crossOriginEmbedderPolicy());
// app.use(helmet.crossOriginOpenerPolicy());
// app.use(helmet.crossOriginResourcePolicy());
// app.use(helmet.dnsPrefetchControl());
// app.use(helmet.expectCt());
// app.use(helmet.frameguard());
// app.use(helmet.hidePoweredBy());
// app.use(helmet.hsts());
// app.use(helmet.ieNoOpen());
// app.use(helmet.noSniff());
// app.use(helmet.originAgentCluster());
// app.use(helmet.permittedCrossDomainPolicies());
// app.use(helmet.referrerPolicy());
// app.use(helmet.xssFilter());

app.disable('x-powered-by') //sicherheit, damit nicht weiss im Browser, das express genutzt wird

// app.use((req, res, next) => {
//     //res.locals.cspNonce = crypto.randomBytes(16).toString("hex");
//     console.log("Was bin ich? "+res.locals.cspNonce)
//     next();
// });
//
// app.use(helmet.contentSecurityPolicy({
//     //console.log(res.locals.cspNonce)
//     useDefaults: true,
//     directives: { // welche scriptquellen sind erlaubt?
//         //scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`]
//     }
// }));

//app.use('/images/favicon/favicon.png')
//app.use('/favicon.png', express.static('./public/mages/favicon/favicon.png'));
//app.use(express.static('/public/images/favicon/favicon.png'));
//app.use('/images/favicon/favicon.png', express.static('/images/favicon/favicon.png'));


// helmet solltre rein, tutorial , dann wegen ejs <%=    oder <%-


app.get('/', (req, res) => {
    res.send("<link rel=\"icon\" type=\"image/png\" href=\"/images/favicon/favicon.png\"><h1>Hello Wolrd</h1><input type=\"button\" onclick=\"location.href='/api/v1/login1';\" value=\"Go to login\" />")
});

//------------------------Versuch Cookie-----------------------------------------

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

let date = new Date();
date.setTime(date.getTime() + (4 * 1000)); //add 30s to current date-time 1s = 1000ms

//session middleware
app.use(session({
    secret: "Shh, its a secret!",//"thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: date },
    resave: false
}));

//app.use(session2());

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: true }
// }));

app.get('/qq/:irgendwas', (req,res)=>{
    console.log("req.path: "+req.path)
    console.log("req.params: "+JSON.stringify(req.params))
    const myArrFullPath = req.path.split(':');
    console.log("myArrPath: "+myArrFullPath)
    let gesplittetVonURLdenUserTeil = myArrFullPath[0];
    let myArr2 = req.path.split('q/');
    console.log("myArr2: "+myArr2[1])
    res.cookie(myArr2[1],myArr2[1])//req.path)
        .send("Helllo Cockieee"+"<p>Coockie Set: <a href='/qq'>View Here</a>")
})
app.get('/qq', (req,res)=>{
    console.log(req.cookies.name)
    res.send(req.cookies.name)
})

app.get('/tt', (req, res) => {

    let cookieVal = req.cookies.username;
    let show;

    if (cookieVal) {
        show = `Hi ${cookieVal} <br><a href="/delete-cookie">Delete Cookie</a>`;
    } else {
        show = `<a href="/set-cookie">Set Cookie</a><br>
        <a href="/delete-cookie">Delete Cookie</a><br>`;
    }

    res.send(show);
});

// SET COOKIE
app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'Webtutorials.ME', {
        maxAge: 1000 * 60, // 1 min
        httpOnly: true // http only, prevents JavaScript cookie access
    });
    // REDIRECT OT HOME
    res.redirect('/tt');
});

// DELETE COOKIE
app.get('/delete-cookie', (req, res) => {
    //DELETING username COOKIE
    res.clearCookie('username');
    // REDIRECT OT HOME
    res.redirect('/tt');

});
// // SET COOKIE
// app.get('/set-cookie', (req, res) => {
//     res.cookie('username', 'Webtutorials.ME', {
//         maxAge: 1000 * 60, // 1 min
//         httpOnly: true // http only, prevents JavaScript cookie access
//     });
//     // REDIRECT OT HOME
//     res.redirect('/tt');
// });
// app.get('/tt', (req, res) => {
//
//     let cookieVal = req.cookies.username;
//     console.log("req.cookies.username: " + cookieVal);
//     let show;
//
//     if (cookieVal) {
//         show = `Hi ${cookieVal} <br><a href="/delete-cookie">Delete Cookie</a>`;
//     } else {
//         show = `<a href="/set-cookie">Set Cookie</a><br>
//         <a href="/delete-cookie">Delete Cookie</a><br>`;
//     }
//
//     res.send(show);
// });

// app.get('/qq', (req,res)=>{
//     res.cookie("meinCoockie",req.path)
//         .send("Helllo Cockieee"+"<p>Coockie Set: <a href='/ww'>View Here</a>")
// })
// app.get('/ww', (req,res)=>{
//     res.send(req.cookies.name)
// })

// a variable to save a session
//var session;
//var x = 1;
//let x = 1;
app.get('/xx',(req,res) => {
    let x = 1;
    let session=req.session;
    // let session = x;
    //console.log("xxxreq.session: "+req.session);//[object Object]
    console.log("xxx JSON.stringify(req.session): "+JSON.stringify(req.session))
    //console.log("xxxsession: "+session)//[object Object]
    console.log("xxx JSON.stringify(session): "+JSON.stringify(session))
    if(req.session.cookie.maxAge){
        //req.session.cookie.maxAge = false;
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
    console.log("bin in /c und: " +JSON.stringify(req.session.page_views))
    if(req.session.page_views){
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
    } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
});
//-------------------------------------------------------------------------------


//app.use(express.json());
// app.use(express.urlencoded({ extended: false }));//cookie was mit true
// //app.use(bodyParser.urlencoded({ extended: false }))
// //app.use(bodyParser.urlencoded())

// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
//achtung, muss unterhalb von session sein!!!
app.use('/api/v1/login1', loginRoute1);
//app.use('/api/v1/login2', login2Route);
app.use('/api/v1/inHome', inHomeRoutes);
app.use('/api/v1/inHome/VerladungErfassen',inHomeVerladungErfassenRoute);
//app.use('/api/v1/inHome/:0001*rTtGwkAwxI6ajLjBmMtZ3w==/kundenVerwaltung', kundenVerwaltungRoutes);
app.use('/api/v1/inHome/kundenVerwaltung', kundenVerwaltungRoutes);
app.use('/api/v1/inHome/mitarbeiterVerwaltung', mitarbeiterVerwaltungRoute);
app.use('/api/v1/inHome/kundenVerwaltung/kundeBearbeiten', kundenVerwaltungKundeBearbeitenRoutes);
app.use('/api/v1/inHome/kundenVerwaltung/kundeErstellen', kundenVerwaltungKundeErstellenRoutes);
app.use('/api/v1/inHome/mitarbeiterVerwaltung/mitarbeiterBearbeiten', mitarbeiterVerwaltungMitarbeiterBearbeitenRoute);
app.use('/api/v1/inHome/mitarbeiterVerwaltung/MitarbeiterErfassen', mitarbeiterVerwaltungMitarbeiterErfassenRoute);

// für UNIT-TEST- Versuch
export default function sum(a, b) {
    return a + b;
}
//console.log("Für Unit Test... sum: "+sum(4,3));

a_Plus_b(1,2);
function a_Plus_b(a,b){
    let result = a+b;
   // console.log("UnitTest... a+b= "+ result);
}

//console.log("ich bin server.mjs");

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});







//------------------------Versuch Cookie-----------------------------------------
//
// // creating 24 hours from milliseconds
// const oneDay = 1000 * 60 * 60 * 24;
//
// var date = new Date();
// date.setTime(date.getTime() + (2 * 1000)); //add 30s to current date-time 1s = 1000ms
//
// //session middleware
// app.use(session({
//     secret: "Shh, its a secret!",//"thisismysecrctekeyfhrgfgrfrty84fwir767",
//     saveUninitialized:true,
//     cookie: { maxAge: date },
//     resave: false
// }));
//
// // app.use(session({
// //     secret: 'keyboard cat',
// //     resave: false,
// //     saveUninitialized: false,
// //     cookie: { secure: true }
// // }));
//
//
//
// // a variable to save a session
// //var session;
// //var x = 1;
// //let x = 1;
// app.get('/xx',(req,res) => {
//     let x = 1;
//     let session=req.session;
//     // session = x;
//     console.log(req.session);
//     console.log(session)
//     if(req.session.cookie.maxAge){
//         req.session.cookie.maxAge = false;
//         res.send('Hello XXXXXXXX!');
//     }
//     else{
//         res.send('afewrtrdfgXX!');
//     }
//     // if(session.userid){
//     //     res.send("Welcome User <a href=\'/logout'>click to logout</a>");
//     // }else
//     //     res.sendFile('views/index.html',{root:__dirname})
//     //res.send("session:" + session)
//     //res.send('Hello XXXXXXXX!');
// });
//
// /*
// app.get('/logout',(req,res) => {
//     req.session.destroy();
//     res.redirect('/');
// });
//  */
//
//
//
// app.get('/c', function(req, res){
//     console.log("bin in cccccccc")
//     if(req.session.page_views){
//         req.session.page_views++;
//         res.send("You visited this page " + req.session.page_views + " times");
//     } else {
//         req.session.page_views = 1;
//         res.send("Welcome to this page for the first time!");
//     }
// });
//-------------------------------------------------------------------------------







//---------------------------------------------------ALT--------------------------------------------------------------
// import dotenv from 'dotenv';
// import express from "express";
// import mariaDB from 'mariadb';
// //import poolDB from "./lib/db.mjs";
// import bodyParser from "body-parser";
//
// import cookieParser from 'cookie-parser';
// import session from 'express-session';
//
// import jwt from "jsonwebtoken";
// import methodOverride from 'method-override';
//
// //import loginRoutes from './routes/loginRoute1.mjs';
// //import adminUserNewDeleteChangeRoute from "./routes/adminUserNewDeleteChangeRoute.mjs";
// import login2Route from './routes/login2Route.mjs';
// import inHomeRoutes from "./routes/inHomeRoute.mjs";
// import kundenVerwaltungRoutes from './routes/kundenVerwaltungRoute.mjs'
//
//
// //import {authentificateUser} from "../utils/authenticateUser.mjs";
//
//
// const app = express();
// let PORT;// = process.env.PORT || 7088;
//
//
//
// const resultDotenv = dotenv.config()
//
// if (resultDotenv.error) {
//     throw resultDotenv.error
// }
//
// const buf = Buffer.from('BASIC=basic')
// const config = dotenv.parse(buf) // will return an object
// console.log(typeof config, config) // object { BASIC : 'basic' }
//
// process.env.STATUS === 'production' ? (PORT = process.env.DEV_PORT) : (PORT = process.env.PROD_PORT);
//
//
// //console.log("resultDotenv: "+resultDotenv.parsed);  // [object Object]
//
//
//
// //setup
// app.set("case sensitive routing", false); // um url gross oder klein schreiben link /users   /Users
// app.set("view engine", "ejs");
//
//
// //Middleware
// app.use(express.json());
// // parsing the incoming data
// // parse requests of content-type - application/x-www-form-urlencoded   bei true
// app.use(express.urlencoded({ extended: false }));//cookie was mit true
// app.use(bodyParser.urlencoded({ extended: false }))
//
// app.use( express.static( "./public" ) );
// //app.use('/api/v1/login', loginRoutes);
// //app.use('/q', adminUserNewDeleteChangeRoute);
// app.use('/api/v1/login2', login2Route);
//
// app.use(methodOverride('_method'));
//
// // cookie parser middleware
// app.use(cookieParser());
// //app.use(session({secret: "Shh, its a secret!"}));
//
//
// // creating 24 hours from milliseconds
// const oneDay = 1000 * 60 * 60 * 24;
//
// var date = new Date();
// date.setTime(date.getTime() + (2 * 1000)); //add 30s to current date-time 1s = 1000ms
//
// //session middleware
// app.use(session({
//     secret: "Shh, its a secret!",//"thisismysecrctekeyfhrgfgrfrty84fwir767",
//     saveUninitialized:true,
//     cookie: { maxAge: date },
//     resave: false
// }));
//
// // app.use(session({
// //     secret: 'keyboard cat',
// //     resave: false,
// //     saveUninitialized: false,
// //     cookie: { secure: true }
// // }));
//
// app.use('/api/v1/inHome', inHomeRoutes);
// //app.use('/api/v1/inHome/:0001*rTtGwkAwxI6ajLjBmMtZ3w==/kundenVerwaltung', kundenVerwaltungRoutes);
// app.use('/api/v1/kundenVerwaltung', kundenVerwaltungRoutes);
//
//
// // a variable to save a session
// //var session;
// //var x = 1;
// //let x = 1;
// app.get('/xx',(req,res) => {
//     let x = 1;
//     let session=req.session;
//     // session = x;
//     console.log(req.session);
//     console.log(session)
//     if(req.session.cookie.maxAge){
//         req.session.cookie.maxAge = false;
//         res.send('Hello XXXXXXXX!');
//     }
//     else{
//         res.send('afewrtrdfgXX!');
//     }
//     // if(session.userid){
//     //     res.send("Welcome User <a href=\'/logout'>click to logout</a>");
//     // }else
//     //     res.sendFile('views/index.html',{root:__dirname})
//     //res.send("session:" + session)
//     //res.send('Hello XXXXXXXX!');
// });
//
// /*
// app.get('/logout',(req,res) => {
//     req.session.destroy();
//     res.redirect('/');
// });
//  */
//
//
//
// app.get('/c', function(req, res){
//     console.log("bin in cccccccc")
//     if(req.session.page_views){
//         req.session.page_views++;
//         res.send("You visited this page " + req.session.page_views + " times");
//     } else {
//         req.session.page_views = 1;
//         res.send("Welcome to this page for the first time!");
//     }
// });
//
//
//
// app.get('/w', (req, res) => {
//     res.send('Hello WWWWWWWW!');
// });
//
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
//
// //------------------------------------------------------------------------------------------------------
// //const mariadb = require('mariadb');
//
//
//
// /*
// const pool = mariaDB.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'Mubea2020!',
//     database: 'mubeaVerkaufDataBase',
//     connectionLimit: 5
// });
// */
// /*
// async function asyncFunction() {
//     let conn;
//     try {
//         conn = await pool.getConnection();
//         const rows = await conn.query("SELECT 1 as val");
//         console.log(rows); //[ {val: 1}, meta: ... ]
//         const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//         console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
//
//     } catch (err) {
//         throw err;
//     } finally {
//         if (conn) return conn.end();
//     }
// }
// */
//
// /*
// app.get('/d', async(req, res) => {
//     console.log('Halloooo from /d');
//     let conn;
//     try {
//         conn = await poolDB.getConnection();
//         const rows = await conn.query(`SELECT * FROM userVerkaufMubea WHERE ID_User=1;`);
//         //console.log(rows); //[ {val: 1}, meta: ... ]
//         const jsonS = JSON.stringify(rows);
//         console.log(jsonS)
//         //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//         //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
//         res.send(jsonS)
//     } catch (err) {
//         console.log("DB-Error, irgendwas ist passiert, weil connection limit auf 8??? max 150??? ")
//         throw err;
//     } finally {
//         if (conn) return conn.end();
//     }
// });
// */
//
//
// //------------------------------------------------------------------------------------------------------
//
// console.log("ich bin server.mjs");
//
//
// export default function sum(a, b) {
//     return a + b;
// }
// console.log("sum: "+sum(4,3));
//
// a_Plus_b(1,2);
// function a_Plus_b(a,b){
//     let result = a+b;
//     console.log("a+b= "+ result);
// }
//
// app.listen(PORT, () => {
//     console.log(`Server running on port: http://localhost:${PORT}`);
// });
