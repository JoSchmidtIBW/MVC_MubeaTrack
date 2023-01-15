import express from "express";
//import logOutGetController from '../controllers/logOutController.mjs'
//import {inHomeControllerGet, inHomeControllerDelete, inHomeControllerPost} from '../controllers/inHomeController.mjs';
//import {authentificateUser} from "../utils/authenticateUser.mjs";
import {authentificateUser1} from "../utils/authenticateUser.mjs";
import {
    meinAvatarControllerDelete,
    meinAvatarControllerGet,
    meinAvatarControllerPost
} from "../controllers/meinAvatarController.mjs";

const router = express.Router();

//router.get('/:out',logOutGetController);

router.delete('/:irgendwas',authentificateUser1,meinAvatarControllerDelete)
router.get('/:irgendwas', authentificateUser1, meinAvatarControllerGet);
router.post('/:irgendwas',authentificateUser1,meinAvatarControllerPost)

// router.get('/',(req,res)=>{
//     //res.send("Hello")
//     res.render('pages/logOut')
// })

export default router;//:)