import { Schema, model } from "mongoose";

const pacienteSchema = new Schema({
    idPaciente: Number,
    edad: Number,
    genero: String
});

export const Paciente = model('pacientes', pacienteSchema); 