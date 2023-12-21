import inquirer from 'inquirer';
import { color } from '../utils/index.js';
import { MenuHospital } from '../menu_hospital/menuPrincipal.js';
import { db_users, db_root } from '../db.js';
import { exec } from 'child_process';

export const HacerRespaldo = ({ usuario }, { password }) => {
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

            const now = new Date();

            const dd = String(now.getDate()).padStart(2, '0');
            const MM = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
            const YYYY = now.getFullYear();
            const HH = String(now.getHours()).padStart(2, '0');
            const mm = String(now.getMinutes()).padStart(2, '0');
            const ss = String(now.getSeconds()).padStart(2, '0');

            let date = `${dd}-${MM}-${YYYY}_${HH}_${mm}_${ss}`;
            

            let nombreBackup = `backup${date}.sql`;
            let query = `mysqldump -u ${usuario} -p${password} ${process.env.DB_NAME} > ./backups/${nombreBackup}`;
            await connection.query(`INSERT INTO backups (nombreBackup, fechaHoraAccion) VALUES ('${nombreBackup}', NOW())`);
            exec(query, async (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    console.log(`${color(255, 0, 0)}[ERROR INTERNO] - Se reiniciará la aplicación \x1b[0m`);
                    console.log(`${color(255, 0, 0)}BACKUP NO CREADO\x1b[0m`);

                    await connection.execute(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Creación de Backup Fallida', NOW())`);
                    await connection.release();
                }
                else {
                    console.log(`${color(37, 230, 78)}SE HA CREADO EL BACKUP (${nombreBackup}) CON EXITO\x1b[0m`);
                    await connection.release();
                    MenuHospital({ usuario }, { password });
                }
            }
            );


        } else if (answers.op_menu == false) {
            MenuHospital({ usuario }, { password });
        }
    });
}