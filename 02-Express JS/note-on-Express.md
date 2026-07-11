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
- `app.all()` : runs for any request method(GET,POST,DELETE,...)

 ### Terms 
 - **Route** : when  a req comes in matching this METHOD + URL PATH , DO THIS. 
   - (i.e `app.method('/urlpath'), functionX`) : this is one route
 - **Route handler** - the callback function (functionX) from above 
 - **Routing** - the overall process of matching the incoming req wih the correct handler from the available routes
   ```js 
   app.get('/users', handlerA);
   app.post('/users', handlerB);
   app.get('/products', handlerC);
   ```
   - Say when `GET/products` is requested , Express's routing system checks which one matches and choose the proper handler (that is handlerC in the above example)

 - **Router** : a mini version of app used for grouping routes like a container in their own file instead of one giant `app.js`