import inquirer from 'inquirer';
import 'readline-sync';
inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:',
      choices: [
        { name: 'Opción 1', value: 'opcion1' },
        { name: 'Opción 2', value: 'opcion2' },
      ],
    },
  ])  
.then(answers => {
    console.log('Answer:', answers)
})