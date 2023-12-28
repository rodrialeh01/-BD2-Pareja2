import { Router } from "express";
import { loginDoctor, registrarDoctor } from "../controllers/auth.controllers.js";
const router = Router();

router.post('/registrar', registrarDoctor);
router.post('/login', loginDoctor);

export default router;