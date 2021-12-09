const inquirer = require('inquirer');
// const fs = require("fs");
// const generatePage = require("./src/page-template.js");
// const pageHTML = generatePage(name, github);

// fs.writeFile("./index.html", generatePage(name, github), err => {
//     if (err) throw new Error(err);

//     console.log('portfolio complete! check out index.html to see the output')
// })

inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'whats your name'
        }
    ])
    .then(answers => console.log(answers));


