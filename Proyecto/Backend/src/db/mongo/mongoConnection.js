import mongoose from 'mongoose';
import { MongoConfig } from '../../config/credentials.js';

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