import express from "express";

export default function checkAuthentication(){
    let isIrgendwas = false;
    console.log("ich bin checkAuthentication-Funktion in utils/authentifizierungUser.js")
    return isIrgendwas;

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