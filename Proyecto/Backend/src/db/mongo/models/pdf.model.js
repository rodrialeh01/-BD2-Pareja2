import { Schema, model } from "mongoose";

const pdfSchema = new Schema({
    idDoctor: String,
    nombre: String,
    pdfPacientes: String
});

export const Pdf = model('pdfs', pdfSchema); 