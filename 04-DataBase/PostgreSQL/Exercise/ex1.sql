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


-- SELECT p.title AS project_title,
--     CASE
--   WHEN COUNT(pa.employee_id) >= 2 THEN 'Heavy'
--   WHEN COUNT(pa.employee_id) = 1 THEN 'Light'
--   ELSE 'Empty'
--  END AS workload
-- FROM projects p
-- LEFT JOIN project_assignments pa
-- ON pa.project_id = p.id
-- GROUP BY p.title
-- ORDER BY p.title ASC;



-- Scenario:
-- Build a database for an E-Commerce Platform.

-- Requirements:
-- Entities:

-- Customers (id, name, email)

-- Orders (id, customer_id, order_date, status)

-- Products (id, name, price, category)

-- Order_Items (order_id, product_id, quantity)

-- Relationships:

-- A customer can place many orders, but an order belongs to one customer (1-to-many)

-- An order can contain many products, and a product can appear in many orders (many-to-many via junction table)

-- 📝 Your Tasks:
-- Task 1: Create the Schema
-- Write the CREATE TABLE statements for all 4 tables (including the junction table). Use proper data types, primary keys, foreign keys, and constraints. 
-- Task 2: Seed Data
-- Insert:

-- 3 customers

-- 4 products

-- 3 orders (distributed among customers)

-- Order items (each order should have 2-3 products)

-- Task 3: Write Queries
-- Show all orders with the customer's name

-- Show total revenue (sum of price × quantity) per order

-- Find which products have been ordered more than 1 time

-- Show all customers and how many orders they've placed (include customers with 0 orders)

-- Find customers who have spent more than $100 total (using HAVING)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;

CREATE TYPE  status AS ENUM ('pending' , 'delivered' , 'shipped') ;
CREATE TYPE  category_types AS ENUM ('Electronics' , 'Office' , 'Kitchen' , 'Health');

CREATE TABLE customers (
  id SERIAL PRIMARY KEY ,
  name TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY ,
  customer_id INT REFERENCES customers(id),
  order_date TIMESTAMP NOT NULL DEFAULT NOW(),
  status status NOT NULL DEFAULT 'pending'
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY ,
  name TEXT NOT NULL,
  price NUMERIC(5,2) NOT NULL ,
  category category_types NOT NULL 
);

CREATE TABLE order_items (
  order_id INT NOT NULL REFERENCES orders(id),
  product_id INT NOT NULL REFERENCES products(id), 
  quantity INT NOT NULL CHECK (quantity > 0)
);


-- 3 Customers
INSERT INTO customers (name, email) VALUES 
('Alice Johnson', 'alice@example.com'),
('Bob Smith', 'bob@example.com'),
('Charlie Brown', 'charlie@example.com');

-- 4 Products
INSERT INTO products (name, price, category) VALUES 
('Laptop', 999.99, 'Electronics'),
('Wireless Mouse', 29.99, 'Electronics'),
('Coffee Mug', 14.50, 'Kitchen'),
('Notebook', 5.99, 'Office');

-- 3 Orders
INSERT INTO orders (customer_id, order_date, status) VALUES 
(1, '2026-01-15', 'delivered'),
(2, '2026-02-20', 'shipped'),
(1, '2026-03-05', 'pending');

-- Order Items (Each order has 2-3 products)
INSERT INTO order_items (order_id, product_id, quantity) VALUES 
-- Order 1: Laptop + Mouse
(1, 1, 1),
(1, 2, 2),

-- Order 2: Coffee Mug + Notebook
(2, 3, 3),
(2, 4, 5),

-- Order 3: Laptop + Coffee Mug + Notebook
(3, 1, 1),
(3, 3, 2),
(3, 4, 10);

-- Show all orders with the customer's name
-- SELECT o.id AS order_id , c.name
-- FROM orders o 
-- JOIN customers c 
-- ON c.id = o.customer_id;

-- Show total revenue (sum of price × quantity) per order

-- SELECT o.id AS order_id , SUM (p.price * oi.quantity)
-- FROM orders o 
-- JOIN order_items oi
-- ON oi.order_id = o.id
-- JOIN products p
-- ON oi.product_id = p.id
-- GROUP BY o.id;

-- Find which products have been ordered more than 1 time

-- SELECT p.name , SUM(oi.quantity)
-- FROM products p
-- JOIN order_items oi
-- ON p.id = oi.product_id
-- GROUP BY p.name
-- HAVING SUM(oi.quantity) > 1;


-- Show all customers and how many orders they've placed (include customers with 0 orders)
-- SELECT c.name , SUM(oi.quantity) AS total_orders
-- FROM customers c
-- LEFT JOIN orders o
-- ON o.customer_id = c.id
-- LEFT JOIN order_items oi
-- ON oi.order_id = o.id
-- GROUP BY c.name;


-- Find customers who have spent more than $100 total (using HAVING)
SELECT c.name , SUM(p.price * oi.quantity) AS total_spent
FROM customers c
JOIN orders o
ON o.customer_id = c.id
JOIN order_items oi
ON oi.order_id = o.id
JOIN products p
ON p.id = oi.product_id
GROUP BY c.name
HAVING SUM(p.price * oi.quantity) > 100;

