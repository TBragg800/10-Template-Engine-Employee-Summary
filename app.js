const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

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

const newEmpQues = [
    {
        type: "confirm",
        message: "Do you want to add another Employee?",
        name: "new"
      }
];

// function to write README file
// function writeToFile(fileName, data) {
//     fs.writeFile(fileName, data, (err) => {

//         if (err) {
//           return console.log(err);
//         }

//         console.log("Success!");
      
//       });
// }

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
        init2();
    });
};

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
