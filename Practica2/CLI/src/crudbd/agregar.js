import inquirer from 'inquirer';
import { db_root, db_users } from '../db.js';
import { MenuHospital } from '../menu_hospital/menuPrincipal.js';
import { color } from '../utils/index.js';

export const AgregarRegistro = ({ usuario }, { password }) => {
    console.log(`${color(66, 135, 245)}------------------BIENVENIDO ${usuario}------------------\x1b[0m`);
    inquirer.prompt([
        {
            type: 'list',
            name: 'op_menu',
            message: `${color(37, 230, 78)}SELECCIONE LA TABLA A LA CUAL QUIERA AGREGAR UN REGISTRO: \x1b[0m`,
            choices: [
                {
                    name: '1 - PACIENTES',
                    value: 1
                },
                {
                    name: '2 - HABITACIONES',
                    value: 2
                },
                {
                    name: '3 - LOG ACTIVIDAD',
                    value: 3
                },
                {
                    name: '4 - LOG HABITACION',
                    value: 4
                }
            ]
        }
    ]).then(async (answers) => {
        try {
            const loguser = db_users(usuario, password);
            const connectionuser = await loguser.getConnection();
            if (usuario !== 'admin') {
                try {
                    const connRoot = await db_root.getConnection();
                    await connRoot.query(`USE ${process.env.DB_NAME}`);
                    let rol = await connRoot.query(`SELECT rol FROM usuario WHERE nombre = '${usuario}'`);
                    let rolUser = rol[0][0].rol;


                    const roles = ['Administrador', 'Asistente', 'Doctor', 'Soporte'];
                    const rolUsuario = roles[rolUser - 1];
                    console.log(rolUsuario);
                    connRoot.release();
                    await connectionuser.execute(`SET ROLE '${rolUsuario}'`);
                } catch (err) {
                    await connectionuser.release();
                    console.log(`${color(255, 0, 0)} ${err.message}`);
                    console.log(`${color(255, 0, 0)}[ERROR INTERNO] - Se reiniciará la aplicación \x1b[0m`);
                    const connRoot = await db_root.getConnection();
                    await connRoot.query(`USE ${process.env.DB_NAME}`);
                    await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', '[ERROR] - Error al intentar crear conexión en agregar registros.', NOW())`);
                    await connRoot.release();


                    MenuHospital({ usuario }, { password });
                }
            }
            if (answers.op_menu == 1) {
                inquirer.prompt([
                    {
                        type: 'number',
                        name: 'id_paciente',
                        message: `${color(37, 230, 78)}INGRESE ID DEL PACIENTE: \x1b[0m`
                    },
                    {
                        type: 'number',
                        name: 'edad',
                        message: `${color(37, 230, 78)}INGRESE EDAD DEL PACIENTE: \x1b[0m`
                    },
                    {
                        type: 'list',
                        name: 'genero',
                        message: `${color(37, 230, 78)}INGRESE GENERO DEL PACIENTE: \x1b[0m`,
                        choices: [
                            {
                                name: 'MASCULINO',
                                value: 'Masculino'
                            },
                            {
                                name: 'FEMENINO',
                                value: 'Femenino'
                            },
                            {
                                name: 'OTRO',
                                value: 'Otro'
                            }
                        ]
                    }
                ]).then(async (answers) => {
                    if (answers.id_paciente == '' || answers.edad == '' || answers.genero == '') {
                        console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                        MenuHospital({ usuario }, { password });
                    }
                    try {
                        await connectionuser.query(`INSERT INTO paciente (idPaciente, edad, genero) VALUES (?,?,?)`, [answers.id_paciente, answers.edad, answers.genero]);
                        await connectionuser.release();

                        const connRoot = await db_root.getConnection();
                        await connRoot.query(`USE ${process.env.DB_NAME}`);
                        await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Agregando un nuevo registro a paciente', NOW())`);
                        await connRoot.release();

                        console.log(`${color(37, 230, 78)}SE AGREGÓ UN REGISTRO\x1b[0m`);
                        MenuHospital({ usuario }, { password });
                    } catch (err) {
                        await connectionuser.release();
                        console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL AGREGAR UN REGISTRO\x1b[0m`);
                        console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)

                        const connRoot = await db_root.getConnection();
                        await connRoot.query(`USE ${process.env.DB_NAME}`);
                        await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Error al agregar un nuevo registro a paciente', NOW())`);
                        await connRoot.release();

                        MenuHospital({ usuario }, { password });
                    }
                });
            } else if (answers.op_menu == 2) {
                inquirer.prompt([
                    {
                        type: 'number',
                        name: 'id_habitacion',
                        message: `${color(37, 230, 78)}INGRESE ID DE LA HABITACIÓN: \x1b[0m`
                    },
                    {
                        type: 'input',
                        name: 'habitacion',
                        message: `${color(37, 230, 78)}INGRESE NOMBRE DE LA HABITACIÓN: \x1b[0m`
                    }
                ]).then(async (answers) => {
                    if (answers.habitacion == '' || answers.id_habitacion == '') {
                        console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                        MenuHospital({ usuario }, { password });
                    }
                    try {
                        await connectionuser.query(`INSERT INTO habitacion (idHabitacion, habitacion) VALUES (?,?)`, [answers.id_habitacion, answers.habitacion]);
                        await connectionuser.release();

                        const connRoot = await db_root.getConnection();
                        await connRoot.query(`USE ${process.env.DB_NAME}`);
                        await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Agregando un nuevo registro a habitacion', NOW())`);
                        await connRoot.release();

                        console.log(`${color(37, 230, 78)}SE AGREGÓ UN REGISTRO\x1b[0m`);
                        MenuHospital({ usuario }, { password });
                    } catch (err) {
                        await connectionuser.release();
                        console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL AGREGAR UN REGISTRO\x1b[0m`);
                        console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)

                        const connRoot = await db_root.getConnection();
                        await connRoot.query(`USE ${process.env.DB_NAME}`);
                        await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Error al agregar un nuevo registro a habitacion', NOW())`);
                        await connRoot.release();

                        MenuHospital({ usuario }, { password });
                    }
                });
            } else if (answers.op_menu == 3) {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'actividad',
                        message: `${color(37, 230, 78)}INGRESE ACTIVIDAD: \x1b[0m`
                    },
                    {
                        type: 'number',
                        name: 'id_paciente',
                        message: `${color(37, 230, 78)}INGRESE ID DEL PACIENTE: \x1b[0m`
                    },
                    {
                        type: 'number',
                        name: 'id_habitacion',
                        message: `${color(37, 230, 78)}INGRESE ID DE LA HABITACION: \x1b[0m`
                    }
                ]).then(async (answers) => {
                    if (answers.actividad == '' || answers.id_paciente == '' || answers.id_habitacion == '') {
                        console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                        MenuHospital({ usuario }, { password });
                    }
                    try {
                        await connectionuser.query(`INSERT INTO log_actividad (timestampx, actividad, idPaciente, idHabitacion) VALUES (?,?,?,?)`, ['NOW()', answers.actividad, answers.id_paciente, answers.id_habitacion]);
                        await connectionuser.release();

                        const connRoot = await db_root.getConnection();
                        await connRoot.query(`USE ${process.env.DB_NAME}`);
                        await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Agregando un nuevo registro a log_actividad', NOW())`);
                        await connRoot.release();

                        console.log(`${color(37, 230, 78)}SE AGREGÓ UN REGISTRO\x1b[0m`);
                        MenuHospital({ usuario }, { password });
                    } catch (err) {
                        await connectionuser.release();
                        console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL AGREGAR UN REGISTRO\x1b[0m`);
                        console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)

                        const connRoot = await db_root.getConnection();
                        await connRoot.query(`USE ${process.env.DB_NAME}`);
                        await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Error al agregar un nuevo registro a log_actividad', NOW())`);
                        await connRoot.release();

                        MenuHospital({ usuario }, { password });
                    }
                });
            } else if (answers.op_menu == 4) {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'status',
                        message: `${color(37, 230, 78)}INGRESE STATUS: \x1b[0m`
                    },
                    {
                        type: 'number',
                        name: 'id_habitacion',
                        message: `${color(37, 230, 78)}INGRESE ID DE LA HABITACION: \x1b[0m`
                    }
                ]).then(async (answers) => {
                    if (answers.status == '' || answers.id_habitacion == '') {
                        console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                        MenuHospital({ usuario }, { password });
                    }
                    try {
                        await connectionuser.query(`INSERT INTO log_habitacion (timestampx, statusx, idHabitacion) VALUES (NOW(),?,?)`, [answers.status, answers.id_habitacion]);
                        await connectionuser.release();

                        const connRoot = await db_root.getConnection();
                        await connRoot.query(`USE ${process.env.DB_NAME}`);
                        await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Agregando un nuevo registro a log_habitacion', NOW())`);
                        await connRoot.release();

                        console.log(`${color(37, 230, 78)}SE AGREGÓ UN REGISTRO\x1b[0m`);
                        MenuHospital({ usuario }, { password });
                    } catch (err) {
                        await connectionuser.release();
                        console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL AGREGAR UN REGISTRO\x1b[0m`);
                        console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)

                        const connRoot = await db_root.getConnection();
                        await connRoot.query(`USE ${process.env.DB_NAME}`);
                        await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Error al agregar un nuevo registro a log_habitacion', NOW())`);

                        MenuHospital({ usuario }, { password });
                    }
                });
            }
        } catch (err) {
            console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL AGREGAR UN REGISTRO\x1b[0m`);
            console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)

            const connRoot = await db_root.getConnection();
            await connRoot.query(`USE ${process.env.DB_NAME}`);
            await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Error al agregar un nuevo registro', NOW())`);
            MenuHospital({ usuario }, { password });
        }
    });
}