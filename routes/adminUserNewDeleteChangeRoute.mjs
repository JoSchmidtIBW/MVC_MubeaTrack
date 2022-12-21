import express from 'express';
import aaaa from '../controllers/adminUserNewDeleteChangeRouteController.mjs';
import checkAuthentication from "../utils/authentifizierungUser.mjs";

const router = express.Router();


/*
// localhost/q  und danach alles
router.get('/',(req,res)=>{
    console.log("ich bin adminChange- Route.mjs");
    console.log("req.body: "+req.body);
    //header
    res.send("<h1>Hello adminUserChange-Route  GET</h1>");
});
*/
//const home = require('../controllers/homecontroller')

//const app = Router();
//app.get('/', home);


// localhost/q/w
//router.get('/w',checkAuthentication,aaaa)



//router.use("/", authenticateUser); //soll überall verfügbar sein
// localhost/q  und danach alles
router.get('/w',checkAuthentication,(req,res)=>{
    console.log("ich bin adminChange- Route.mjs");
    console.log("req.body: "+req.body);
    //header
    res.send("<h1>Hello adminUserChange-Route  GET</h1>");
});


export default router;