import { Router } from "express";
import { consulta1, consulta2, consulta3, consulta4, consulta5 } from "../controllers/consultas.controller.js";

const router = Router();

router.get('/getConsulta1', consulta1); //
router.get('/getConsulta2', consulta2); //
router.get('/getConsulta3', consulta3); //
router.get ('/getConsulta4', consulta4); //
router.get ('/getConsulta5', consulta5); //

export default router;