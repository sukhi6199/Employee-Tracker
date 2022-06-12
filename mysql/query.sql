-- employee ids, first names, last names, job titles, departments, salaries, and managers--

SELECT employee.first_name, employee.last_name,  
FROM employee, 
INNER JOIN roles 
ON employee.id = roles.id 


JOIN roles.title 
ON roles.title = department.title 
