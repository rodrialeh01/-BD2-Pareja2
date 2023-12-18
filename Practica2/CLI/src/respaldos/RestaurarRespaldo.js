import inquirer from 'inquirer';
import { color } from '../utils/index.js';
import { MenuHospital } from '../menu_hospital/menuPrincipal.js';
import { db_users, db_root } from '../db.js';
import { exec } from 'child_process';

export const RestaurarRespaldo = ({usuario}, {password}) => {
    console.log(`${color(66,135,245)}------------------RESTAURAR BACKUP------------------\x1b[0m`);
    inquirer.prompt([
        {
            type: 'list',
            name: 'op_menu',
            message: `${color(37, 230, 78)}¿DESEA RESTAURAR ALGÚN BACKUP?: \x1b[0m`,
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
        inquirer.prompt({
            type: 'input',
            name: 'nombreBackup',
            message: `${color(37, 230, 78)}INGRESE EL NOMBRE DEL BACKUP QUE DESEA RESTAURAR (ej. backup1.sql): \x1b[0m`,
        }).then(async (answers2) => {
            if (answers.op_menu == true) {
                const dataUser = db_users(usuario, password);
                const connection = await dataUser.getConnection();
                
                await connection.query(`USE ${process.env.DB_NAME}`);
                let nombreBackup = answers2.nombreBackup;
    
                let query = `mysql -u ${usuario} -p${password} ${process.env.DB_NAME} < ${nombreBackup}`;
                await connection.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Restauración de Backup', NOW())`);
    
                exec(query, (err, stdout, stderr) => {
                    if (err) {
                        console.log(err);
                        console.log(`${color(255, 0, 0)}[ERROR INTERNO] - Se reiniciará la aplicación \x1b[0m`);
                        connection.release();
                        MenuPrincipal();
                    }
                    else {
                        console.log(`${color(37, 230, 78)}BACKUP RESTAURADO EXITOSAMENTE\x1b[0m`);
                        
                        connection.release();
                        MenuHospital({usuario}, {password});
                    }
                });
            } else if (answers.op_menu == false) {
                MenuHospital({usuario}, {password});
            }
        });
    });
}