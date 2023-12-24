import { Schema, model } from "mongoose";

const photoSchema = new Schema({
    idDoctor: Number,
    image: Buffer
});

export const Photo = model('photos', photoSchema); 