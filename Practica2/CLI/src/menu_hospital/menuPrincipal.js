import inquirer from 'inquirer';
import { color } from '../utils/index.js';

export const MenuHospital = ({usuario}) => {
    console.log(`${color(66,135,245)}------------------BIENVENIDO ${usuario}------------------\x1b[0m`);
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
                    name:'7 - RESTAURAR RESPALDO',
                    value: 7
                },
                {
                    name: '8 - SALIR',
                    value: 8
                }
            ]
        }
    ]).then((answers) => {
        console.log(answers);
    });
}