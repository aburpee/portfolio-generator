const inquirer = require('inquirer');
const fs = require("fs");
const generatePage = require("./src/page-template.js");
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
            message: 'whats your name',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('please enter your name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'enter your github username',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                }
                else {
                    console.log('please enter your github username');
                    return false;
                }
            }
        },
        {
            type:'confirm',
            name: 'confirmAbout',
            message: 'would you like to enter some information about yourself for an "about" section',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'provide some information about yourself',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                }
                else {
                    return false;
                }
            }
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
            message: 'what is the name of your project',
            validate: projectInput => {
                if (projectInput) {
                    return true;
                }
                else {
                    console.log('please enter your project name');
                    return false;
                }
            }
        },
        {
        type: 'input',
        name: 'description',
        message: 'provide a description of your project',
        validate: projectDescriptionInput => {
            if (projectDescriptionInput) {
                return true;
            }
            else {
                console.log('please enter your project description');
                return false;
            }
        }
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
            message: 'enter the github link to your project (required)',
            validate: githubLinkInput => {
                if (githubLinkInput) {
                    return true;
                }
                else {
                    console.log('please enter your github project link');
                    return false;
                }
            }
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
.then(portfolioData => {
    const pageHTML = generatePage(portfolioData);

    fs.writeFile('./index.html', pageHTML, err => {
        if (err) throw new Error(err);
    console.log('page created! check out index.html in this directory')

    });
});
