import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import methodOverride from 'method-override';
//
// import login2Route from './routes/login2Route.mjs';
// import inHomeRoutes from "./routes/inHomeRoute.mjs";
// import kundenVerwaltungRoutes from './routes/kundenVerwaltungRoute.mjs';
// import mitarbeiterVerwaltungRoute from "./routes/mitarbeiterVerwaltungRoute.mjs";
//
// //import app from "./app.mjs";
//
// //const server = app;
//
// export const app = express();
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
// app.use(express.urlencoded({ extended: false }));//cookie was mit true
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use( express.static( "./public" ) );
// app.use('/api/v1/login2', login2Route);
// app.use(methodOverride('_method'));
// app.use(cookieParser());
// app.use('/api/v1/inHome', inHomeRoutes);
// //app.use('/api/v1/inHome/:0001*rTtGwkAwxI6ajLjBmMtZ3w==/kundenVerwaltung', kundenVerwaltungRoutes);
// app.use('/api/v1/inHome/kundenVerwaltung', kundenVerwaltungRoutes);
// app.use('/api/v1/inHome/mitarbeiterVerwaltung', mitarbeiterVerwaltungRoute);
//
//
//
//
//
//
// // helmet solltre rein, tutorial , dann wegen ejs <%=    oder <%-
//
//
// app.get('/', (req, res) => {
//     res.send("<h1>Hello Wolrd</h1><input type=\"button\" onclick=\"location.href='/api/v1/login2';\" value=\"Go to login\" />")
// });
//
// //------------------------Versuch Cookie-----------------------------------------
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
// //-------------------------------------------------------------------------------
//
//
// // für UNIT-TEST- Versuch
// export default function sum(a, b) {
//     return a + b;
// }
// console.log("Für Unit Test... sum: "+sum(4,3));
//
// a_Plus_b(1,2);
// function a_Plus_b(a,b){
//     let result = a+b;
//     console.log("UnitTest... a+b= "+ result);
// }
//
// console.log("ich bin app.mjs");
//
//
//
// //export default app;
//
//
