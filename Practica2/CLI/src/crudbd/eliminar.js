import inquirer from 'inquirer';
import { db_root, db_users } from '../db.js';
import { MenuHospital } from '../menu_hospital/menuPrincipal.js';
import { MenuPrincipal } from '../pantalla_inicial/menuPrincipal.js';
import { color, obtenerRolUser } from '../utils/index.js';

export const EliminarRegistro = ({usuario},{password}) => {
    console.log(`${color(66,135,245)}------------------BIENVENIDO ${usuario}------------------\x1b[0m`);
    inquirer.prompt([
        {
            type: 'list',
            name: 'op_menu',
            message: `${color(37, 230, 78)}SELECCIONE LA TABLA A LA CUAL QUIERA ELIMINAR UN REGISTRO: \x1b[0m`,
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
    ]).then((answers) => {
        console.log(answers);
        if(answers.op_menu == 1){
            inquirer.prompt([
                {
                    type: 'number',
                    name: 'id_paciente',
                    message: `${color(37, 230, 78)}INGRESE ID DEL PACIENTE: \x1b[0m`
                }
            ]).then(async(answers) => {
                if(answers.id_paciente == ''){
                    console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                    MenuPrincipal();
                }
                try{
                    const loguser = db_users(usuario, password);
                    const connectionuser = await loguser.getConnection();
                    obtenerRolUser(usuario)
                    .then(async (rol) => {
                        await connectionuser.query(`SET ROLE ${rol}`)
                        await connectionuser.query(`DELETE FROM paciente WHERE idPaciente = '${answers.id_paciente}'`);
                    })
                    
                    await connectionuser.release();

                    const connRoot = await db_root.getConnection();
                    await connRoot.query(`USE ${process.env.DB_NAME}`);
                    await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Eliminando el registro del idPaciente ${answers.id_paciente} de la tabla Paciente', NOW())`);
                    await connRoot.release();

                    console.log(`${color(37, 230, 78)}SE ELIMINÓ EL REGISTRO\x1b[0m`);
                    MenuHospital({usuario}, {password});
                }catch(err){
                    console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL ELIMINAR EL REGISTRO\x1b[0m`);
                    console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)
                    MenuHospital({usuario}, {password});
                }
            });
        }else if(answers.op_menu == 2){
            inquirer.prompt([
                {
                    type: 'number',
                    name: 'id_habitacion',
                    message: `${color(37, 230, 78)}INGRESE ID DE LA HABITACION: \x1b[0m`
                }
            ]).then(async(answers) => {
                if(answers.id_habitacion == ''){
                    console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                    MenuPrincipal();
                }
                try{
                    const loguser = db_users(usuario, password);
                    const connectionuser = await loguser.getConnection();
                    obtenerRolUser(usuario)
                    .then(async (rol) => {
                        await connectionuser.query(`SET ROLE ${rol}`)
                        await connectionuser.query(`DELETE FROM habitacion WHERE idHabitacion = '${answers.id_habitacion}'`);
                    })
                    
                    await connectionuser.release();

                    const connRoot = await db_root.getConnection();
                    await connRoot.query(`USE ${process.env.DB_NAME}`);
                    await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Eliminando el registro del idHabitacion ${answers.id_habitacion} de la tabla Habitacion', NOW())`);
                    await connRoot.release();

                    console.log(`${color(37, 230, 78)}SE ELIMINÓ EL REGISTRO\x1b[0m`);
                    MenuHospital({usuario}, {password});
                }catch(err){
                    console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL ELIMINAR EL REGISTRO\x1b[0m`);
                    console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)
                    MenuHospital({usuario}, {password});
                }
            });
        }else if(answers.op_menu == 3){
            inquirer.prompt([
                {
                    type: 'number',
                    name: 'id_log1',
                    message: `${color(37, 230, 78)}INGRESE ID DEL LOG ACTIVIDAD: \x1b[0m`
                }
            ]).then(async(answers) => {
                if(answers.id_log1 == ''){
                    console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                    MenuPrincipal();
                }
                try{
                    const loguser = db_users(usuario, password);
                    const connectionuser = await loguser.getConnection();
                    obtenerRolUser(usuario)
                    .then(async (rol) => {
                        await connectionuser.query(`SET ROLE ${rol}`)
                        await connectionuser.query(`DELETE FROM log_actividad WHERE id_log_actividad = '${answers.id_log1}'`);
                    })
                    
                    await connectionuser.release();

                    const connRoot = await db_root.getConnection();
                    await connRoot.query(`USE ${process.env.DB_NAME}`);
                    await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Eliminando el registro del id_log_actividad ${answers.id_log1} de la tabla log_actividad', NOW())`);
                    await connRoot.release();

                    console.log(`${color(37, 230, 78)}SE ELIMINÓ EL REGISTRO\x1b[0m`);
                    MenuHospital({usuario}, {password});
                }catch(err){
                    console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL ELIMINAR EL REGISTRO\x1b[0m`);
                    console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)
                    MenuHospital({usuario}, {password});
                }
            });
        }else if(answers.op_menu == 4){
            inquirer.prompt([
                {
                    type: 'number',
                    name: 'id_habitacion',
                    message: `${color(37, 230, 78)}INGRESE ID DE LA HABITACION: \x1b[0m`
                }
            ]).then(async(answers) => {
                if(answers.id_habitacion == ''){
                    console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
                    MenuPrincipal();
                }
                try{
                    const loguser = db_users(usuario, password);
                    const connectionuser = await loguser.getConnection();
                    obtenerRolUser(usuario)
                    .then(async (rol) => {
                        await connectionuser.query(`SET ROLE ${rol}`)
                        await connectionuser.query(`DELETE FROM log_habitacion WHERE id_log_habitacion = '${answers.id_habitacion}'`);
                    })
                    
                    await connectionuser.release();

                    const connRoot = await db_root.getConnection();
                    await connRoot.query(`USE ${process.env.DB_NAME}`);
                    await connRoot.query(`INSERT INTO bitacora (nombreUsuario, accion, fechaHoraAccion) VALUES ('${usuario}', 'Eliminando el registro del id_log_habitacion ${answers.id_habitacion} de la tabla log_habitacion', NOW())`);
                    await connRoot.release();

                    console.log(`${color(37, 230, 78)}SE ELIMINÓ EL REGISTRO\x1b[0m`);
                    MenuHospital({usuario}, {password});
                }catch(err){
                    console.log(`${color(255, 0, 0)}ERROR: HUBO UN ERROR AL ELIMINAR EL REGISTRO\x1b[0m`);
                    console.log(`${color(255, 0, 0)}${err.message}\x1b[0m`)
                    MenuHospital({usuario}, {password});
                }
            });
        }
    });
}