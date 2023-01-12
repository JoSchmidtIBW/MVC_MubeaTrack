import express from "express";

import {inHomeControllerGet, inHomeControllerDelete, inHomeControllerPost} from '../controllers/inHomeController.mjs';
import {authentificateUser} from "../utils/authenticateUser.mjs";
import {authentificateUser1} from "../utils/authenticateUser.mjs";

const router = express.Router();

//router.get('/:irgendwas',authentificateUser1,inHomeControllerGet);
router.get('/',(req,res)=>{
    //res.send("Hello")
    res.render('pages/logOut')
})

export default router;//:)