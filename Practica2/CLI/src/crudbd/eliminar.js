import inquirer from 'inquirer';
import { color } from '../utils/index.js';

export const EliminarRegistro = ({usuario}) => {
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
            ]).then((answers) => {
                console.log(answers);
            });
        }else if(answers.op_menu == 2){
            inquirer.prompt([
                {
                    type: 'number',
                    name: 'id_habitacion',
                    message: `${color(37, 230, 78)}INGRESE ID DE LA HABITACION: \x1b[0m`
                }
            ]).then((answers) => {
                console.log(answers);
            });
        }else if(answers.op_menu == 3){
            inquirer.prompt([
                {
                    type: 'number',
                    name: 'id_log1',
                    message: `${color(37, 230, 78)}INGRESE ID DEL LOG: \x1b[0m`
                }
            ]).then((answers) => {
                console.log(answers);
            });
        }else if(answers.op_menu == 4){
            inquirer.prompt([
                {
                    type: 'number',
                    name: 'id_habitacion',
                    message: `${color(37, 230, 78)}INGRESE ID DE LA HABITACION: \x1b[0m`
                }
            ]).then((answers) => {
                console.log(answers);
            });
        }
    });
}