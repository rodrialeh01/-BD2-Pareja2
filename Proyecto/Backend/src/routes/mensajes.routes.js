import { Router } from "express";
import { getChat } from "../controllers/mensajes.controllers.js";
const router = Router();

router.get("/getChat/:id", getChat);


export default router;