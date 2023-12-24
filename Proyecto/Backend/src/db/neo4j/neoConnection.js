import neo4j from 'neo4j-driver';
import { Neo4jConfig } from '../../config/credentials.js';

let driver;

export const NeoConnect = async () => {
    try {
        // Verifica si ya hay una conexión establecida
        if (!driver) {
            driver = neo4j.driver(
                `bolt://${Neo4jConfig.host}:${Neo4jConfig.port}`,
                neo4j.auth.basic(`${Neo4jConfig.user}`, `${Neo4jConfig.dbpassword}`),
                { database: Neo4jConfig.database }
            );
            console.log('Conexión a Neo4j establecida');
        }
        return driver;
    } catch (error) {
        console.error('Error al conectar a Neo4j:', error);
        throw error; 
    }
};

export const closeNeoConnection = () => {
    if (driver) {
        driver.close();
        console.log('Conexión a Neo4j cerrada');
    }
};