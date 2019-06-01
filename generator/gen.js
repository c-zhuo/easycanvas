const inquirer = require('inquirer');
const chalk = require('chalk');
const validFilename = require('valid-filename');
const ncp = require('ncp').ncp;
const path = require('path');

ncp.limit = 16;

module.exports = function (args) {
    inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: 'Project name?',
        validate: value =>
            new Promise(resolve => {
                resolve(validFilename(value) || 'You must provide a valid name')
            })
    }, {
        name: 'type',
        type: 'list',
        message: 'Language?',
        choices: ['Node + Javascript', 'Node + Typescript'],
        default: 0,
    }]).then((answers) => {
        ncp(path.resolve(__dirname, 'template-jsx'), path.resolve('./', answers.name), (err) => {
            if (err) {
                return console.error(err);
            }
            console.log(chalk.green(`Project init successfully. Enter /${answers.name} and install packages before starting project with 'npm run dev'.`));
        });
    });
};
