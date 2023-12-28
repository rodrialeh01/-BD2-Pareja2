import { Router } from "express";
import { aceptarSolicitud, deleteFriend, getAmigos, getDoctor, getDoctores, getDoctoresButMe, getFriendsOfFriends, getProfilePhoto, getSolicitudes, mandarSolicitud, rechazarSolicitud, updateDoctor } from "../controllers/doctor.controllers.js";
const router = Router();

router.get('/getDoctores',getDoctores); //
router.get('/getDoctor/:id',getDoctor); //
router.get('/getDoctoresButMe/:id',getDoctoresButMe); //
router.get('/getPhoto/:id', getProfilePhoto);

router.post('/mandarSolicitud/:id', mandarSolicitud); //
router.post('/aceptarSolicitud/:id', aceptarSolicitud); //
router.post('/rechazarSolicitud/:id', rechazarSolicitud); //
router.get('/getSolicitudes/:id', getSolicitudes); //
router.get('/getAmigos/:id', getAmigos); //
router.get('/getFriendsOfFriends/:id', getFriendsOfFriends);

router.delete('/deleteFriend/:id', deleteFriend); //

router.put('/update', updateDoctor); //

export default router;