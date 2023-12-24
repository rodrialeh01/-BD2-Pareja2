import { Schema, model } from "mongoose";

const habitacionSchema = new Schema({
    idHabitacion: Number,
    habitacion: String
});

export const Habitacion = model('habitaciones', habitacionSchema); 