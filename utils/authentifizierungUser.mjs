import express from "express";

// irgendwas mit express-session        versuch, soll 10sec session haben


export default function checkAuthentication(req, res, next){
    let isIrgendwas = false;
    console.log("ich bin checkAuthentication-Funktion in utils/authentifizierungUser.js")
    //return isIrgendwas;
    //return next();//next is not defined
    return res.end("401 Unautorized :) ");


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