const inquirer = require('inquirer')
const console_table = require('console.table');
const mysql = require('mysql2');


//creating a connection to mySQL using the database "classlist_db"
const db = mysql.createConnection( 
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`),
);

//function to start Inquirer prompts
function startPrompt() {
inquirer.prompt ([
    {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
            "view all departments",
            "view all roles",
            "view all employees",
            "add a department",
            "add a role",
            "add an employee",
            "update an employee",
        ]
    }
]).then ((answers) => {
    console.log(answers.options + "choosing answers")
    switch (answers.options) {
        case "view all departments":
            allDepartments();
            break;
        case "view all roles":
            allRoles();
            break;
        case "view all employees":
            allEmployees();
            break;
        case "add a department":
            addDepartment();
            break;
        case "add a role":
            addRole();
            break;
        case "add an employee":
            addEmployee();
            break;
        case "update an employee":
            updateEmployee();
            break;
        case "quit":
            return;
        }
    })
};

// view all departments
function allDepartments() {
    db.query('SELECT * FROM department', 
        function (err, results) {
        if(err) throw (err)
        console.table(results);
        startPrompt();
    })
};

// view all roles
function allRoles() {
    db.query('SELECT * FROM roles', 
        function (err, results) {
        if(err) throw (err)
        console.table(results);
        startPrompt();
    });
};

// view all employees
function allEmployees() {
    db.query("Select employee.id, employee.first_name, employee.last_name, manager.first_name AS manager, roles.title, roles.salary, department.names AS department FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id",
    function (err, results) {
        if(err) throw (err);
        console.table(results);
        console.log("all employees viewed")
        startPrompt();
    });
};

// add Department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "addDepartmentName",
            message: "What is the department name that you'd like to add?"
        }
    ]).then(function (res) {
    db.query('INSERT INTO department SET ?', 
    {
        names: res.addDepartmentName,
    }, 
    function (err, res) {
        console.table(res)
        startPrompt();
        })
    })
};

// add a Role
const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "addRoleName",
            message: "What role would you like to add?"
        },
        {
            type: "input",
            name: "addRoleSalary",
            message: "What is their salary?"
        },
        {
            type: "input",
            name: "addRoleDepartment",
            message: "What is the department's id?"
        }
    ]).then((function (answer) {
        db.query('INSERT INTO roles SET ?',
        {
            title: answer.addRoleName,
            salary: answer.addRoleSalary,
            department_id: answer.addRoleDepartment
        },
        function (err, res) {
            if(err) throw (err);
        });
            console.table(answer)
            startPrompt();
    }))
};

// add an Employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "addEmployeeFirstName",
            message: "What is the new Employee's first name?"
        },
        {
            type: "input",
            name: "addEmployeeLastName",
            message: "What is the new Employee's last name?"
        },
        {
            type: "input",
            name: "addEmployeeRole",
            message: "What is their role's id?"
        },
        {
            type: "input",
            name: "addEmployeeManager",
            message: "Who is their manager's id?"
        }        
    ]).then (((answers) => {
        db.query('INSERT INTO employee SET ?', 
            {
                first_name: answers.addEmployeeFirstName,
                last_name: answers.addEmployeeLastName,
                role_id: answers.addEmployeeRole,
                manager_id: answers.addEmployeeManager
            },
            function (err, results) {
            if(err) throw (err);
            console.table(results)
            startPrompt();
        });
    })
)};

// update an Employee
const updateEmployee = () => {
    inquirer.prompt([
            {
                type: "input",
                name: "addRoleName",
                message: "Which employee would you like to update?",
                choices: employees
            },
            {
                type: "input",
                name: "addRoleDepartment",
                message: "What role id does this employee now have?",
                choices: roles
            }
        ]).then((function (answers) {
            db.query('UPDATE employee WHERE ? SET ?', 
            [ 
                {
                    first_name, last_name: answers.addRoleName     
                },
                {
                    roles_id: answers.addRoleDepartment     
                }
            ], 
            function (err, results) {
                if(err) throw (err);
                
                console.table(results)
                startPrompt();
            });
    }))
};

startPrompt();
