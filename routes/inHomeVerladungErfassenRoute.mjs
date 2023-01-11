import express from "express";


import {authentificateUser1} from "../utils/authenticateUser.mjs";
import {
 inHomeVerladungErfassenControllerDelete,
 inHomeVerladungErfassenControllerGet,
 inHomeVerladungErfassenControllerPost
} from "../controllers/inHomeVerladungErfassenController.mjs";

const router = express.Router();


 router.get('/:irgendwas',authentificateUser1,inHomeVerladungErfassenControllerGet);
 router.delete('/:irgendwas',authentificateUser1,inHomeVerladungErfassenControllerDelete);
 router.post('/:irgendwas',authentificateUser1,inHomeVerladungErfassenControllerPost);

export default router;
