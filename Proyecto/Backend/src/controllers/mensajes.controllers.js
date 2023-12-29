import { NeoConnect } from '../db/neo4j/neoConnection.js';

export const getChat = async (req, res) => {
    try {

        //obteniendo el driver
        const driver = await NeoConnect();
        const session = driver.session(); //abriendo una sesión
        console.log(req.params.id);
        console.log(req.body);
        const id1 = req.params.id;
        const id2 = req.body.id;

        const query = `MATCH (n:Chat)
        WHERE (n.doctor1 = '${id1}' AND n.doctor2 = '${id2}') OR (n.doctor1 = '${id2}' AND n.doctor2 = '${id1}')
        RETURN n;`;

        const result = await session.run(query);
        await session.close();
        return res.status(200).json(result.records[0].get(0).properties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el chat' });
    }
}

export const insertMessage = async (req, res) => {
    let data = req.body;

    try {
        //obteniendo el driver
        const driver = await NeoConnect();
        const session = driver.session(); //abriendo una sesión

        const query = `MATCH (n:Chat)
        WHERE (n.doctor1 = '${data.docFrom}' AND n.doctor2 = '${data.docTo}') OR (n.doctor1 = '${data.docTo}' AND n.doctor2 = '${data.docFrom}')
        RETURN n;`;

        const tempRes = await session.run(query);
        
        let contador = 0;
        console.log(Object.keys(tempRes.records[0].get(0).properties).length);
        if(Object.keys(tempRes.records[0].get(0).properties).length == 3){
            contador = 1;
        }
        else{
            contador = Object.keys(tempRes.records[0].get(0).properties).length - 2;
        }

        const query2 = `MATCH (n:Chat)
        WHERE (n.doctor1 = '${data.docFrom}' AND n.doctor2 = '${data.docTo}') OR (n.doctor1 = '${data.docTo}' AND n.doctor2 = '${data.docFrom}')
        SET n.message${contador} = ['${data.docFrom}', '${data.mensaje}']`;

        console.log(query2);

        const result = await session.run(query2);
        await session.close();

        return res.status(200).json({ message: 'Mensaje insertado correctamente' });
        //console.log(result)

        //return res.status(200).json({ message: 'Mensaje insertado correctamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al insertar el mensaje' });
    }
}