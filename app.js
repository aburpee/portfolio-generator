const inquirer = require('inquirer');
// const fs = require("fs");
// const generatePage = require("./src/page-template.js");
// const pageHTML = generatePage(name, github);

// fs.writeFile("./index.html", generatePage(name, github), err => {
//     if (err) throw new Error(err);

//     console.log('portfolio complete! check out index.html to see the output')
// })

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'whats your name'
        },
        {
            type: 'input',
            name: 'github',
            message: 'enter your github username'
        },
        {
            type: 'input',
            name: 'about',
            message: 'provide some information about yourself'
        }
    ]);
};
const promptProject = portfolioData => {
    if (!portfolioData.projects) {
    portfolioData.projects = [];
    }
    console.log(`
        =================
        Add a new project
        =================
    `);
    return inquirer.prompt([
        {
            type:'input',
            name: 'name',
            message: 'what is the name of your project'
        },
        {
        type: 'input',
        name: 'description',
        message: 'provide a description of your project'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'what did you build this project with (check all that apply)',
            choices: ['js', 'html', 'css', 'es6', 'jquery', 'bootstrap', 'node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'enter the github link to your project (required)'
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'would you like to feature this project',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'would you like to enter another project',
            default: false
        }
    ]).then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        }
        else {
            return portfolioData;
        }
    }
)};
promptUser()
.then(promptProject)
.then(portfolioData=> {
console.log(portfolioData);
})
