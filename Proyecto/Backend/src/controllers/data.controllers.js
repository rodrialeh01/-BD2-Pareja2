import { json } from "express";
import { Habitacion } from "../db/mongo/models/habitacion.model.js";
import { Paciente } from "../db/mongo/models/paciente.model.js";
import { LogActividad } from "../db/mongo/models/log_actividad.model.js";
import { LogHabitacion } from "../db/mongo/models/log_habitacion.model.js";


import fs from 'fs';

export const insertHabitaciones = async (req, res) => {
    console.log('Insertando habitaciones');
    try {
        let data = fs.readFileSync('./src/db/mongo/data/Habitaciones.json');
        let test = data.toString().replace(/^\uFEFF/, '');
        let habitaciones = JSON.parse(test);

        await Habitacion.insertMany(habitaciones);

        console.log('Habitaciones insertadas correctamente');
        return res.status(200).json({ message: 'Habitaciones insertadas correctamente' });
    } catch (error) {
        console.log('Error al insertar las habitaciones:', error);
        return res.status(500).json({ message: 'Error al insertar las habitaciones' });
    }
};

export const insertPacientes = async (req, res) => {
    console.log('Insertando pacientes');
    try {
        let data = fs.readFileSync('./src/db/mongo/data/Pacientes.json');
        let test = data.toString().replace(/^\uFEFF/, '');
        let pacientes = JSON.parse(test);

        await Paciente.insertMany(pacientes);

        console.log('Pacientes insertados correctamente');
        return res.status(200).json({ message: 'Pacientes insertados correctamente' });
    } catch (error) {
        console.log('Error al insertar los pacientes:', error);
        return res.status(500).json({ message: 'Error al insertar los pacientes' });
    }
};

export const insertLogActividad = async (req, res) => {
    console.log('Insertando logs actividad');
    try {
        let data = fs.readFileSync('./src/db/mongo/data/LogActividades1.json');
        let test = data.toString().replace(/^\uFEFF/, '');
        let logActividad = JSON.parse(test);

        await LogActividad.insertMany(logActividad);

        data = fs.readFileSync('./src/db/mongo/data/LogActividades2.json');
        test = data.toString().replace(/^\uFEFF/, '');
        logActividad = JSON.parse(test);

        await LogActividad.insertMany(logActividad);

        console.log('Logs actividad insertados correctamente');

        return res.status(200).json({ message: 'Log actividad insertado correctamente' });
    } catch (error) {
        console.log('Error al insertar el log actividad:', error);
        return res.status(500).json({ message: 'Error al insertar el log actividad' });
    }
};

export const insertLogHabitacion = async (req, res) => {
    console.log('Insertando logs habitacion');
    try {
        let data = fs.readFileSync('./src/db/mongo/data/LogHabitacion.json');
        let test = data.toString().replace(/^\uFEFF/, '');
        let logHabitacion = JSON.parse(test);

        await LogHabitacion.insertMany(logHabitacion);

        console.log('Logs habitacion insertados correctamente');

        return res.status(200).json({ message: 'Log habitacion insertado correctamente' });
    } catch (error) {
        console.log('Error al insertar el log habitacion:', error);
        return res.status(500).json({ message: 'Error al insertar el log habitacion' });
    }
};