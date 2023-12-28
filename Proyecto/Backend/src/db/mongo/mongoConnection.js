import mongoose from 'mongoose';
import { MongoConfig } from '../../config/credentials.js';
import { Paciente } from './models/paciente.model.js';
import { Habitacion } from './models/habitacion.model.js';
import { LogActividad } from './models/log_actividad.model.js';
import { LogHabitacion } from './models/log_habitacion.model.js';
import { Pdf } from './models/pdf.model.js';
import { Photo } from './models/photo.model.js';

export const connectMongo = async () => {
    let url = `mongodb://${MongoConfig.host}:${MongoConfig.port}/${MongoConfig.database}`;

    if (MongoConfig.user && MongoConfig.password) {
        url = `mongodb://${MongoConfig.user}:${MongoConfig.password}@${MongoConfig.host}:${MongoConfig.port}/${MongoConfig.database}?authSource=admin`;
    }

    try {
        await mongoose.connect(url, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });

        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed');
        throw error;
    }
};