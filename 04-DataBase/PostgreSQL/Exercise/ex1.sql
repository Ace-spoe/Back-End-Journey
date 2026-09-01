-- -- Reset Everything
-- DROP TABLE IF EXISTS employees CASCADE;
-- DROP TABLE IF EXISTS departments CASCADE;
-- DROP TABLE IF EXISTS projects CASCADE;

-- -- Create Parent Table
-- CREATE TABLE departments (
--     id SERIAL PRIMARY KEY,
--     name TEXT NOT NULL UNIQUE
-- );

-- -- Create Child Table (Employees belong to a Department)
-- CREATE TABLE employees (
--     id SERIAL PRIMARY KEY,
--     name TEXT NOT NULL,
--     salary NUMERIC(10,2) NOT NULL,
--     department_id INT REFERENCES departments(id)
-- );

-- -- Create Many-to-Many Table (Employees work on many Projects)
-- CREATE TABLE projects (
--     id SERIAL PRIMARY KEY,
--     title TEXT NOT NULL
-- );

-- -- Junction Table
-- CREATE TABLE project_assignments (
--     employee_id INT REFERENCES employees(id),
--     project_id INT REFERENCES projects(id),
--     PRIMARY KEY (employee_id, project_id)
-- );

-- -- SEED DATA
-- INSERT INTO departments (name) VALUES 
-- ('Engineering'), 
-- ('Sales'), 
-- ('Human Resources');

-- INSERT INTO employees (name, salary, department_id) VALUES 
-- ('Alice', 95000, 1),
-- ('Bob', 60000, 2),
-- ('Charlie', 120000, 1),
-- ('Diana', 55000, 2),
-- ('Eve', 80000, 3),
-- ('Frank', 70000, NULL); -- Frank has no department!

-- INSERT INTO projects (title) VALUES 
-- ('Project Alpha'), 
-- ('Project Beta'), 
-- ('Project Gamma');

-- INSERT INTO project_assignments (employee_id, project_id) VALUES 
-- (1, 1), -- Alice on Alpha
-- (1, 2), -- Alice on Beta
-- (3, 1), -- Charlie on Alpha
-- (3, 3), -- Charlie on Gamma
-- (2, 2), -- Bob on Beta
-- (5, 3); -- Eve on Gamma


-- ROUND 1 :
-- Question 1:
-- Write a query to show the name and salary of every employee in the company. Sort it so the highest salary is at the top.

-- SELECT 
--     e.name,
--     e.salary

-- FROM employees e
-- ORDER BY e.salary DESC;

-- Question 2:
-- Write a query to show the name of every employee, along with the name of their department. (Hint: You need a JOIN. Also, don't forget about Frank! We want to see him in the results even though he has no department).

-- SELECT 
--     e.name AS employee_name,
--     d.name AS dept_name
-- FROM employees e 
-- LEFT JOIN departments d 
-- ON e.department_id = d.id
-- ORDER BY e.name ASC;

-- Question 3:
-- Write a query to find the names of all employees who are assigned to 'Project Alpha'.

-- SELECT e.name AS employee_name , p.title AS project
-- FROM employees e
-- JOIN project_assignments pa
-- ON pa.employee_id = e.id
-- JOIN projects p
-- ON pa.project_id = p.id
-- WHERE p.title ILIKE 'Project Alpha';

-- Question 4:
--Write a query to show the title of every project, and the total number of employees working on it.

-- SELECT 
--  p.title AS project,
--  COUNT(e.id) AS total_employee
-- FROM projects p
-- LEFT JOIN project_assignments pa
-- ON pa.project_id = p.id
-- LEFT JOIN employees e
-- ON  pa.employee_id = e.id
-- GROUP BY p.title;

-- ROUND 2 :

-- Question 1: The Average
-- Write a query to show the average salary of employees in the company. Give the column a nice name like average_salary.
-- SELECT ROUND(AVG(e.salary),2) AS average_salary
-- FROM employees e;


-- Question 2: Department Spending
-- Write a query to show the name of each department and the total sum of salaries paid to employees in that department. Sort it so the department that costs the most is at the top. (Don't worry about employees with no department for this one).
-- SELECT d.name AS dept_name , 
--        SUM(e.salary) AS total_paid_to_employees
-- FROM departments d
-- JOIN employees e
-- ON d.id = e.department_id
-- GROUP BY d.name
-- ORDER BY SUM(e.salary) DESC;

-- Question 3: The High Earners
-- Write a query to find which departments have an average salary greater than 70,000. Show the department name and their average salary.
-- SELECT d.name AS dept_name , ROUND(AVG(e.salary),2) AS average_salary
-- FROM departments d
-- JOIN employees e
-- ON d.id = e.department_id
-- GROUP BY d.name
-- HAVING ROUND(AVG(e.salary),2) > 70000;

-- Question 4: The Overloaded Employees
-- Write a query to show the name of any employee who is working on more than 1 project. (Hint: You don't need the projects table for this, just employees and the junction table. Use HAVING).

-- SELECT e.name AS employee_name 
-- FROM employees e
-- JOIN project_assignments pa
-- ON pa.employee_id = e.id
-- GROUP BY e.name
-- HAVING COUNT(e.id) > 1;

--  ROUND 3 :-

-- Question 1: The "Above Average" Report
-- Write a query to show the name and salary of all employees who earn more than the average salary of the entire company. Sort it from richest to poorest.
 -- (Hint: You cannot use AVG(salary) directly in a WHERE statement. You need a subquery!)
-- SELECT e.name AS employee_name,
--        e.salary
-- FROM employees e
-- WHERE e.salary > (
--     SELECT ROUND(AVG(e.salary),2)
--     FROM employees e
-- );

-- Question 2: The Biggest Spender
-- Write a query to show the name of the department that has the highest total salary.
-- (Hint: This requires a subquery. First, find the MAX total salary, then find which department's SUM matches it).

-- SELECT d.name 
-- FROM departments d
-- LEFT JOIN employees e
-- ON e.department_id = d.id
-- GROUP BY d.name
-- ORDER BY SUM(e.salary) DESC
-- LIMIT 1;







-- Question 3: The "No Work" Employees
-- Write a query to show the name of all employees who are not assigned to any projects.
-- (Hint: You can use NOT IN with a subquery, or a LEFT JOIN with IS NULL.)
-- SELECT e.name
-- FROM employees e 
-- LEFT JOIN project_assignments pa
-- ON pa.employee_id = e.id
-- WHERE pa.employee_id IS NULL
-- METHOD 2:
-- SELECT e.name , pa.employee_id
-- FROM employees e 
-- LEFT JOIN project_assignments pa
-- ON pa.employee_id = e.id
-- WHERE e.id NOT IN (
--     SELECT pa.employee_id
--     FROM project_assignments pa
-- );



-- Question 4: The Project Status (Advanced)
-- Write a query to show the title of every project, and next to it, a column called workload that says:

-- 'Heavy' if 2 or more employees are working on it.

-- 'Light' if only 1 employee is working on it.

-- 'Empty' if 0 employees are working on it.
-- (Hint: You will need a LEFT JOIN, COUNT, GROUP BY, and a CASE WHEN statement.)


SELECT p.title AS project_title,
    CASE
  WHEN COUNT(pa.employee_id) >= 2 THEN 'Heavy'
  WHEN COUNT(pa.employee_id) = 1 THEN 'Light'
  ELSE 'Empty'
 END AS workload
FROM projects p
LEFT JOIN project_assignments pa
ON pa.project_id = p.id
GROUP BY p.title
ORDER BY p.title ASC;
