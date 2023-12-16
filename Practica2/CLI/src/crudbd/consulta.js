import inquirer from 'inquirer';
import { color } from '../utils/index.js';

export const ConsultarRegistro = ({usuario}) => {
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
        console.log(answers);
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
        ]).then((answers2) => {
            console.log(answers2);
            if(answers2.op_menu == 1){
                if(answers.op == 1){
                    console.log('CONSULTA GENERAL');
                }else if(answers.op == 2){
                    inquirer.prompt([
                        {
                            type: 'number',
                            name: 'id_paciente',
                            message: `${color(37, 230, 78)}INGRESE ID DEL PACIENTE: \x1b[0m`
                        }
                    ]).then((answers3) => {
                        console.log(answers3);
                    });
                }
            }else if(answers2.op_menu == 2){
                if(answers.op == 1){
                    console.log('CONSULTA GENERAL');
                }else if(answers.op == 2){
                    inquirer.prompt([
                        {
                            type: 'number',
                            name: 'id_paciente',
                            message: `${color(37, 230, 78)}INGRESE ID DE LA HABITACION: \x1b[0m`
                        }
                    ]).then((answers3) => {
                        console.log(answers3);
                    });
                }
            }else if(answers2.op_menu == 3){
                if(answers.op == 1){
                    console.log('CONSULTA GENERAL');
                }else if(answers.op == 2){
                    inquirer.prompt([
                        {
                            type: 'number',
                            name: 'id_paciente',
                            message: `${color(37, 230, 78)}INGRESE ID DEL LOG: \x1b[0m`
                        }
                    ]).then((answers3) => {
                        console.log(answers3);
                    });
                }
            }else if(answers2.op_menu == 4){
                if(answers.op == 1){
                    console.log('CONSULTA GENERAL');
                }else if(answers.op == 2){
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'id_paciente',
                            message: `${color(37, 230, 78)}INGRESE ID DE LA HABITACIÓN: \x1b[0m`
                        }
                    ]).then((answers3) => {
                        console.log(answers3);
                    });
                }
            }
        });
    });
}