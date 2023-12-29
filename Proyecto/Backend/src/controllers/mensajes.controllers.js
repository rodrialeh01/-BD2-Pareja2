import { NeoConnect } from '../db/neo4j/neoConnection.js';

export const getChat = async (req, res) => {
    try {

        //obteniendo el driver
        const driver = await NeoConnect();
        const session = driver.session(); //abriendo una sesión
        const id1 = req.params.id;
        const id2 = req.body.id;

        const query = `MATCH (n:Chat)
        WHERE (n.id1 = '${id1}' AND n.id2 = '${id2}') OR (n.id1 = '${id2}' AND n.id2 = '${id1}')
        RETURN n;`;


        const result = await session.run(query);
        await session.close();

        console.log(result)

        

        console.log(query);

        return res.status(200).json(result.records[0].get(0).properties);





    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el chat' });
    }
}
