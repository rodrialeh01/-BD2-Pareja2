import inquirer from 'inquirer';
import { color } from '../utils/index.js';

export const ActualizarRegistro = ({usuario}) => {
    console.log(`${color(66,135,245)}------------------BIENVENIDO ${usuario}------------------\x1b[0m`);
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
    ]).then((answers) => {
        console.log(answers);
        if(answers.op_menu == 1){
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'op_menu2',
                    message: `${color(37, 230, 78)}SELECCIONE EL ATRIBUTO QUE QUIERE ACTUALIZAR: \x1b[0m`,
                    choices: [
                        {
                            name: '1 - ID PACIENTE',
                            value: 1
                        },
                        {
                            name: '2 - EDAD',
                            value: 2
                        },
                        {
                            name: '3 - GENERO',
                            value: 3
                        }
                    ]
                }
            ]).then((answers) => {
                console.log(answers);
            });
        }else if(answers.op_menu == 2){
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'op_menu2',
                    message: `${color(37, 230, 78)}SELECCIONE EL ATRIBUTO QUE QUIERE ACTUALIZAR: \x1b[0m`,
                    choices: [
                        {
                            name: '1 - ID HABITACION',
                            value: 1
                        },
                        {
                            name: '2 - HABITACION',
                            value: 2
                        }
                    ]
                }
            ]).then((answers) => {
                console.log(answers);
            });
        }else if(answers.op_menu == 3){
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'op_menu2',
                    message: `${color(37, 230, 78)}SELECCIONE EL ATRIBUTO QUE QUIERE ACTUALIZAR: \x1b[0m`,
                    choices: [
                        {
                            name: '1 - ID LOG ACTIVIDAD',
                            value: 1
                        },
                        {
                            name: '2 - ACTIVIDAD',
                            value: 2
                        },
                        {
                            name: '3 - ID PACIENTE',
                            value: 3
                        },
                        {
                            name: '4 - ID HABITACION',
                            value: 4
                        }
                    ]
                }
            ]).then((answers) => {
                console.log(answers);
            });
        }else if(answers.op_menu == 4){
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
                        }
                    ]
                }
            ]).then((answers) => {
                console.log(answers);
            });
        }
    });
}