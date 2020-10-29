const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    // array of questions for user
    return inquirer.prompt([
        {
            type: "input",
            name: "project_title",
            message: "What is your project tittled?"
          },
          {
            type: "input",
            name: "description",
            message: "Briefly describe your project"
          },
          {
            type: "input",
            name: "install",
            message: "Are there any installations required?"
          },
          {
            type: "input",
            name: "use",
            message: "What is the usage information?"
          },
          {
            type: "input",
            name: "contributions",
            message: "What are the contribibutions guidelines?"
          },
          {
            type: "input",
            name: "test",
            message: "What are the test instructions?"
          },
          {
            type: "checkbox",
            message: "Which license is your application covered under?",
            name: "license",
            choices: [
              "[MIT License](LICENSE.txt)", 
              "[GNU GPLv3 License](COPYING.txt)", 
            ]
          },
          {
            type: "input",
            name: "email",
            message: "What is your email account?"
          },
          {
            type: "input",
            name: "github",
            message: "What is your github username?"
          }
        ]);
      }

// function to generate markdown for README
function generateREADME(answers) {
  return `# ${answers.project_title}
    
#### Table of Contents
1. [Project Description](#project-description)
2. [Installation Instructions](#installation-instructions)
3. [Usage Information](#usage-information)
4. [Contributor Guidelines](#contributor-guidelines)
5. [Code of Conduct](#code-of-conduct)
6. [Test Instructions](#test-instructions)
7. [License](#license)
8. [Questions](#questions)


## Project Description
* ${answers.description}

## Installation Instructions
* ${answers.install}

## Usage Information
* ${answers.use}

## Contributor Guidelines
* ${answers.contributions}

## Code of Conduct
* [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md)

## Test Instructions
* ${answers.test}

## License
* licensed under the ${answers.license}

## Questions
* For additional help or questions about collaboration, please reach out to ${answers.email}

* Follow me on Github at [${answers.github}](http://github.com/${answers.github})`;
  
}

// function call to initialize program
promptUser()
  .then(function(answers) {
    const readme = generateREADME(answers);

    // function to write README file
    return writeFileAsync("README.md", readme);
  })
  .then(function() {
    console.log(" README.md has been created!");
  })
  .catch(function(err) {
    console.log(err);
  });