import mongoose, { Schema, model } from 'mongoose';

const actividadSchema = new Schema({
    id_log_actividad: Number,
    timestampx: String,
    actividad: String,
    idPaciente: { type: mongoose.Schema.Types.ObjectId, ref: 'pacientes' },
    idHabitacion: { type: mongoose.Schema.Types.ObjectId, ref: 'habitaciones' }
});

export const LogActividad = model('log_actividades', actividadSchema); 