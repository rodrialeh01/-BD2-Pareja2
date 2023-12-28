import mongoose, { Schema, model } from 'mongoose';

const loghabitacionSchema = new Schema({
    id_log_habitacion: Number,
    timestampx: String,
    statusx: String,
    idHabitacion: { type: mongoose.Schema.Types.Number, ref: 'habitaciones' }
});

export const LogHabitacion = model('log_habitaciones', loghabitacionSchema); 