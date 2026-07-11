## Note on Express JS
 ## 1. Express JS
 - It's a **web framework** for Node.js. It makes building servers **simple**. Instead of writing raw HTTP logic, Express gives us clean methods for routes, middleware, and settings.
  ### Setting Up
   - We import it and create an **app** instance:
   ```js
    const express = require("express");
    const app = express();
   ```
   - `app.set()` - to configure things. For example, telling Express which template engine to use: 
    `app.set("view engine", "ejs");`
     - this means when we res.render(), it looks for .ejs files.

   -  .....

 ## 2. Middleware
 - is a function that run in sequence between the request and the final route handler.
 - Think of it like a pipeline :
  - **Request → Middleware 1 → Middleware 2 → Route Handler → Response(or stops here if error/send)**

   ```js 
    function middleWare(req, res, next){
        //code goes here
        next(); // CRITICAL: moves to next middleware(func)
     }
   ```
- if `next()` is not written , request hangs forever.
- `app.use()` is used to mount middlewares at a specified path.
- `app.get()` :- is used to define routes to handle only **GET** requests. 
  - used for fetching data  
