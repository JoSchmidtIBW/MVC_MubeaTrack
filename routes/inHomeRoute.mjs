import express from "express";
//import {inHomeControllerGet, inHomeControllerPost} from "../controllers/login2Controller.mjs";
import inHomeControllerGet from '../controllers/inHomeController.mjs';
//import checkAuthentication from "../utils/authentifizierungUser.mjs";
import checkAuthentication from "../utils/authentifizierungUser.mjs";

const router = express.Router();

// localhost:/api/v1/inHome
//router.route('/:maNummer',checkAuthentication).get(inHomeControllerGet);//.post(inHomeControllerPost);
router.get('/:maNummer',checkAuthentication,inHomeControllerGet);
// router.get('/:maNummer',checkAuthentication, async (req,res)=>{
//
//         console.log("bin im inHomeRoute.mjs - GET")
//         console.log("req: " + req.query)
//         console.log("pathname: " + req.path)
//         const myArr = req.path.split(':');
//         let gesplittetVonURLdenUserTeil = myArr[1];
//         console.log("gesplittetVonURLdenUserTeil: " + gesplittetVonURLdenUserTeil)
//         console.log("gesplittetVonURLdenUserTeiiiil: " + gesplittetVonURLdenUserTeil)
//         const myArr1 = gesplittetVonURLdenUserTeil.split('*');
//         console.log(" gesplittet myArr1[0]: " + myArr1[0] + " gesplittet myArr1[1]: " + myArr1[1]);
//
//         res.render('pages/layoutInHomeUser', {
//             //werIstAngemeldetH:user1.getMa_NummerU()
//             /*werIstAngemeldetH:user.getVornameU()+" "+user.getNachnameU(),
//             kundeIHServer:  "hoi kunde",
//             MaNummerServer: user.getMa_NummerU()*/
//             werIstAngemeldetH: myArr1[0] + " " + myArr1[1],
//             kundeIHServer: "hoi kunde",
//             MaNummerServer: myArr1[0]
//         });
// });

export default router;