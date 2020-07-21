const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// empty array to hold employees
const employeesArray = [];

// array of questions for user
const questions = [
    {
        type: "input",
        message: "What is the employee's name?",
        name: "name"
      },
      {
        type: "input",
        message: "What is the the employee's id?",
        name: "id"
      },
      {
        type: "input",
        message: "What is the employee's email address?",
        name: "email"
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "role",
        choices: [
        "Intern", 
        "Engineer",
        "Manager"
        ]
      },
      {
          type: "input",
          message: "What school does this Intern attend?",
          name: "school",
          when: answers => {
              return (answers.role === "Intern");
          }
      },
      {
        type: "input",
        message: "What is this Engineer's Github username?",
        name: "github",
        when: answers => {
            return (answers.role === "Engineer");
        }
    },
    {
        type: "input",
        message: "What is this Manager's office number?",
        name: "officeNumber",
        when: answers => {
            return (answers.role === "Manager");
        }
    }
];

// question array to handle additional employees for user
const newEmpQues = [
    {
        type: "confirm",
        message: "Do you want to add another Employee?",
        name: "new"
      }
];

// function to initialize program
function init() {
    inquirer.prompt(questions).then(answers => {
        let name = answers.name;
        let id = answers.id;
        let email = answers.email;
        let role = answers.role;
        if (role === "Intern") {
            var newIntern = new Intern(name, id, email, answers.school);
            employeesArray.push(newIntern);
        } else 
        if (role === "Engineer") {
            var newEngineer = new Engineer(name, id, email, answers.github);
            employeesArray.push(newEngineer);
        } else 
        if (role === "Manager") {
            var newManager = new Manager(name, id, email, answers.officeNumber);
            employeesArray.push(newManager);
        }
// function call for additional employees or to finalize document.
        init2();
    });
};

// function to prompt for additional employees and if else statement to finish prompts and
// write to file.
function init2() {
    inquirer.prompt(newEmpQues).then(newAnswers => {
        if (newAnswers.new) {
            init();
        } else {
        fs.writeFile(outputPath, render(employeesArray), function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("Your input has been successfully rendered to team.html!");
      })
        }
    });
}

// function call to initialize program
init();
