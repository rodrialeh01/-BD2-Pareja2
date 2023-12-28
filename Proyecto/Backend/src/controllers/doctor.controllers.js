import { NeoConnect } from '../db/neo4j/neoConnection.js';

// Obtiene todos los doctores
export const getDoctores = async (req, res) => {
    const cypherQuery = `MATCH (d:Doctor) RETURN d`;

    //obteniendo el driver
    const driver = await NeoConnect();
    const session = driver.session(); //abriendo una sesión

    const result = await session.run(cypherQuery);
    const doctores = result.records.map(record => {
        return {
            id: record.get('d').elementId,
            nombre: record.get('d').properties.nombre,
            apellido: record.get('d').properties.apellido,
            usuario: record.get('d').properties.usuario,
            fotoID: record.get('d').properties.fotoID,
            edad: record.get('d').properties.edad.low,
            especialidad: record.get('d').properties.especialidad,
            correo: record.get('d').properties.correo,
            web: record.get('d').properties.web,
            password: record.get('d').properties.password
        }
    });
    return res.json(doctores);
}

// Obtiene un doctor por su id
export const getDoctor = async (req, res) => {
    console.log(req.params.id);
    const cypherQuery = `MATCH (d:Doctor) WHERE elementId(d) = '${req.params.id}' RETURN d`;

    //obteniendo el driver
    const driver = await NeoConnect();
    const session = driver.session(); //abriendo una sesión
    try {
        const result = await session.run(cypherQuery);
        const doctor = {
            id: result.records[0].get('d').elementId,
            nombre: result.records[0].get('d').properties.nombre,
            apellido: result.records[0].get('d').properties.apellido,
            usuario: result.records[0].get('d').properties.usuario,
            fotoID: result.records[0].get('d').properties.fotoID,
            edad: result.records[0].get('d').properties.edad.low,
            especialidad: result.records[0].get('d').properties.especialidad,
            correo: result.records[0].get('d').properties.correo,
            web: result.records[0].get('d').properties.web,
            password: result.records[0].get('d').properties.password
        }

        return res.json(doctor);
    } catch (error) {
        return res.json({ msg: 'Error al obtener el doctor' });
    }

}

// Obtiene todos los doctores excepto el que hace la petición
export const getDoctoresButMe = async (req, res) => {
    console.log(req.params.id);
    const cypherQuery = `
    MATCH (me:Doctor) WHERE elementId(me) = $myId
    MATCH (other:Doctor) WHERE NOT elementId(other) = $myId
    OPTIONAL MATCH (me)-[:AMIGO]-(other)
    OPTIONAL MATCH (me)-[:SOLICITUD]-(other)
    
    RETURN other,
       CASE WHEN other IS NOT NULL AND (me)-[:AMIGO]-(other) THEN true ELSE false END AS amigoExists,
       CASE WHEN other IS NOT NULL AND (me)-[:SOLICITUD]-(other) THEN true ELSE false END AS solicitudExists,
       CASE WHEN other IS NOT NULL AND me.especialidad = other.especialidad THEN true ELSE false END AS especialidadMatch;
    `;

    // Obtaining the driver
    const driver = await NeoConnect();
    const session = driver.session(); // Opening a session

    try {
        const result = await session.run(cypherQuery, { myId: req.params.id });
        const doctores = result.records.map(record => {
            const hasAmigo = record.get('amigoExists');
            const hasSolicitud = record.get('solicitudExists');
            const hasEspecialidadMatch = record.get('especialidadMatch');
            return {
                id: record.get('other').elementId,
                nombre: record.get('other').properties.nombre,
                apellido: record.get('other').properties.apellido,
                usuario: record.get('other').properties.usuario,
                fotoID: record.get('other').properties.fotoID,
                edad: record.get('other').properties.edad.low,
                especialidad: record.get('other').properties.especialidad,
                correo: record.get('other').properties.correo,
                password: record.get('other').properties.password,
                amigo: hasAmigo,
                solicitud: hasSolicitud,
                especialidadMatch: hasEspecialidadMatch
            };
        });

        return res.json(doctores);
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
};

// Realiza una solicitud de amistad
export const mandarSolicitud = async (req, res) => {
    const query = `MATCH (doc1: Doctor) WHERE elementId(doc1)='${req.params.id}'
    MATCH (doc2: Doctor) WHERE elementId(doc2)='${req.body.id}'
    OPTIONAL MATCH (doc1)-[:AMIGO]->(doc2)
    OPTIONAL MATCH (doc2)-[:AMIGO]->(doc1)
    
    WHERE doc1 <> doc2 AND doc2 IS NULL
    MERGE (doc1)-[:SOLICITUD]->(doc2);`;
    //obteniendo el driver
    const driver = await NeoConnect();
    const session = driver.session(); //abriendo una sesión
    try {
        let result = await session.run(query);
        //mensaje del resultado:
        if (result.summary.counters._stats.relationshipsCreated == 0) {
            return res.json({ msg: 'Ya se ha enviado una solicitud o ya somos amigos' });
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ msg: 'Error al enviar la solicitud' });
    }
    return res.json({ msg: 'Solicitud enviada' });
}

// Acepta una solicitud de amistad
export const aceptarSolicitud = async (req, res) => {
    const query = `MATCH (doc1: Doctor) WHERE elementId(doc1)='${req.body.id}' 
    MATCH (doc2: Doctor) WHERE elementId(doc2)='${req.params.id}' 
    MATCH (doc1)-[s:SOLICITUD]->(doc2) 
    DELETE s 
    MERGE (doc1)-[:AMIGO]->(doc2)
    MERGE (doc2)-[:AMIGO]->(doc1)
    `;
    //obteniendo el driver
    const driver = await NeoConnect();
    const session = driver.session(); //abriendo una sesión
    try {
        let result = await session.run(query);
        //mensaje del resultado:
        if (result.summary.counters._stats.relationshipsCreated == 0) {
            return res.json({ msg: 'Ya se ha aceptado la solicitud' });
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ msg: 'Error al aceptar la solicitud' });
    }
    return res.json({ msg: 'Solicitud aceptada' });
}

// Rechaza una solicitud de amistad
export const rechazarSolicitud = async (req, res) => {
    const query = `MATCH (doc1: Doctor) WHERE elementId(doc1)='${req.params.id}' MATCH (doc2: Doctor) WHERE elementId(doc2)='${req.body.id}' MATCH (doc2)-[s:SOLICITUD]->(doc1) DELETE s`;
    //obteniendo el driver
    const driver = await NeoConnect();
    const session = driver.session(); //abriendo una sesión
    try {
        let result = await session.run(query);
        //mensaje del resultado:
        if (result.summary.counters._stats.relationshipsDeleted == 0) {
            return res.json({ msg: 'No existía solicitud' });
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ msg: 'Error al rechazar la solicitud' });
    }
    return res.json({ msg: 'Solicitud rechazada' });
}

// Obtiene las solicitudes que ha recibido un doctor y que no ha mandado él
export const getSolicitudes = async (req, res) => {
    const cypherQuery = `MATCH (d2:Doctor)-[:SOLICITUD]->(d:Doctor) WHERE elementId(d) = '${req.params.id}' AND NOT (d2:Doctor)-[:AMIGO]->(d:Doctor) RETURN d2`;

    //obteniendo el driver
    const driver = await NeoConnect();
    const session = driver.session(); //abriendo una sesión

    const result = await session.run(cypherQuery);
    const doctores = result.records.map(record => {
        return {
            id: record.get('d2').elementId,
            nombre: record.get('d2').properties.nombre,
            apellido: record.get('d2').properties.apellido,
            usuario: record.get('d2').properties.usuario,
            fotoID: record.get('d2').properties.fotoID,
            edad: record.get('d2').properties.edad.low,
            especialidad: record.get('d2').properties.especialidad,
            correo: record.get('d2').properties.correo,
            password: record.get('d2').properties.password
        }
    });
    return res.json(doctores);
}

// Obtiene los amigos de un doctor
export const getAmigos = async (req, res) => {
    const cypherQuery = `MATCH (d:Doctor)-[:AMIGO]->(d2:Doctor) 
    WHERE elementId(d) = '${req.params.id}' RETURN d2`;

    //obteniendo el driver
    const driver = await NeoConnect();
    const session = driver.session(); //abriendo una sesión

    const result = await session.run(cypherQuery);
    const doctores = result.records.map(record => {
        return {
            id: record.get('d2').elementId,
            nombre: record.get('d2').properties.nombre,
            apellido: record.get('d2').properties.apellido,
            usuario: record.get('d2').properties.usuario,
            fotoID: record.get('d2').properties.fotoID,
            edad: record.get('d2').properties.edad.low,
            especialidad: record.get('d2').properties.especialidad,
            correo: record.get('d2').properties.correo,
            password: record.get('d2').properties.password
        }
    });
    return res.json(doctores);
}

// Obtiene los amigos de los amigos del doctor que hace la petición y que no sean amigos ni hayan recibido solicitud mia
export const getFriendsOfFriends = async (req, res) => {
    const cypherQuery = `
    MATCH (me:Doctor) WHERE elementId(me) = '${req.params.id}' 
    MATCH (me)-[:AMIGO]->(d2:Doctor)-[:AMIGO]->(d3:Doctor)
    OPTIONAL MATCH (me)-[:SOLICITUD]-(solicitudD3:Doctor)
    WHERE NOT (me)-[:AMIGO]-(d3) AND NOT (me)-[:SOLICITUD]-(d3) AND NOT elementId(d3) = '${req.params.id}' 

RETURN d3,
   CASE WHEN d3 IS NOT NULL AND (me)-[:SOLICITUD]-(d3) THEN true ELSE false END AS solicitudExists,
   CASE WHEN d3 IS NOT NULL AND (me)-[:AMIGO]-(d3) THEN true ELSE false END AS amigoExists,
   CASE WHEN d3 IS NOT NULL AND me = d3 THEN true ELSE false END AS soyYo;
    `;

    //obteniendo el driver
    const driver = await NeoConnect();
    const session = driver.session(); //abriendo una sesión

    const result = await session.run(cypherQuery);
    

    if (result.records.length == 0) {
        return res.json([]);
    }

    if (result.records[0].get('d3') == null || result.records[0].get('d3') == undefined) {
        return res.json([]);
    }
    const resultArray = [];
    
    for (const record of result.records) {
        const hasSolicitud = record.get('solicitudExists');
        const hasAmigo = record.get('amigoExists');
    
        if (record.get('soyYo') === false) {
            const doctorProperties = record.get('d3').properties;
            const doctorObject = {
                id: record.get('d3').elementId,
                nombre: doctorProperties.nombre,
                apellido: doctorProperties.apellido,
                usuario: doctorProperties.usuario,
                fotoID: doctorProperties.fotoID,
                edad: doctorProperties.edad.low,
                especialidad: doctorProperties.especialidad,
                correo: doctorProperties.correo,
                password: doctorProperties.password,
                solicitud: hasSolicitud,
                amigo: hasAmigo,
                soyYo: record.get('soyYo')
            };
    
            resultArray.push(doctorObject);
        }
    }
    return res.json(resultArray);
}

// Elimina la relación de amistad entre dos doctores
export const deleteFriend = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body.id);

    const cypherQuery = `
    MATCH (me:Doctor) WHERE elementId(me) = '${req.params.id}' 
    MATCH (me)-[r:AMIGO]-(d2:Doctor) WHERE elementId(d2) = '${req.body.id}'
    DELETE r
    RETURN me, d2;
    `;

    //obteniendo el driver
    const driver = await NeoConnect();
    const session = driver.session(); //abriendo una sesión
    try {
        const result = await session.run(cypherQuery);
        if (result.summary.counters._stats.relationshipsDeleted == 0) {
            return res.json({ msg: 'No existe la relación' }, 500);
        }

        return res.json({ msg: 'Relación eliminada' });

        
    } catch (error) {
    } finally {
        await session.close();
    }
    
}


