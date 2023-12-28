import { Schema, model } from "mongoose";

const photoSchema = new Schema({
    correo: String,
    image: String
});

export const Photo = model('photos', photoSchema); 