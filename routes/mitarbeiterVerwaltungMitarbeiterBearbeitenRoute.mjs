import express from "express";
import {authentificateUser1} from "../utils/authenticateUser.mjs";
import {
    mitarbeiterBearbeitenControllerDelete,
    mitarbeiterBearbeitenControllerGet,
    mitarbeiterBearbeitenControllerPost
} from "../controllers/mitarbeiterVerwaltungMitarbeiterBearbeitenController.mjs";

const router = express.Router();

router.get('/:irgendwas',authentificateUser1,mitarbeiterBearbeitenControllerGet);
router.delete('/:irgendwas',authentificateUser1,mitarbeiterBearbeitenControllerDelete);
router.post('/:irgendwas',authentificateUser1,mitarbeiterBearbeitenControllerPost);

export default router;