import express from "express";
import {authentificateUser1} from "../utils/authenticateUser.mjs";
import {mitarbeiterErfassenControllerGet,mitarbeiterErfassenControllerPOST,mitarbeiterErfassenControllerDelete} from "../controllers/mitarbeiterVerwaltungMitarbeiterErfassenController.mjs";

const router = express.Router();


router.get('/:irgendwas',authentificateUser1,mitarbeiterErfassenControllerGet);
 router.delete('/:irgendwas',authentificateUser1,mitarbeiterErfassenControllerDelete);
 router.post('/:irgendwas',authentificateUser1,mitarbeiterErfassenControllerPOST);

export default router;