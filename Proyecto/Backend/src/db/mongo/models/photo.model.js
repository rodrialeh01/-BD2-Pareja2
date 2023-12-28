import { Schema, model } from "mongoose";

const photoSchema = new Schema({
    correo: String,
    image: Buffer
});

export const Photo = model('photos', photoSchema); 