import { Router } from "express";
import { getDoctores, getDoctor,mandarSolicitud, aceptarSolicitud, rechazarSolicitud, getSolicitudes, getAmigos, getDoctoresButMe, getFriendsOfFriends  } from "../controllers/doctor.controllers.js";
const router = Router();

router.get('/getDoctores',getDoctores); //
router.get('/getDoctor/:id',getDoctor); //
router.get('/getDoctoresButMe/:id',getDoctoresButMe); //

router.post('/mandarSolicitud/:id', mandarSolicitud); //
router.post('/aceptarSolicitud/:id', aceptarSolicitud); //
router.post('/rechazarSolicitud/:id', rechazarSolicitud); //
router.get('/getSolicitudes/:id', getSolicitudes); //
router.get('/getAmigos/:id', getAmigos); //
router.get('/getFriendsOfFriends/:id', getFriendsOfFriends);

export default router;