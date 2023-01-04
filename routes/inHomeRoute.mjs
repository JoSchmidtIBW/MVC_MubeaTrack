import express from "express";

import {inHomeControllerGet, inHomeControllerDelete, inHomeControllerPost} from '../controllers/inHomeController.mjs';
import {authentificateUser} from "../utils/authenticateUser.mjs";
import {authentificateUser1} from "../utils/authenticateUser.mjs";

const router = express.Router();

//router.get('/:irgendwas',authentificateUser,inHomeControllerGet);
//router.get('/:maNummerPATH*idPATH',authentificateUser1,inHomeControllerGet);
router.get('/:irgendwas',authentificateUser1,inHomeControllerGet);
router.delete('/:irgendwas',authentificateUser1,inHomeControllerDelete);
router.post('/:irgendwas',authentificateUser1,inHomeControllerPost);

export default router;







//--------------------------------------ALT--------------------------------------------
// import express from "express";
// //import {inHomeControllerGet, inHomeControllerPost} from "../controllers/login2Controller.mjs";
// //import inHomeControllerGet from '../controllers/inHomeController.mjs';
// import {inHomeControllerGet, inHomeControllerDelete, inHomeControllerPost} from '../controllers/inHomeController.mjs';
// //import checkAuthentication from "../utils/authentifizierungUser.mjs";
// //import checkAuthentication from "../utils/authentifizierungUser.mjs";
// import {authentificateUser} from "../utils/authenticateUser.mjs";
//
//
// const router = express.Router();
//
// // localhost:/api/v1/inHome
// //router.route('/:maNummer',checkAuthentication).get(inHomeControllerGet);//.post(inHomeControllerPost);
// //router.route('/:irgendwas',authentificateUser).get(inHomeControllerGet).post(inHomeControllerDelete);//.post(inHomeControllerPost);
// //router.route('/:irgendwas',authentificateUser).get(inHomeControllerGet).delete(inHomeControllerDelete);//so geht authenti nicht;
// //router.get('/:irgendwas',authentificateUser,inHomeControllerGet);//funktioniert
// //router.get('/:irgendwas',authentificateUser,inHomeControllerGet);
// //router.get('/:irgendwas',authentificateUser,inHomeControllerGet);//,inHomeControllerDelete); funktioniert
// //router.use('/:irgendwas',authentificateUser,inHomeControllerDelete)
// //router.route('/:irgendwas',authentificateUser).get(inHomeControllerGet).delete(inHomeControllerDelete)//geht nicht
// // mit .route geht auth. nicht!!
// router.get('/:irgendwas',authentificateUser,inHomeControllerGet);
// router.delete('/:irgendwas',authentificateUser,inHomeControllerDelete);
// router.post('/:irgendwas',authentificateUser,inHomeControllerPost);
// //https://dev.to/moz5691/method-override-for-put-and-delete-in-html-3fp2
// //router.post('/:irgendwas',authentificateUser,inHomeControllerDelete);
// // router.get('/:maNummer',checkAuthentication, async (req,res)=>{
// //
// //         console.log("bin im inHomeRoute.mjs - GET")
// //         console.log("req: " + req.query)
// //         console.log("pathname: " + req.path)
// //         const myArr = req.path.split(':');
// //         let gesplittetVonURLdenUserTeil = myArr[1];
// //         console.log("gesplittetVonURLdenUserTeil: " + gesplittetVonURLdenUserTeil)
// //         console.log("gesplittetVonURLdenUserTeiiiil: " + gesplittetVonURLdenUserTeil)
// //         const myArr1 = gesplittetVonURLdenUserTeil.split('*');
// //         console.log(" gesplittet myArr1[0]: " + myArr1[0] + " gesplittet myArr1[1]: " + myArr1[1]);
// //
// //         res.render('pages/layoutInHomeUser', {
// //             //werIstAngemeldetH:user1.getMa_NummerU()
// //             /*werIstAngemeldetH:user.getVornameU()+" "+user.getNachnameU(),
// //             kundeIHServer:  "hoi kunde",
// //             MaNummerServer: user.getMa_NummerU()*/
// //             werIstAngemeldetH: myArr1[0] + " " + myArr1[1],
// //             kundeIHServer: "hoi kunde",
// //             MaNummerServer: myArr1[0]
// //         });
// // });
//
// export default router;