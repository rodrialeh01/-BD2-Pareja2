import { Router } from "express";
import { insertHabitaciones, insertPacientes, insertLogActividad, insertLogHabitacion } from "../controllers/data.controllers.js";
const router = Router();

router.get('/insertHabitaciones', insertHabitaciones);
router.get('/insertPacientes', insertPacientes);
router.get('/insertLogActividad', insertLogActividad);
router.get('/insertLogHabitacion', insertLogHabitacion);


export default router;