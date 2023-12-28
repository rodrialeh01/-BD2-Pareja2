import { Photo } from '../db/mongo/models/photo.model.js';
import { NeoConnect } from '../db/neo4j/neoConnection.js';
import { cifrarPassword, compararPassword } from '../utils/index.js';

// Registro de un doctor
export const registrarDoctor = async (req, res) => {
    const { nombres, apellidos, usuario, correo, edad, especialidad, web, password } = req.body;
    const imagen = req.body.imagen;

    if(!nombres || !apellidos || !usuario || !correo || !edad || !especialidad || !password || !imagen) {
        return res.status(400).json({ msg: 'Por favor, llene todos los campos' });
    }

    try{
        //obteniendo el driver
        const driver = await NeoConnect();
        const session = driver.session(); //abriendo una sesión
        const queriValidation = `MATCH (d:Doctor {correo: '${correo}'}) RETURN COUNT(d) AS count`;
        const result = await session.run(queriValidation);
        const count = result.records[0].get('count').low;

        if(count > 0){
            return res.status(400).json({
                msg: 'El correo ya está registrado'
            });
        }

        Photo.create({
            correo: correo,
            image: imagen
        })

        const nuevaFoto = await Photo.findOne({ correo: correo }).select('_id');
        const idFoto = nuevaFoto._id;
        const pwdcifrado = await cifrarPassword(password);

        const cypherQuery = `CREATE (d:Doctor {nombre: '${nombres}', apellido: '${apellidos}', usuario: '${usuario}', fotoID: '${idFoto}', edad: ${edad}, especialidad: '${especialidad}', correo: '${correo}', web: '${web}', password: '${pwdcifrado}'}) RETURN d`;
        await session.run(cypherQuery);

        return res.status(200).json({
            msg: 'Doctor registrado exitosamente'
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            msg: 'Error en el servidor'
        });
    }

}

// Inicio de sesión de un doctor

export const loginDoctor = async (req, res) => {
    const { correo, password } = req.body;

    if(!correo || !password){
        return res.status(400).json({
            msg: 'Por favor, llene todos los campos'
        });
    }

    try{
        const driver = await NeoConnect();
        const session = driver.session();
        const cypherQuery = `MATCH (d:Doctor {correo: '${correo}'}) RETURN d`;
        const result = await session.run(cypherQuery);
        const doctor = result.records[0].get('d').properties;

        if(!doctor){
            return res.status(400).json({
                msg: 'No existe un doctor con ese correo'
            });
        }

        const pwdCifrado = doctor.password;
        const comparacion = await compararPassword(password, pwdCifrado);

        if(!comparacion){
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }

        return res.status(200).json({
            msg: 'Inicio de sesión exitoso',
            id: result.records[0].get('d').elementId
        });

    }catch(error){
        console.log(error);
        return res.status(400).json({
            msg: 'Error en el servidor'
        });
    }
}