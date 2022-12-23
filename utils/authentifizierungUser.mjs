import express from "express";

// irgendwas mit express-session        versuch, soll 10sec session haben
//const cookieParser = require("cookie-parser");
//const sessions = require('express-session');
//https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
//https://www.tutorialspoint.com/expressjs/expressjs_sessions.htm
/*
const session = require("express-session");
const passport = require("passport");

module.exports = {
  initialization(app) {
    app.use(
      session({
        secret: "mySecretKey",
        resave: false,
        saveUninitialized: false,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
      done(null, user.username);
    });
    passport.deserializeUser(async function (username, done) {
      let user = await usersModel.read(username);
      done(null, user);
    });
  },
 */


export default function checkAuthentication(req, res, next){
    let isIrgendwas = false;
    console.log("ich bin checkAuthentication-Funktion in utils/authentifizierungUser.js")
    //return isIrgendwas;
    //
    return next();//next is not defined
    //return res.end("401 Unautorized :) ");
    //res.send("401 Unautorized :) ");


    /*
        return next();
          } else {
            return response.end("401 Unautorized");
          }
        } else {
          return next();
        }
      } else {
        response.redirect("/login");
     */
}




//middleware
/*
function authenticateUser(req, res, next){
    res.locals.validatedUsers = "Bob";// sagt ist gut, schreibt in local
   // res.locals.validatedUsers = "<script>alert('XSS')</script>";//cross side scrippting !!!! zb als name in datenbank
    console.log("middleware: " + res.locals.validatedUsers)
    next();
}
*/


/*
router.use("/", authenticateUser); //soll überall verfügbar sein

//middleware
function authenticateUser(req, res, next) {
    res.locals.validatedUsers = "Bob"; // sagt ist gut, schreibt in local
    // res.locals.validatedUsers = "<script>alert('XSS')</script>";//cross side scrippting !!!! zb als name in datenbank
    console.log("middleware: " + res.locals.validatedUsers)
    next();
}
*/