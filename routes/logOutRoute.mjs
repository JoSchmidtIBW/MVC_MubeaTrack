import express from "express";
import logOutGetController from '../controllers/logOutController.mjs'
import {inHomeControllerGet, inHomeControllerDelete, inHomeControllerPost} from '../controllers/inHomeController.mjs';
import {authentificateUser} from "../utils/authenticateUser.mjs";
import {authentificateUser1} from "../utils/authenticateUser.mjs";

const router = express.Router();

//router.get('/:out',logOutGetController);
router.get('/:out',logOutGetController);
// router.get('/',(req,res)=>{
//     //res.send("Hello")
//     res.render('pages/logOut')
// })

export default router;//:)