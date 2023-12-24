import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { connectMongo } from "./db/mongo/mongoConnection.js";
import { NeoConnect } from './db/neo4j/neoConnection.js';
import authHandler from './routes/auth.routes.js';
import doctorHandler from './routes/doctor.routes.js';
import error404Handler from './routes/error404.routes.js';
import mensajesHandler from './routes/mensajes.routes.js';
import pacientesHandler from './routes/pacientes.routes.js';
import publicacionesHandler from './routes/publicaciones.routes.js';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

const startDB = async () => {
    try {
        await connectMongo();
        await NeoConnect();
        console.log('Conexiones establecidas correctamente');
    } catch (error) {
        console.error('Error al establecer las conexiones:', error);
    }
};

startDB();

app.use('/auth', authHandler);
app.use('/doctor', doctorHandler);
app.use('/mensaje', mensajesHandler);
app.use('/paciente', pacientesHandler);
app.use('/publicacion', publicacionesHandler);
app.use(error404Handler);


export default app;
