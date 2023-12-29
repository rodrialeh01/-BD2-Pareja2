import { Router } from "express";
import { addPublicacion, getPublicaciones } from "../controllers/publicaciones.controllers.js";
const router = Router();

router.post('/publicar/:id', addPublicacion);
router.get('/getPublicaciones/:id', getPublicaciones);

export default router;