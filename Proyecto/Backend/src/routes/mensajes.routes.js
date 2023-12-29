import { Router } from "express";
import { getChat, insertMessage } from "../controllers/mensajes.controllers.js";
const router = Router();

router.post("/getChat/:id", getChat);
router.post("/insertMessage", insertMessage);

export default router;