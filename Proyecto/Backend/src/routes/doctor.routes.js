import { Router } from "express";
import { aceptarSolicitud, areWeFriends, deleteFriend, getAmigos, getDoctor, getDoctores, getDoctoresButMe, getFriendsOfFriends, getPdfs, getProfilePhoto, getSolicitudes, insertarPdf, mandarSolicitud, rechazarSolicitud, updateDoctor } from "../controllers/doctor.controllers.js";
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

router.get('/areWeFriends/:idMe/:idFriend', areWeFriends);

router.post('/cargarPDF/:id', insertarPdf);
router.get('/getPDFs/:id', getPdfs);

export default router;