import inquirer from 'inquirer';
import { color } from '../utils/index.js';
import { MenuHospital } from '../menu_hospital/menuPrincipal.js';
import { db_users, db_root } from '../db.js';

export const VerRespaldo = ({usuario}, {password}) => {
    console.log(`${color(66,135,245)}------------------VER BACKUPS------------------\x1b[0m`);
    inquirer.prompt([
        {
            type: 'list',
            name: 'op_menu',
            message: `${color(37, 230, 78)}¿DESEA VER TODOS LOS RESPALDOS CREADOS HASTA EL MOMENTO?: \x1b[0m`,
            choices: [
                {
                    name: 'SI',
                    value: true
                },
                {
                    name: 'NO',
                    value: false
                }
                
            ]
        }
    ]).then(async(answers) => {
        if (answers.op_menu == true) {
            try {
                const connRoot = await db_root.getConnection();
                

                await connRoot.query(`USE ${process.env.DB_NAME}`);
                await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Ver Backups', NOW())`);
                connRoot.release();

                const dataUser = db_users(usuario, password);
                const connection = await dataUser.getConnection();

                await connection.query(`USE ${process.env.DB_NAME}`);
                const data2 = await connection.query(`SELECT * FROM backups`);
                if (data2[0].length == 0) {
                    console.log(`${color(255, 0, 0)}NO HAY RESPALDOS CREADOS\x1b[0m`);
                    await connection.execute(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Ver Backups Fallido', NOW())`);

                    await connection.release();
                    MenuHospital({usuario}, {password});
                } else {
                    console.log(`${color(37, 230, 78)}------------------RESPALDOS CREADOS------------------\x1b[0m`);
                    console.table(data2[0]);
                    await connection.release();
                    MenuHospital({usuario}, {password});
                }
            }
            catch (err) {
                console.log(err);
                console.log(`${color(255, 0, 0)}[ERROR INTERNO] - Se reiniciará la aplicación \x1b[0m`);
                MenuHospital({usuario}, {password});
            }
        } else if (answers.op_menu == false) {
            MenuHospital({usuario}, {password});
        }
    });
}