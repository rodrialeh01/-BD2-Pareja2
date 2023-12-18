import inquirer from 'inquirer';
import { color } from '../utils/index.js';
import { MenuHospital } from '../menu_hospital/menuPrincipal.js';
import { db_users, db_root } from '../db.js';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const HacerRespaldo = ({ usuario }, {password}) => {
    console.log(`${color(66, 135, 245)}------------------CREACIÓN DE BACKUP------------------\x1b[0m`);
    inquirer.prompt([
        {
            type: 'list',
            name: 'op_menu',
            message: `${color(37, 230, 78)}¿DESEA CREAR UN BACKUP COMPLETO HASTA ESTE MOMENTO?: \x1b[0m`,
            choices: [
                {
                    name: 'SI',
                    value: true
                },
                {
                    name: 'NO',
                    value: false
                },

            ]
        }
    ]).then(async (answers) => {
        if (answers.op_menu == true) {
            const connRoot = await db_root.getConnection();
            await connRoot.query(`USE ${process.env.DB_NAME}`);
            await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Creación de Backup Completo', NOW())`);
            await connRoot.release();
            
            const dataUser = db_users(usuario, password);
            const connection = await dataUser.getConnection();

            await connection.query(`USE ${process.env.DB_NAME}`);

            let id = await connection.query(`SELECT MAX(idBackup) AS id FROM backups`);
            if (id[0][0].id == null) {
                id = 1;
            }
            else {
                id = id[0][0].id + 1;
            }
            let nombreBackup = `backup${id}.sql`;

            
            const backupFilePath = path.join(__dirname, `../backups/${nombreBackup}`);


            let query = `mysqldump -u ${usuario} -p${password} ${process.env.DB_NAME} > ${nombreBackup}`;
            await connection.query(`INSERT INTO backups (nombreBackup, fechaHoraAccion) VALUES ('${nombreBackup}', NOW())`);
            exec(query, (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    console.log(`${color(255, 0, 0)}[ERROR INTERNO] - Se reiniciará la aplicación \x1b[0m`);
                    connection.release();
                    MenuPrincipal();
                }
                else {
                    console.log(`${color(37, 230, 78)}SE HA CREADO EL BACKUP (${nombreBackup}) CON EXITO\x1b[0m`);
                    connection.query(`INSERT INTO backups (nombreBackup, fechaHoraBackup) VALUES ('${nombreBackup}', NOW())`);
                    connection.release();
                    MenuHospital({ usuario }, {password});
                }
            }
            );


        } else if (answers.op_menu == false) {
            MenuHospital({ usuario }, {password});
        }
    });
}