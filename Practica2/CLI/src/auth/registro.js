import inquirer from 'inquirer';
import { MenuPrincipal } from '../pantalla_inicial/menuPrincipal.js';
import { color } from '../utils/index.js';
import { db_root } from './../db.js';

export const Registro = () => {
    console.log(`${color(66,135,245)}------------------REGISTRO------------------\x1b[0m`);
    inquirer.prompt([
        {
            type: 'input',
            name: 'new_user',
            message: `${color(37, 230, 78)}INGRESE NUEVO USUARIO: \x1b[0m`
        },
        {
            type: 'password',
            name: 'new_password',
            message: `${color(37, 230, 78)}INGRESE SU CONTRASEÑA: \x1b[0m`,
            mask: '*'
        },
        {
            type: 'input',
            name: 'admin_user',
            message: `${color(37, 230, 78)}INGRESE USUARIO ADMINISTRADOR: \x1b[0m`
        },
        {
            type: 'list',
            name: 'new_role',
            message: `${color(37, 230, 78)}INGRESE ROL DEL NUEVO USUARIO: \x1b[0m`,
            choices: [
                {
                    name: 'ASISTENTE',
                    value: 2
                },
                {
                    name: 'DOCTOR',
                    value: 3
                },
                {
                    name: 'SOPORTE',
                    value: 4
                }
            ]
        },
        {
            type: 'password',
            name: 'password_admin',
            message: `${color(37, 230, 78)}INGRESE CONTRASEÑA DEL ADMINISTRADOR: \x1b[0m`,
            mask: '*'
        },
        {
            type: 'confirm',
            name: 'confirmacion',
            message: `${color(37, 230, 78)}¿ESTA SEGURO DE REGISTRAR ESTE USUARIO?\x1b[0m`,
            default: false
        }
    ]).then(async (answers) => {
        if(answers.new_user == '' || answers.new_password == '' || answers.admin_user == '' || answers.password_admin == ''){
            console.log(`${color(255, 0, 0)}ERROR: NO SE PERMITEN CAMPOS VACIOS\x1b[0m`);
            MenuPrincipal();
        }
        //Verifica que el usuario administrador exista
        if(answers.admin_user != 'admin' && answers.password_admin != 'admin'){
            console.log(`${color(255, 0, 0)}ERROR: NO COINCIDE LAS CREDENCIALES DEL ADMINISTRADOR\x1b[0m`);
            MenuPrincipal();
        }
        try {
            const connection1 = await db_root.getConnection();
            if(!answers.confirmacion){
                await connection1.execute(`INSERT INTO BD2P2.bitacora(nombreUsuario, accion, fechaHoraAccion) VALUES(?, ?, ?)`, [answers.admin_user, `El Registro de usuario ${answers.new_user} fue rechazado`,'NOW()' ]);
                connection1.release();
                console.log(`${color(255, 0, 0)}REGISTRO CANCELADO\x1b[0m`);
                MenuPrincipal();
            }
            const roles = ['Administrador', 'Asistente', 'Doctor', 'Soporte'];
            //Crear nuevo usuario
            await connection1.execute(`CREATE USER '${answers.new_user}'@'localhost' IDENTIFIED BY '${answers.new_password}'`);
            //Le da rol
            await connection1.execute(`GRANT '${roles[answers.new_role-1]}' TO '${answers.new_user}'@'localhost'`);
            //Actualiza privilegios
            await connection1.execute(`FLUSH PRIVILEGES`);
            //Lo agrega a la tabla de usuarios
            await connection1.execute(`INSERT INTO BD2P2.usuario(nombre, contrasenia, rol) VALUES(?, ?, ?)`, [answers.new_user, answers.new_password, answers.new_role]);
            //Lo agrega a la bitacora
            await connection1.execute(`INSERT INTO BD2P2.bitacora(nombreUsuario, accion, fechaHoraAccion) VALUES(?, ?, ?)`, [answers.admin_user, `Registro de usuario ${answers.new_user}`,'NOW()' ]);
            connection1.release();
            console.log(`${color(37, 230, 78)}REGISTRO EXITOSO\x1b[0m`);
            MenuPrincipal();
        }catch(err){
            console.log(`${color(255, 0, 0)}ERROR AL REGISTRAR EL USUARIO: \x1b[0m`);
            console.log(`${color(255, 0, 0)} ${err.message}`);
            MenuPrincipal();
        }
         
    });
};
