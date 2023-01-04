import express from "express";
import {loginControllerGet, loginControllerPost} from '../controllers/login2Controller.mjs'


const router = express.Router();

// localhost:/api/v1/login2/....
//router.route('/').get(loginControllerGet).post(loginControllerPost);


export default router;






//--------------------------------------ALT--------------------------------------------
// import express from "express";
// //import loginControllerGet from "../controllers/login2Controller.mjs";
// //import loginControllerPost from "../controllers/login2Controller.mjs";
// import {loginControllerGet, loginControllerPost} from '../controllers/login2Controller.mjs'
//
//
// const router = express.Router();
//
// // localhost:/api/v1/login2/....
// //router.use("/", loginControllerGet); //soll überall verfügbar sein
// //router.use("/", loginControllerPost); //soll überall verfügbar sein
//
// router.route('/').get(loginControllerGet).post(loginControllerPost);
//
//
// /*
// let maNummerLEingabeClient;
// let passwortLEingabeClient;
//
// // localhost:/api/v1/login2/....
// router.get("/", (req, res) => {
//     maNummerLEingabeClient = req.body.maNummerLEingabe;
//     passwortLEingabeClient = req.body.passwortLEingabe;
//
//     res.render('pages/login', {
//         maNummerLServer : maNummerLEingabeClient,
//         passwortLServer : passwortLEingabeClient,
//         xClicker: clicker()     // test mit einer Funktion namens clicker()....
//     });
// });
//
//
//
//
// let myCounter = 0;
// function clicker() {
//     myCounter = myCounter +1;
//     console.log("Button Working! ich bin loginRoute1.mjs, myCounter: " + myCounter);
// };
// */
// export default router;
