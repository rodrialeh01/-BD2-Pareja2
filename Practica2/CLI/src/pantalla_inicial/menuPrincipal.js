import inquirer from 'inquirer';
import { color } from '../utils/index.js';
import { Login } from './login.js';
import { Registro } from '../auth/registro.js'
import { db_root } from '../db.js';

export const MenuPrincipal = async () => {
    CreateRoles();
    console.log(`${color(66, 135, 245)}------------------CLI HOSPITAL * BIENVENIDO------------------\x1b[0m`);
    inquirer.prompt([
        {
            type: 'list',
            name: 'op_menu',
            message: `${color(37, 230, 78)}MENÚ: \x1b[0m`,
            choices: [
                {
                    name: '1 - INICIAR SESIÓN',
                    value: 1
                },
                {
                    name: '2 - REGISTRAR UN USUARIO',
                    value: 2
                },
                {
                    name: '3 - SALIR',
                    value: 3
                }
            ]
        }
    ]).then((answers) => {
        //console.log(answers);
        if (answers.op_menu == 1) {
            Login();
        } else if (answers.op_menu == 2) {
            Registro();
        } else if (answers.op_menu == 3) {
            console.log(`${color(66, 135, 245)}------------------GRACIAS POR USAR CLI HOSPITAL------------------\x1b[0m`);
            process.exit();
        }
    });
}

async function CreateRoles() {
    const query = `CREATE ROLE IF NOT EXISTS 'Administrador', 'Doctor';`;

    try {
        const connection = await db_root.getConnection();
        const res= await connection.query(query);
        // console.log(res);

        const query2 = `GRANT ALL PRIVILEGES ON BD2P2.* TO 'Administrador'`;
        const res2= await connection.query(query2);
       // console.log(res2);

        const query3 = `GRANT SELECT ON BD2P2.paciente TO 'Doctor'`;
        const res3= await connection.query(query3);
        //console.log(res3);

        connection.release();
    } catch (err) {
        console.log(err);
    }

}

