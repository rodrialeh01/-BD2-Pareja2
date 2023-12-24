import { Schema, model } from "mongoose";

const pdfSchema = new Schema({
    idDoctor: Number,
    pdfPacientes: Array
});

export const Pdf = model('pdfs', pdfSchema); 