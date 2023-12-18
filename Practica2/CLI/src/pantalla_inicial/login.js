import inquirer from 'inquirer';
import { color } from '../utils/index.js';
import { db_users, db_root, db_login } from '../db.js';
import { MenuPrincipal } from './menuPrincipal.js';

import { MenuHospital } from '../menu_hospital/menuPrincipal.js';

export const Login = async () => {
    console.log(`${color(66, 135, 245)}------------------INICIO DE SESION------------------\x1b[0m`);
    try {
        inquirer.prompt([
            {
                type: 'input',
                name: 'User',
                message: 'INGRESE USUARIO: ',
            },
            {
                type: 'password',
                name: 'password',
                mask: '*',
                message: 'INGRESE PASSWORD: ',
            }
        ]).then(async (answers) => {
            const usuario = answers.User;
            const password = answers.password;
            const dataUser = db_login(answers.User, answers.password);
            const connection = await dataUser.getConnection();
            try {

                console.log(`${color(37, 230, 78)}INICIO DE SESION EXITOSO\x1b[0m`);
                
                const connRoot = await db_root.getConnection();
                await connRoot.query(`USE ${process.env.DB_NAME}`);
                let rol = await connRoot.query(`SELECT rol FROM usuario WHERE nombre = '${usuario}'`);
                let rolUser = rol[0][0].rol;
                connRoot.release();
                
                const roles = ['Administrador', 'Asistente', 'Doctor', 'Soporte'];
                const rolUsuario = roles[rolUser - 1];
                await connection.execute(`SET ROLE ${rolUsuario}`);
                connection.release();
                try {
                    await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Inicio de sesion', NOW())`);
                    await connRoot.release();

                } catch (err) {
                    await connRoot.release();
                    console.log(`${color(255, 0, 0)} ${err.message}`);
                    console.log(`${color(255, 0, 0)}[ERROR INTERNO] - Se reiniciará la aplicación \x1b[0m`);
                    MenuPrincipal();
                }

                MenuHospital({ usuario }, { password });
            }
            catch (err) {
                connection.release();
                console.log(`${color(255, 0, 0)} ${err.message}`);
                console.log(`${color(255, 0, 0)}ERROR AL INICIAR SESION\x1b[0m`);
                MenuPrincipal();

            }
        });
    } catch (err) {
        
        console.log(`${color(255, 0, 0)} ${err.message}`);
        console.log(`${color(255, 0, 0)}ERROR AL INICIAR SESION\x1b[0m`);
        MenuPrincipal();
    }
}