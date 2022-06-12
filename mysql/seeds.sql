INSERT INTO department (names)
VALUES 
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO roles (title, id, department_id, salary )
VALUES 
    ("Sales Lead", 1, 1, 10000),
    ("Salesperson", 2, 1, 10000),
    ("Lead Engineer", 3, 2, 10000),
    ("Software Engineer", 5, 2, 1000),
    ("Account Manager", 4, 3, 1000),
    ("Accountant", 6, 3, 3000),
    ("Legal Team Lawyer", 7, 4,  40000),
    ("Lawyer", 8, 4, 5000);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES
    ("Frank", "Catania Sr.", null, 1),
    ("Joe", "Gorga", null, 2),
    ("Bill", "Ayden", 3, 3),
    ("Evan", "Goldschneider", null, 6),
    ("Joe", "Benigno", 1, 8);
