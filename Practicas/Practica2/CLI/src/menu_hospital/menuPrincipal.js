import inquirer from 'inquirer';
import { ActualizarRegistro } from '../crudbd/actualizar.js';
import { AgregarRegistro } from '../crudbd/agregar.js';
import { ConsultarRegistro } from '../crudbd/consulta.js';
import { EliminarRegistro } from '../crudbd/eliminar.js';
import { db_root } from '../db.js';
import { Login } from '../pantalla_inicial/login.js';
import { HacerRespaldo } from '../respaldos/HacerRespaldo.js';
import { RestaurarRespaldo } from '../respaldos/RestaurarRespaldo.js';
import { VerRespaldo } from '../respaldos/VerRespaldo.js';
import { color } from '../utils/index.js';
import { MenuPrincipal } from '../pantalla_inicial/menuPrincipal.js';

export const MenuHospital = ({ usuario }, { password }) => {
    console.log(`${color(66, 135, 245)}------------------BIENVENIDO ${usuario}------------------\x1b[0m`);
    inquirer.prompt([
        {
            type: 'list',
            name: 'op_menu',
            message: `${color(37, 230, 78)}SELECCIONE LA ACCION QUE QUIERA REALIZAR: \x1b[0m`,
            choices: [
                {
                    name: '1 - CONSULTAS',
                    value: 1
                },
                {
                    name: '2 - ACTUALIZAR REGISTROS',
                    value: 2
                },
                {
                    name: '3 - AGREGAR REGISTROS',
                    value: 3
                },
                {
                    name: '4 - ELIMINAR REGISTROS',
                    value: 4
                },
                {
                    name: '5 - REALIZAR RESPALDO COMPLETO',
                    value: 5
                },
                {
                    name: '6 - VER RESPALDOS REALIZADOS',
                    value: 6
                },
                {
                    name: '7 - RESTAURAR RESPALDO',
                    value: 7
                },
                {
                    name: '8 - SALIR',
                    value: 8
                }
            ]
        }
    ]).then(async (answers) => {
        if (answers.op_menu == 1) {
            ConsultarRegistro({ usuario }, { password });
        }
        else if (answers.op_menu == 2) {
            ActualizarRegistro({ usuario }, { password })
        }
        else if (answers.op_menu == 3) {
            AgregarRegistro({ usuario }, { password })
        }
        else if (answers.op_menu == 4) {
            EliminarRegistro({ usuario }, { password })
        }
        else if (answers.op_menu == 5) {
            try {
                const connRoot = await db_root.getConnection();
                await connRoot.query(`USE mysql`);
                const [users,] = await connRoot.execute('SELECT * FROM USER');

                let verificacionAdmin = false;

                for (let i = 0; i < users.length; i++) {
                    if (users[i].User === usuario && usuario === 'admin') {
                        verificacionAdmin = true;
                    }
                }
                connRoot.release();

                if (verificacionAdmin) {
                    HacerRespaldo({ usuario }, { password });
                } else {
                    console.log(`${color(255, 0, 0)}[ERROR] - No tiene permisos para realizar esta accion \x1b[0m`);
                    console.log(`${color(255, 0, 0)}[ERROR] - No tiene permisos para realizar esta accion \x1b[0m`);
                    const connRoot = await db_root.getConnection();
                    await connRoot.query(`USE ${process.env.DB_NAME}`);
                    await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', '[ERROR] - Error al intentar crear respado, no posee permisos suficientes.', NOW())`);
                    await connRoot.release();
                    MenuHospital({ usuario }, { password });
                    MenuHospital({ usuario }, { password });
                }

            } catch (err) {
                console.log(`${color(255, 0, 0)} ${err.message}`);
                console.log(`${color(255, 0, 0)}[ERROR INTERNO] - Se reiniciará la aplicación \x1b[0m`);

                console.log(`${color(255, 0, 0)}[ERROR] - No tiene permisos para realizar esta accion \x1b[0m`);
                const connRoot = await db_root.getConnection();
                await connRoot.query(`USE ${process.env.DB_NAME}`);
                await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', '[ERROR] - Error al intentar crear conexión.', NOW())`);
                await connRoot.release();
                MenuHospital({ usuario }, { password });
            }
        }
        else if (answers.op_menu == 6) {
            try {
                const connRoot = await db_root.getConnection();
                await connRoot.query(`USE mysql`);
                const [users,] = await connRoot.execute('SELECT * FROM USER');

                let verificacionAdmin = false;

                for (let i = 0; i < users.length; i++) {
                    if (users[i].User === usuario && usuario === 'admin') {
                        verificacionAdmin = true;
                    }
                }
                connRoot.release();
                if (verificacionAdmin) {
                    VerRespaldo({ usuario }, { password });
                } else {
                    console.log(`${color(255, 0, 0)}[ERROR] - No tiene permisos para realizar esta accion \x1b[0m`);
                    const connRoot = await db_root.getConnection();
                    await connRoot.query(`USE ${process.env.DB_NAME}`);
                    await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', '[ERROR] - Error al intentar ver los respados, no posee permisos suficientes.', NOW())`);
                    await connRoot.release();
                    MenuHospital({ usuario }, { password });
                }

            } catch (err) {
                console.log(`${color(255, 0, 0)} ${err.message}`);
                console.log(`${color(255, 0, 0)}[ERROR INTERNO] - Se reiniciará la aplicación \x1b[0m`);
                console.log(`${color(255, 0, 0)}[ERROR] - No tiene permisos para realizar esta accion \x1b[0m`);
                const connRoot = await db_root.getConnection();
                await connRoot.query(`USE ${process.env.DB_NAME}`);
                await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', '[ERROR] - Error al intentar crear conexión.', NOW())`);
                await connRoot.release();
                MenuHospital({ usuario }, { password });
            }
        }
        else if (answers.op_menu == 7) {
            try {
                const connRoot = await db_root.getConnection();
                await connRoot.query(`USE mysql`);
                const [users,] = await connRoot.execute('SELECT * FROM USER');

                let verificacionAdmin = false;

                for (let i = 0; i < users.length; i++) {
                    if (users[i].User === usuario && usuario === 'admin') {
                        verificacionAdmin = true;
                    }
                }
                connRoot.release();
                if (verificacionAdmin) {
                    RestaurarRespaldo({ usuario }, { password });
                } else {
                    console.log(`${color(255, 0, 0)}[ERROR] - No tiene permisos para realizar esta accion \x1b[0m`);
                    MenuHospital({ usuario }, { password });
                }

            } catch (err) {
                console.log(`${color(255, 0, 0)} ${err.message}`);
                console.log(`${color(255, 0, 0)}[ERROR INTERNO] - Se reiniciará la aplicación \x1b[0m`);
                console.log(`${color(255, 0, 0)}[ERROR] - No tiene permisos para realizar esta accion \x1b[0m`);
                const connRoot = await db_root.getConnection();
                await connRoot.query(`USE ${process.env.DB_NAME}`);
                await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', '[ERROR] - Error al intentar crear conexión.', NOW())`);
                await connRoot.release();
                
                MenuHospital({ usuario }, { password });

            }
        }
        else if (answers.op_menu == 8) {
            MenuPrincipal();
        }

    });
}