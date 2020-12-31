const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { template } = require("@babel/core");

const team = []

const newEmployee = [
    {
        type: "confirm",
        name: "employee",
        message: "Do you want to create a new employee?"
    },
];

const employeeInfo = [
    {
        type: "list",
        name: "type",
        message: "What is this employee's position?",
        choices: ["Manager", "Engineer", "Intern"]
    },

    {
        type: "input",
        name: "name",
        message: "What is this employee's name?",
    },

    {
        type: "input",
        name: "id",
        message: "What is this employee's assigned ID number?",
    },

    {
        type: "input",
        name: "email",
        message: "What is this employee's company email address?",
    },

    {
        type: "input",
        name: "phone",
        message: "What is this employee's office phone number?",
        when: function(answers) {
            return answers.type === "Manager";
        },
    },

    {
        type: "input",
        name: "git",
        message: "What is this employee's GitHub user name?",
        when: function(answers) {
            return answers.type === "Engineer";
        },
    },

    {
        type: "input",
        name: "school",
        message: "Where does this employee attend school?",
        when: function(answers) {
            return answers.type === "Intern";
        },
    },

]

async function init() {
    let answer = await inquirer.prompt(newEmployee);
    if (answer.employee === false) {
        console.log("Bye for now! See you when you have new hires!");
    }
    else {let employeeInfoAnswers = await inquirer.prompt(employeeInfo)
        createEmployee(employeeInfoAnswers);
        init();
        const teamInfo = render(team);
        fs.writeFile(outputPath, teamInfo, (error) => {console.log(error)});
    };
}

function createManager (answers) {
    const manager = new Manager (answers.name, answers.id, answers.id, answers.phone);
    team.push(manager);
};

function createEngineer (answers) {
    const engineer = new Engineer (answers.name, answers.id, answers.id, answers.git);
    team.push(engineer);
};

function createIntern (answers) {
    const intern = new Intern (answers.name, answers.id, answers.id, answers.school);
    team.push(intern);
};

function createEmployee (answers) {
    if (answers.type === "Manager") {
        createManager(answers);
    }
    else if (answers.type === "Engineer") {
        createEngineer(answers);
    }
    else createIntern(answers);
    }    
;

init();


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
