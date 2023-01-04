import express from "express";
import {login1ControllerGet, login1ControllerPost} from '../controllers/login1Controller.mjs'


const router = express.Router();

// localhost:/api/v1/login/....
router.route('/').get(login1ControllerGet).post(login1ControllerPost);


export default router;