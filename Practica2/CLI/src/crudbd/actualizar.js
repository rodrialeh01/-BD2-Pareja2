import inquirer from 'inquirer';
import { db_root, db_users } from '../db.js';
import { MenuHospital } from '../menu_hospital/menuPrincipal.js';
import { color, verificaFormatoFechaHora } from '../utils/index.js';

export const ActualizarRegistro = ({ usuario }, { password }) => {
    console.log(`${color(66, 135, 245)}------------------BIENVENIDO ${usuario}------------------\x1b[0m`);
    inquirer.prompt([
        {
            type: 'list',
            name: 'op_menu',
            message: `${color(37, 230, 78)}SELECCIONE LA TABLA A LA CUAL QUIERA ACTUALIZAR UN REGISTRO: \x1b[0m`,
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
        console.log(answers);
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
                        type: 'list',
                        name: 'op_menu2',
                        message: `${color(37, 230, 78)}SELECCIONE EL ATRIBUTO QUE QUIERE ACTUALIZAR: \x1b[0m`,
                        choices: [
                            {
                                name: '1 - EDAD',
                                value: 1
                            },
                            {
                                name: '2 - GENERO',
                                value: 2
                            }
                        ]
                    }
                ]).then((answers) => {
                    if (answers.op_menu2 === 1) {
                        inquirer.prompt([
                            {
                                type: 'number',
                                name: 'id_paciente',
                                message: `${color(37, 230, 78)}INGRESE EL ID DEL PACIENTE: \x1b[0m`,
                            },
                            {
                                type: 'number',
                                name: 'edad',
                                message: `${color(37, 230, 78)}INGRESE LA NUEVA EDAD: \x1b[0m`,
                            }
                        ]).then(async (answers) => {
                            if (answers.id_paciente == '' || answers.edad == '') {
                                console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                                MenuHospital({ usuario }, { password });
                            }
                            try {
                                await connectionuser.query(`UPDATE paciente SET edad = '${answers.edad}' WHERE idPaciente = '${answers.id_paciente}'`);
                                await connectionuser.release();

                                const connRoot = await db_root.getConnection();
                                await connRoot.query(`USE ${process.env.DB_NAME}`);
                                await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Actualizando la edad del id_paciente ${answers.id_paciente} en la tabla paciente', NOW())`);
                                await connRoot.release();

                                console.log(`${color(37, 230, 78)}SE ACTUALIZO EL REGISTRO\x1b[0m`);
                                MenuHospital({ usuario }, { password });
                            } catch (err) {
                                await connectionuser.release();
                                const connRoot = await db_root.getConnection();
                                await connRoot.query(`USE ${process.env.DB_NAME}`);
                                await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Error Al Actualizar la edad del id_paciente ${answers.id_paciente} en la tabla paciente', NOW())`);
                                await connRoot.release();
                                console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL ACTUALIZAR EL REGISTRO\x1b[0m`);
                                console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)
                                MenuHospital({ usuario }, { password });
                            }
                        });
                    } else if (answers.op_menu2 === 2) {
                        inquirer.prompt([
                            {
                                type: 'number',
                                name: 'id_paciente',
                                message: `${color(37, 230, 78)}INGRESE EL ID DEL PACIENTE: \x1b[0m`,
                            },
                            {
                                type: 'list',
                                name: 'genero',
                                message: `${color(37, 230, 78)}SELECCIONE EL GENERO: \x1b[0m`,
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
                            if (answers.id_paciente == '' || answers.genero == '') {
                                console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                                MenuHospital({ usuario }, { password });
                            }
                            const loguser = db_users(usuario, password);
                            const connectionuser = await loguser.getConnection();
                            try {
                                await connectionuser.query(`UPDATE paciente SET genero = '${answers.genero}' WHERE idPaciente = '${answers.id_paciente}'`);
                                await connectionuser.release();

                                const connRoot = await db_root.getConnection();
                                await connRoot.query(`USE ${process.env.DB_NAME}`);
                                await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Actualizando el genero del id_paciente ${answers.id_paciente} en la tabla paciente', NOW())`);
                                await connRoot.release();

                                console.log(`${color(37, 230, 78)}SE ACTUALIZO EL REGISTRO\x1b[0m`);
                                MenuHospital({ usuario }, { password });
                            } catch (err) {
                                await connectionuser.release();
                                const connRoot = await db_root.getConnection();
                                await connRoot.query(`USE ${process.env.DB_NAME}`);
                                await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Error al actualizar el genero del id_paciente ${answers.id_paciente} en la tabla paciente', NOW())`);
                                await connRoot.release();
                                console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL ACTUALIZAR EL REGISTRO\x1b[0m`);
                                console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)
                                MenuHospital({ usuario }, { password });
                            }
                        });
                    }
                });
            } else if (answers.op_menu == 2) {
                inquirer.prompt([
                    {
                        type: 'number',
                        name: 'id_habitacion',
                        message: `${color(37, 230, 78)}INGRESE EL ID DE LA HABITACIÓN: \x1b[0m`,
                    },
                    {
                        type: 'input',
                        name: 'nombre_habitacion',
                        message: `${color(37, 230, 78)}INGRESE EL NUEVO NOMBRE DE LA HABITACIÓN: \x1b[0m`,
                    }
                ]).then(async (answers) => {
                    if (answers.id_habitacion == '' || answers.nombre_habitacion == '') {
                        console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                        MenuHospital({ usuario }, { password });
                    }
                    try {
                        await connectionuser.query(`UPDATE habitacion SET habitacion = '${answers.nombre_habitacion}' WHERE idHabitacion = '${answers.id_habitacion}'`);
                        await connectionuser.release();

                        const connRoot = await db_root.getConnection();
                        await connRoot.query(`USE ${process.env.DB_NAME}`);
                        await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Actualizando habitacion del idHabitacion ${answers.id_habitacion} en la tabla habitación', NOW())`);
                        await connRoot.release();

                        console.log(`${color(37, 230, 78)}SE ACTUALIZO EL REGISTRO\x1b[0m`);
                        MenuHospital({ usuario }, { password });
                    } catch (err) {
                        await connectionuser.release();
                        const connRoot = await db_root.getConnection();
                        await connRoot.query(`USE ${process.env.DB_NAME}`);
                        await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Error al actualizar la habitacion del idHabitacion ${answers.id_habitacion} en la tabla habitación', NOW())`);
                        await connRoot.release();
                        console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL ACTUALIZAR EL REGISTRO\x1b[0m`);
                        console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)
                        MenuHospital({ usuario }, { password });
                    }
                });
            } else if (answers.op_menu == 3) {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'op_menu2',
                        message: `${color(37, 230, 78)}SELECCIONE EL ATRIBUTO QUE QUIERE ACTUALIZAR: \x1b[0m`,
                        choices: [
                            {
                                name: '1 - ACTIVIDAD',
                                value: 1
                            },
                            {
                                name: '2 - ID PACIENTE',
                                value: 2
                            },
                            {
                                name: '3 - ID HABITACION',
                                value: 3
                            },
                            {
                                name: '4 - FECHA Y HORA',
                                value: 4
                            }
                        ]
                    }
                ]).then((answers) => {
                    if (answers.op_menu2 === 1) {
                        inquirer.prompt([
                            {
                                type: 'number',
                                name: 'id_log_actividad',
                                message: `${color(37, 230, 78)}INGRESE EL ID DEL LOG ACTIVIDAD: \x1b[0m`,
                            },
                            {
                                type: 'input',
                                name: 'actividad',
                                message: `${color(37, 230, 78)}INGRESE LA NUEVA ACTIVIDAD: \x1b[0m`,
                            }
                        ]).then(async (answers) => {
                            if (answers.id_log_actividad == '' || answers.actividad == '') {
                                console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                                MenuHospital({ usuario }, { password });
                            }
                            try {
                                await connectionuser.query(`UPDATE log_actividad SET actividad = '${answers.actividad}' WHERE id_log_actividad = '${answers.id_log_actividad}'`);
                                await connectionuser.release();

                                const connRoot = await db_root.getConnection();
                                await connRoot.query(`USE ${process.env.DB_NAME}`);
                                await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Actualizando la actividad del id_log_actividad ${answers.id_log_actividad} en la tabla log_actividad', NOW())`);
                                await connRoot.release();

                                console.log(`${color(37, 230, 78)}SE ACTUALIZO EL REGISTRO\x1b[0m`);
                                MenuHospital({ usuario }, { password });
                            } catch (err) {
                                await connectionuser.release();
                                const connRoot = await db_root.getConnection();
                                await connRoot.query(`USE ${process.env.DB_NAME}`);
                                await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Error al actualizar la actividad del id_log_actividad ${answers.id_log_actividad} en la tabla log_actividad', NOW())`);
                                await connRoot.release();
                                console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL ACTUALIZAR EL REGISTRO\x1b[0m`);
                                console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)
                                MenuHospital({ usuario }, { password });
                            }
                        });
                    } else if (answers.op_menu2 === 2) {
                        inquirer.prompt([
                            {
                                type: 'number',
                                name: 'id_log_actividad',
                                message: `${color(37, 230, 78)}INGRESE EL ID DEL LOG ACTIVIDAD: \x1b[0m`,
                            },
                            {
                                type: 'number',
                                name: 'id_paciente',
                                message: `${color(37, 230, 78)}INGRESE EL ID DEL PACIENTE: \x1b[0m`,
                            }
                        ]).then(async (answers) => {
                            if (answers.id_paciente == '' || answers.id_log_actividad == '') {
                                console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                                MenuHospital({ usuario }, { password });
                            }
                            try {
                                await connectionuser.query(`UPDATE log_actividad SET idPaciente = '${answers.id_paciente}' WHERE id_log_actividad = '${answers.id_log_actividad}'`);
                                await connectionuser.release();

                                const connRoot = await db_root.getConnection();
                                await connRoot.query(`USE ${process.env.DB_NAME}`);
                                await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Actualizando el id del paciente del id_log_actividad ${answers.id_log_actividad} en la tabla log_actividad', NOW())`);
                                await connRoot.release();

                                console.log(`${color(37, 230, 78)}SE ACTUALIZO EL REGISTRO\x1b[0m`);
                                MenuHospital({ usuario }, { password });
                            } catch (err) {
                                await connectionuser.release();
                                const connRoot = await db_root.getConnection();
                                await connRoot.query(`USE ${process.env.DB_NAME}`);
                                await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Error al actualizar el id del paciente del id_log_actividad ${answers.id_log_actividad} en la tabla log_actividad', NOW())`);
                                await connRoot.release();
                                console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL ACTUALIZAR EL REGISTRO\x1b[0m`);
                                console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)
                                MenuHospital({ usuario }, { password });
                            }
                        });
                    } else if (answers.op_menu2 === 3) {
                        inquirer.prompt([
                            {
                                type: 'number',
                                name: 'id_log_actividad',
                                message: `${color(37, 230, 78)}INGRESE EL ID DEL LOG ACTIVIDAD: \x1b[0m`,
                            },
                            {
                                type: 'number',
                                name: 'id_habitacion',
                                message: `${color(37, 230, 78)}INGRESE EL ID DE LA HABITACIÓN: \x1b[0m`,
                            }
                        ]).then(async (answers) => {
                            if (answers.id_log_actividad == '' || answers.id_habitacion == '') {
                                console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                                MenuHospital({ usuario }, { password });
                            }
                            try {
                                await connectionuser.query(`UPDATE log_actividad SET idHabitacion = '${answers.id_habitacion}' WHERE id_log_actividad = '${answers.id_log_actividad}'`);
                                await connectionuser.release();

                                const connRoot = await db_root.getConnection();
                                await connRoot.query(`USE ${process.env.DB_NAME}`);
                                await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Actualizando el id Habitacion del id_log_actividad ${answers.id_log_actividad} en la tabla log_actividad', NOW())`);
                                await connRoot.release();

                                console.log(`${color(37, 230, 78)}SE ACTUALIZO EL REGISTRO\x1b[0m`);
                                MenuHospital({ usuario }, { password });
                            } catch (err) {
                                await connectionuser.release();
                                const connRoot = await db_root.getConnection();
                                await connRoot.query(`USE ${process.env.DB_NAME}`);
                                await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Error al actualizar el id Habitacion del id_log_actividad ${answers.id_log_actividad} en la tabla log_actividad', NOW())`);
                                await connRoot.release();
                                console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL ACTUALIZAR EL REGISTRO\x1b[0m`);
                                console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)
                                MenuHospital({ usuario }, { password });
                            }
                        });
                    } else if (answers.op_menu2 === 4) {
                        inquirer.prompt([
                            {
                                type: 'number',
                                name: 'id_log_actividad',
                                message: `${color(37, 230, 78)}INGRESE EL ID DEL LOG ACTIVIDAD: \x1b[0m`,
                            },
                            {
                                type: 'list',
                                name: 'timestampop',
                                message: `${color(37, 230, 78)}SELECCIONE COMO QUIERE MODIFICAR EL HORARIO: \x1b[0m`,
                                choices: [
                                    {
                                        name: '1 - FECHA Y HORA ACTUAL',
                                        value: 1
                                    },
                                    {
                                        name: '2 - FECHA Y HORA PERSONALIZADA',
                                        value: 2
                                    }
                                ]
                            }
                        ]).then(async (answers) => {
                            if (answers.id_log_actividad == '' || answers.timestampop == '') {
                                console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                                MenuHospital({ usuario }, { password });
                            }
                            const idloga = answers.id_log_actividad;
                            if (answers.timestampop === 1) {
                                try {
                                    await connectionuser.query(`UPDATE log_actividad SET timestampx = NOW() WHERE id_log_habitacion = '${idloga}'`);
                                    await connectionuser.release();

                                    const connRoot = await db_root.getConnection();
                                    await connRoot.query(`USE ${process.env.DB_NAME}`);
                                    await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Actualizando el timestamp del id_log_habitacion ${idloga} en la tabla log_habitacion', NOW())`);
                                    await connRoot.release();

                                    console.log(`${color(37, 230, 78)}SE ACTUALIZO EL REGISTRO\x1b[0m`);
                                    MenuHospital({ usuario }, { password });
                                } catch (err) {
                                    await connectionuser.release();
                                    const connRoot = await db_root.getConnection();
                                    await connRoot.query(`USE ${process.env.DB_NAME}`);
                                    await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Error al actualizar el timestamp del id_log_habitacion ${idloga} en la tabla log_habitacion', NOW())`);
                                    await connRoot.release();
                                    console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL ACTUALIZAR EL REGISTRO\x1b[0m`);
                                    console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)
                                    MenuHospital({ usuario }, { password });
                                }
                            } else if (answers.timestampop === 2) {
                                inquirer.prompt([
                                    {
                                        type: 'input',
                                        name: 'timestamp',
                                        message: `${color(37, 230, 78)}INGRESE EL NUEVO TIMESTAMP CON EL FORMATO (dia/mes/anio hora:minuto:segundo): \x1b[0m`,
                                    }
                                ]).then(async (answers2) => {
                                    if (answers2.timestamp == '') {
                                        console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                                        MenuHospital({ usuario }, { password });
                                    }
                                    if (!verificaFormatoFechaHora(answers2.timestamp)) {
                                        console.log(`${color(255, 0, 0)}ERROR: FORMATO DE FECHA Y HORA INCORRECTO\x1b[0m`);
                                        MenuHospital({ usuario }, { password });
                                    }
                                    try {
                                        await connectionuser.query(`UPDATE log_actividad SET timestampx = '${answers2.timestamp}' WHERE id_log_habitacion = '${idloga}'`);
                                        await connectionuser.release();

                                        const connRoot = await db_root.getConnection();
                                        await connRoot.query(`USE ${process.env.DB_NAME}`);
                                        await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Actualizando el timestamp del id_log_habitacion ${idlogh} en la tabla log_habitacion', NOW())`);
                                        await connRoot.release();

                                        console.log(`${color(37, 230, 78)}SE ACTUALIZO EL REGISTRO\x1b[0m`);
                                        MenuHospital({ usuario }, { password });
                                    } catch (err) {
                                        await connectionuser.release();
                                        const connRoot = await db_root.getConnection();
                                        await connRoot.query(`USE ${process.env.DB_NAME}`);
                                        await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Error al actualizar el timestamp del id_log_habitacion ${idloga} en la tabla log_habitacion', NOW())`);
                                        await connRoot.release();
                                        console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL ACTUALIZAR EL REGISTRO\x1b[0m`);
                                        console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)
                                        MenuHospital({ usuario }, { password });
                                    }
                                });
                            }
                        });
                    }
                });
            } else if (answers.op_menu == 4) {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'op_menu2',
                        message: `${color(37, 230, 78)}SELECCIONE EL ATRIBUTO QUE QUIERE ACTUALIZAR: \x1b[0m`,
                        choices: [
                            {
                                name: '1 - STATUS',
                                value: 1
                            },
                            {
                                name: '2 - ID HABITACION',
                                value: 2
                            },
                            {
                                name: '3 - FECHA Y HORA',
                                value: 3
                            }
                        ]
                    }
                ]).then((answers) => {
                    if (answers.op_menu2 === 1) {
                        inquirer.prompt([
                            {
                                type: 'number',
                                name: 'id_log_habitacion',
                                message: `${color(37, 230, 78)}INGRESE EL ID DEL LOG HABITACION: \x1b[0m`,
                            },
                            {
                                type: 'input',
                                name: 'status',
                                message: `${color(37, 230, 78)}INGRESE EL NUEVO STATUS: \x1b[0m`,
                            }
                        ]).then(async (answers) => {
                            if (answers.id_log_actividad == '' || answers.status == '') {
                                console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                                MenuHospital({ usuario }, { password });
                            }
                            try {
                                await connectionuser.query(`UPDATE log_actividad SET statusx = '${answers.status}' WHERE id_log_habitacion = '${answers.id_log_habitacion}'`);
                                await connectionuser.release();

                                const connRoot = await db_root.getConnection();
                                await connRoot.query(`USE ${process.env.DB_NAME}`);
                                await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Actualizando el statusx del id_log_habitacion ${answers.id_log_habitacion} en la tabla log_habitacion', NOW())`);
                                await connRoot.release();

                                console.log(`${color(37, 230, 78)}SE ACTUALIZO EL REGISTRO\x1b[0m`);
                                MenuHospital({ usuario }, { password });
                            } catch (err) {
                                await connectionuser.release();
                                const connRoot = await db_root.getConnection();
                                await connRoot.query(`USE ${process.env.DB_NAME}`);
                                await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Error al actualizar el statusx del id_log_habitacion ${answers.id_log_habitacion} en la tabla log_habitacion', NOW())`);
                                await connRoot.release();
                                console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL ACTUALIZAR EL REGISTRO\x1b[0m`);
                                console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)
                                MenuHospital({ usuario }, { password });
                            }
                        });
                    } else if (answers.op_menu2 === 2) {
                        inquirer.prompt([
                            {
                                type: 'number',
                                name: 'id_log_habitacion',
                                message: `${color(37, 230, 78)}INGRESE EL ID DEL LOG HABITACION: \x1b[0m`,
                            },
                            {
                                type: 'number',
                                name: 'id_habitacion',
                                message: `${color(37, 230, 78)}INGRESE EL NUEVO ID DE LA HABITACIÓN: \x1b[0m`,
                            }
                        ]).then(async (answers) => {
                            if (answers.id_log_actividad == '' || answers.id_habitacion == '') {
                                console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                                MenuHospital({ usuario }, { password });
                            }
                            try {
                                await connectionuser.query(`UPDATE log_actividad SET idHabitacion = '${answers.id_habitacion}' WHERE id_log_habitacion = '${answers.id_log_habitacion}'`);
                                await connectionuser.release();

                                const connRoot = await db_root.getConnection();
                                await connRoot.query(`USE ${process.env.DB_NAME}`);
                                await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Actualizando el idHabitacion del id_log_habitacion ${answers.id_log_habitacion} en la tabla log_habitacion', NOW())`);
                                await connRoot.release();

                                console.log(`${color(37, 230, 78)}SE ACTUALIZO EL REGISTRO\x1b[0m`);
                                MenuHospital({ usuario }, { password });
                            } catch (err) {
                                await connectionuser.release();
                                const connRoot = await db_root.getConnection();
                                await connRoot.query(`USE ${process.env.DB_NAME}`);
                                await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Error al actualizar el idHabitacion del id_log_habitacion ${answers.id_log_habitacion} en la tabla log_habitacion', NOW())`);
                                await connRoot.release();
                                console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL ACTUALIZAR EL REGISTRO\x1b[0m`);
                                console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)
                                MenuHospital({ usuario }, { password });
                            }
                        });
                    } else if (answers.op_menu2 === 1) {
                        inquirer.prompt([
                            {
                                type: 'number',
                                name: 'id_log_habitacion',
                                message: `${color(37, 230, 78)}INGRESE EL ID DEL LOG HABITACION: \x1b[0m`,
                            },
                            {
                                type: 'list',
                                name: 'timestampop',
                                message: `${color(37, 230, 78)}SELECCIONE COMO QUIERE MODIFICAR EL HORARIO: \x1b[0m`,
                                choices: [
                                    {
                                        name: '1 - FECHA Y HORA ACTUAL',
                                        value: 1
                                    },
                                    {
                                        name: '2 - FECHA Y HORA PERSONALIZADA',
                                        value: 2
                                    }
                                ]
                            }
                        ]).then(async (answers) => {
                            if (answers.id_log_habitacion == '' || answers.timestampop == '') {
                                console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                                MenuHospital({ usuario }, { password });
                            }
                            const idlogh = answers.id_log_habitacion;
                            if (answers.timestampop === 1) {
                                const loguser = db_users(usuario, password);
                                const connectionuser = await loguser.getConnection();
                                try {
                                    await connectionuser.query(`UPDATE log_actividad SET timestampx = NOW() WHERE id_log_habitacion = '${idlogh}'`);
                                    await connectionuser.release();

                                    const connRoot = await db_root.getConnection();
                                    await connRoot.query(`USE ${process.env.DB_NAME}`);
                                    await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Actualizando el timestamp del id_log_habitacion ${idlogh} en la tabla log_habitacion', NOW())`);
                                    await connRoot.release();

                                    console.log(`${color(37, 230, 78)}SE ACTUALIZO EL REGISTRO\x1b[0m`);
                                    MenuHospital({ usuario }, { password });
                                } catch (err) {
                                    await connectionuser.release();
                                    const connRoot = await db_root.getConnection();
                                    await connRoot.query(`USE ${process.env.DB_NAME}`);
                                    await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Error al actualizar el timestamp del id_log_habitacion ${idlogh} en la tabla log_habitacion', NOW())`);
                                    await connRoot.release();
                                    console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL ACTUALIZAR EL REGISTRO\x1b[0m`);
                                    console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)
                                    MenuHospital({ usuario }, { password });
                                }
                            } else if (answers.timestampop === 2) {
                                inquirer.prompt([
                                    {
                                        type: 'input',
                                        name: 'timestamp',
                                        message: `${color(37, 230, 78)}INGRESE EL NUEVO TIMESTAMP CON EL FORMATO (dia/mes/anio hora:minuto:segundo): \x1b[0m`,
                                    }
                                ]).then(async (answers2) => {
                                    if (answers2.timestamp == '') {
                                        console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                                        MenuHospital({ usuario }, { password });
                                    }
                                    if (!verificaFormatoFechaHora(answers2.timestamp)) {
                                        console.log(`${color(255, 0, 0)}ERROR: FORMATO DE FECHA Y HORA INCORRECTO\x1b[0m`);
                                        MenuHospital({ usuario }, { password });
                                    }
                                    try {
                                        await connectionuser.query(`UPDATE log_actividad SET timestampx = '${answers2.timestamp}' WHERE id_log_habitacion = '${idlogh}'`);
                                        await connectionuser.release();

                                        const connRoot = await db_root.getConnection();
                                        await connRoot.query(`USE ${process.env.DB_NAME}`);
                                        await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Actualizando el timestamp del id_log_habitacion ${idlogh} en la tabla log_habitacion', NOW())`);
                                        await connRoot.release();

                                        console.log(`${color(37, 230, 78)}SE ACTUALIZO EL REGISTRO\x1b[0m`);
                                        MenuHospital({ usuario }, { password });
                                    } catch (err) {
                                        await connectionuser.release();
                                        const connRoot = await db_root.getConnection();
                                        await connRoot.query(`USE ${process.env.DB_NAME}`);
                                        await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Error al actualizar el timestamp del id_log_habitacion ${idlogh} en la tabla log_habitacion', NOW())`);
                                        await connRoot.release();
                                        console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL ACTUALIZAR EL REGISTRO\x1b[0m`);
                                        console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)
                                        MenuHospital({ usuario }, { password });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        } catch (err) {
            const connRoot = await db_root.getConnection();
            await connRoot.query(`USE ${process.env.DB_NAME}`);
            await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Error al actualizar el registro', NOW())`);
            await connRoot.release();
            console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL ACTUALIZAR EL REGISTRO\x1b[0m`);
            console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)
            MenuHospital({ usuario }, { password });
        }
    });
}