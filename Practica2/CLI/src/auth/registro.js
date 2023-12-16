import inquirer from 'inquirer';
import { color } from '../utils/index.js';

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
                    name: 'ADMINISTRADOR',
                    value: 1
                },
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
    ]).then((answers) => {
        console.log(answers);
    });
};
