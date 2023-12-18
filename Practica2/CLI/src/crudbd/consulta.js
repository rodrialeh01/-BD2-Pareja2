import inquirer from 'inquirer';
import { color } from '../utils/index.js';
import { MenuHospital } from '../menu_hospital/menuPrincipal.js';
import { db_users, db_root } from '../db.js';

export const ConsultarRegistro = ({usuario}, {password}) => {
    console.log(`${color(66,135,245)}------------------BIENVENIDO ${usuario}------------------\x1b[0m`);
    inquirer.prompt([
        {
            type: 'list',
            name: 'op',
            message: `${color(37, 230, 78)}SELECCIONE QUE TIPO DE CONSULTA QUIERE REALIZAR: \x1b[0m`,
            choices: [
                {
                    name: '1 - CONSULTA GENERAL',
                    value: 1
                },
                {
                    name: '2 - CONSULTA ESPECIFICA',
                    value: 2
                }
            ]
        }
    ]).then((answers) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'op_menu',
                message: `${color(37, 230, 78)}SELECCIONE LA TABLA A LA CUAL QUIERA CONSULTAR UN REGISTRO: \x1b[0m`,
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
        ]).then(async(answers2) => {
            if(answers2.op_menu == 1){
                const dataUser = db_users(usuario, password);
                const connection = await dataUser.getConnection();
                if(answers.op == 1){
                    console.log(`${color(186, 85, 255)}CONSULTA GENERAL DE PACIENTE: \x1b[0m`);
                    //query para consultar todos los pacientes (máx. 25)
                    try {
                        const query = `SELECT * FROM paciente LIMIT 25`;
                        await connection.query(`USE ${process.env.DB_NAME}`);
                        let res = await connection.query(query);
                        await connection.release();

                        console.log(`${color(37, 230, 78)}CONSULTA EXITOSA\x1b[0m`);
                        console.table(res[0])

                        const connRoot = await db_root.getConnection();
                        await connRoot.query(`USE ${process.env.DB_NAME}`);
                        await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Consulta general de pacientes', NOW())`);
                        await connRoot.release();


                        MenuHospital({usuario}, {password});

                    } catch (err) {
                        await connection.release();
                        console.log(`${color(255, 0, 0)} ${err.message}` );
                        MenuHospital({usuario}, {password});
                    }

                }else if(answers.op == 2){
                    console.log(`${color(186, 85, 255)}CONSULTA ESPECÍFICA DE PACIENTE: \x1b[0m`);
                    inquirer.prompt([
                        {
                            type: 'number',
                            name: 'id_paciente',
                            message: `${color(37, 230, 78)}INGRESE ID DEL PACIENTE: \x1b[0m`
                        }
                    ]).then(async(answers3) => {
                        const dataUser = db_users(usuario, password);
                        const connection = await dataUser.getConnection();
                        try {
                            const query = `SELECT * FROM paciente WHERE idPaciente = ${answers3.id_paciente}`;
                            await connection.query(`USE ${process.env.DB_NAME}`);
                            let res = await connection.query(query);
                            await connection.release();
    
                            console.log(`${color(37, 230, 78)}CONSULTA EXITOSA\x1b[0m`);
                            console.table(res[0]);
    
                            const connRoot = await db_root.getConnection();
                            await connRoot.query(`USE ${process.env.DB_NAME}`);
                            await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Consulta específica de pacientes', NOW())`);
                            await connRoot.release();
    
                            MenuHospital({usuario}, {password});
    
                        } catch (err) {
                            await connection.release();
                            console.log(`${color(255, 0, 0)} ${err.message}` );
                            MenuHospital({usuario}, {password});
                        }
                    });
                }
            }else if(answers2.op_menu == 2){
                const dataUser = db_users(usuario, password);
                const connection = await dataUser.getConnection();
                if(answers.op == 1){
                    console.log(`${color(186, 85, 255)}CONSULTA GENERAL DE HABITACIONES: \x1b[0m`);
                    try {
                        const query = `SELECT * FROM habitacion LIMIT 25`;
                        await connection.query(`USE ${process.env.DB_NAME}`);
                        let res = await connection.query(query);
                        await connection.release();

                        console.log(`${color(37, 230, 78)}CONSULTA EXITOSA\x1b[0m`);
                        console.table(res[0])

                        const connRoot = await db_root.getConnection();
                        await connRoot.query(`USE ${process.env.DB_NAME}`);
                        await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Consulta general de habitaciones', NOW())`);
                        await connRoot.release();


                        MenuHospital({usuario}, {password});

                    } catch (err) {
                        await connection.release();
                        console.log(`${color(255, 0, 0)} ${err.message}` );
                        MenuHospital({usuario}, {password});
                    }

                }else if(answers.op == 2){
                    console.log(`${color(186, 85, 255)}CONSULTA ESPECÍFICA DE HABITACIONES: \x1b[0m`);
                    inquirer.prompt([
                        {
                            type: 'number',
                            name: 'id_paciente',
                            message: `${color(37, 230, 78)}INGRESE ID DE LA HABITACIÓN: \x1b[0m`
                        }
                    ]).then(async(answers3) => {
                        const dataUser = db_users(usuario, password);
                        const connection = await dataUser.getConnection();
                        try {
                            const query = `SELECT * FROM habitacion WHERE idHabitacion = ${answers3.id_paciente}`;
                            await connection.query(`USE ${process.env.DB_NAME}`);
                            let res = await connection.query(query);
                            await connection.release();
    
                            console.log(`${color(37, 230, 78)}CONSULTA EXITOSA\x1b[0m`);
                            console.table(res[0]);
    
                            const connRoot = await db_root.getConnection();
                            await connRoot.query(`USE ${process.env.DB_NAME}`);
                            await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Consulta específica de habitación', NOW())`);
                            await connRoot.release();
    
                            MenuHospital({usuario}, {password});
    
                        } catch (err) {
                            await connection.release();
                            console.log(`${color(255, 0, 0)} ${err.message}` );
                            MenuHospital({usuario}, {password});
                        }
                    });
                }
            }else if(answers2.op_menu == 3){
                const dataUser = db_users(usuario, password);
                const connection = await dataUser.getConnection();
                if(answers.op == 1){
                    console.log(`${color(186, 85, 255)}CONSULTA GENERAL DE LOG_ACTIVIDAD: \x1b[0m`);
                    try {
                        const query = `SELECT * FROM log_actividad LIMIT 25`;
                        await connection.query(`USE ${process.env.DB_NAME}`);
                        let res = await connection.query(query);
                        await connection.release();

                        console.log(`${color(37, 230, 78)}CONSULTA EXITOSA\x1b[0m`);
                        console.table(res[0])

                        const connRoot = await db_root.getConnection();
                        await connRoot.query(`USE ${process.env.DB_NAME}`);
                        await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Consulta general de log_actividad', NOW())`);
                        await connRoot.release();


                        MenuHospital({usuario}, {password});

                    } catch (err) {
                        await connection.release();
                        console.log(`${color(255, 0, 0)} ${err.message}` );
                        MenuHospital({usuario}, {password});
                    }

                }else if(answers.op == 2){
                    console.log(`${color(186, 85, 255)}CONSULTA ESPECÍFICA DE LOG_ACTIVIDAD: \x1b[0m`);
                    inquirer.prompt([
                        {
                            type: 'number',
                            name: 'id_paciente',
                            message: `${color(37, 230, 78)}INGRESE ID DEL LOG_ACTIVIDAD: \x1b[0m`
                        }
                    ]).then(async(answers3) => {
                        const dataUser = db_users(usuario, password);
                        const connection = await dataUser.getConnection();
                        try {
                            const query = `SELECT * FROM log_actividad WHERE id_log_actividad = ${answers3.id_paciente}`;
                            await connection.query(`USE ${process.env.DB_NAME}`);
                            let res = await connection.query(query);
                            await connection.release();
    
                            console.log(`${color(37, 230, 78)}CONSULTA EXITOSA\x1b[0m`);
                            console.table(res[0]);
    
                            const connRoot = await db_root.getConnection();
                            await connRoot.query(`USE ${process.env.DB_NAME}`);
                            await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Consulta específica de log_actividad', NOW())`);
                            await connRoot.release();
    
                            MenuHospital({usuario}, {password});
    
                        } catch (err) {
                            await connection.release();
                            console.log(`${color(255, 0, 0)} ${err.message}` );
                            MenuHospital({usuario}, {password});
                        }
                    });
                }
            }else if(answers2.op_menu == 4){
                const dataUser = db_users(usuario, password);
                const connection = await dataUser.getConnection();
                if(answers.op == 1){
                    console.log(`${color(186, 85, 255)}CONSULTA GENERAL DE LOG_HABITACION: \x1b[0m`);
                    try {
                        const query = `SELECT * FROM log_habitacion LIMIT 25`;
                        await connection.query(`USE ${process.env.DB_NAME}`);
                        let res = await connection.query(query);
                        await connection.release();

                        console.log(`${color(37, 230, 78)}CONSULTA EXITOSA\x1b[0m`);
                        console.table(res[0])

                        const connRoot = await db_root.getConnection();
                        await connRoot.query(`USE ${process.env.DB_NAME}`);
                        await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Consulta general de log_habitacion', NOW())`);
                        await connRoot.release();


                        MenuHospital({usuario}, {password});

                    } catch (err) {
                        await connection.release();
                        console.log(`${color(255, 0, 0)} ${err.message}` );
                        MenuHospital({usuario}, {password});
                    }

                }else if(answers.op == 2){
                    console.log(`${color(186, 85, 255)}CONSULTA ESPECÍFICA DE LOG_HABITACION: \x1b[0m`);
                    inquirer.prompt([
                        {
                            type: 'number',
                            name: 'id_paciente',
                            message: `${color(37, 230, 78)}INGRESE ID DE LA HABITACIÓN EN LOG_HABITACION: \x1b[0m`
                        }
                    ]).then(async(answers3) => {
                        const dataUser = db_users(usuario, password);
                        const connection = await dataUser.getConnection();
                        try {
                            const query = `SELECT * FROM log_habitacion WHERE idHabitacion = ${answers3.id_paciente}`;
                            await connection.query(`USE ${process.env.DB_NAME}`);
                            let res = await connection.query(query);
                            await connection.release();
    
                            console.log(`${color(37, 230, 78)}CONSULTA EXITOSA\x1b[0m`);
                            console.table(res[0]);
    
                            const connRoot = await db_root.getConnection();
                            await connRoot.query(`USE ${process.env.DB_NAME}`);
                            await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Consulta específica de log_habitacion', NOW())`);
                            await connRoot.release();
    
                            MenuHospital({usuario}, {password});
    
                        } catch (err) {
                            await connection.release();
                            console.log(`${color(255, 0, 0)} ${err.message}` );
                            MenuHospital({usuario}, {password});
                        }
                    });
                }
            }
        });
    });
}