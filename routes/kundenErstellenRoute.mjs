import express from "express";
import {authentificateUser1} from "../utils/authenticateUser.mjs";
import {kundenVerwaltungKundeErstellenControllerGet,kundenVerwaltungKundeErstellenControllerPost,kundenVerwaltungKundeErstellenControllerDelete} from "../controllers/kundenVerwaltungKundeErstellenController.mjs";

const router = express.Router();

router.get('/:irgendwas',authentificateUser1,kundenVerwaltungKundeErstellenControllerGet);
router.delete('/:irgendwas',authentificateUser1,kundenVerwaltungKundeErstellenControllerDelete);
router.post('/:irgendwas',authentificateUser1,kundenVerwaltungKundeErstellenControllerPost);


export default router;