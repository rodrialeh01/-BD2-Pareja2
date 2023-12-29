import { Photo } from '../db/mongo/models/photo.model.js';
import { NeoConnect } from '../db/neo4j/neoConnection.js';
import { compararPorTiempo } from '../utils/index.js';
export const addPublicacion = async (req, res) => {
    const { id } = req.params;
    const { contenido, fechahora } = req.body;
    const cypherQuery = `
    MATCH (d:Doctor)-[:PUBLICA]->(p:Publicaciones)
    WHERE elementId(d) = '${id}'
    RETURN count(p) AS cantidadRelaciones
    `;
    const driver = await NeoConnect();
    const session = driver.session(); //abriendo una sesión

    try{
        const result1 = await session.run(cypherQuery);
        console.log(result1.records[0].get('cantidadRelaciones').low);
        if(result1.records[0].get('cantidadRelaciones').low > 0){
            const cypherQuery2 = `
            MATCH (d:Doctor)-[:PUBLICA]->(p:Publicaciones)
            WHERE elementId(d) = '${id}'
            RETURN p
            `;
            const result2 = await session.run(cypherQuery2);
            const listaPublicacionesString = result2.records[0].get('p').properties.listaPublicaciones;
            const listaPublicaciones = JSON.parse(listaPublicacionesString);
            console.log(listaPublicaciones)
            listaPublicaciones.push({
                contenido: contenido,
                tiempo: fechahora
            });
            const listaString = JSON.stringify(listaPublicaciones);
            console.log(listaString);
            const cypherQuery3 = `
            MATCH (d:Doctor)-[:PUBLICA]->(p:Publicaciones)
            WHERE elementId(d) = '${id}'
            SET p.listaPublicaciones = $listaPublicaciones
            `;
            await session.run(cypherQuery3, { listaPublicaciones: listaString });
            return res.status(200).json({ msg: 'Publicación creada' });
        }else{  
            const listaPublicaciones = [
                {
                    contenido: contenido,
                    tiempo: fechahora
                }
            ];
            const listaString = JSON.stringify(listaPublicaciones);

            const cypherQuery2 = `
                MATCH (d:Doctor) WHERE elementId(d) = $id
                MERGE (d)-[:PUBLICA]->(p:Publicaciones {listaPublicaciones: $listaPublicaciones})
            `;
            await session.run(cypherQuery2, { id: id, listaPublicaciones: listaString });
            return res.status(200).json({ msg: 'Publicación creada' });
        }
    }catch(error){
        console.log(error);
        return res.status(400).json({ msg: 'Error al crear la publicación' });
    }
}

export const getPublicaciones = async (req, res) => {
    const { id } = req.params;
    const cypherQueryMyposts = `
    MATCH (d:Doctor)-[:PUBLICA]->(publicacion:Publicaciones)
    WHERE elementId(d) = '${id}'
    RETURN d, publicacion
    `;
    const driver = await NeoConnect();
    const session = driver.session(); //abriendo una sesión
    try{
        const result = await session.run(cypherQueryMyposts);
        const publicaciones = JSON.parse(result.records[0].get('publicacion').properties.listaPublicaciones);
        const foto = await Photo.findById({ _id: result.records[0].get('d').properties.fotoID}, { image: 1 });
        const publicacionesMias = publicaciones.map((publicacion) => {
            return {
                ...publicacion,
                id: id,
                nombre: result.records[0].get('d').properties.nombre + ' ' + result.records[0].get('d').properties.apellido,
                username: result.records[0].get('d').properties.usuario,
                foto: foto.image
            };
        });
        const cypherQueryFriends = `
        MATCH (d:Doctor)-[:AMIGO]-(d2:Doctor)-[:PUBLICA]->(publicacion:Publicaciones)
        WHERE elementId(d) = '${id}'
        RETURN DISTINCT publicacion, d2
        `;
        const result2 = await session.run(cypherQueryFriends);
        console.log(result2.records)
        console.log(result2.records.length)
        for (const record of result2.records) {
            const publicacionesAmigo = JSON.parse(record.get('publicacion').properties.listaPublicaciones);
            console.log(publicacionesAmigo);
            const idAmigo = record.get('d2').elementId;
            console.log(idAmigo);
        
            const publicacionesAmigoPromises = publicacionesAmigo.map(async (publicacionAmigo) => {
                const fotoAmigo = await Photo.findById({ _id: record.get('d2').properties.fotoID }, { image: 1 });
                return {
                    ...publicacionAmigo,
                    id: idAmigo,
                    nombre: record.get('d2').properties.nombre + ' ' + record.get('d2').properties.apellido,
                    username: record.get('d2').properties.usuario,
                    foto: fotoAmigo.image
                };
            });
        
            const publicacionesAmigoFinal = await Promise.all(publicacionesAmigoPromises);
            publicacionesMias.push(...publicacionesAmigoFinal);
        }
        //console.info(publicacionesMias)
        const ordenadas = publicacionesMias.sort(compararPorTiempo);
        //console.log(ordenadas)
        return res.status(200).json(ordenadas);
    }catch(error){
        console.log(error);
        return res.status(400).json({ msg: 'Error al obtener las publicaciones' });
    }
}