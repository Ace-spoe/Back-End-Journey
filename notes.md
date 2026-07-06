# Node JS
## 1.Intro 
    -There are 2 ways of running the node code 
     1.REPL(Run-Eval-Print-Loop) - used for testing , written in cmd,
      Interactive, runs line-by-line, good for testing
     2. in .js file
      Save code permanently, run the whole program at once, good 'for building apps
    - While Testing : Hello.js and hello.js printed the same so it wasn't case sensetive.(But deepseek said : "No, it IS case-sensitive — but X.js and x.js just happen to work on Windows and macOS because their file systems are case-insensitive by default.")

## 2.node module system 
    - Allows you to organize your code into resusable components
    - uses the standard commom JS (which allows JS to import and export between files(modules))
    - common JS module.exports = ...  and require("")
    -Each file is a module (private by default)
    - Don't mix export and module.exports 


   ### 2.1 module wrapper 
   - The module wrapper is Node's way of making every file a private, self-contained module with all the tools you need to import/export and access file paths.

   - Imporing (using require(..) loads the file , executes the codes there and returns whatever module.exports contains)

## 3.Node Project Manager
    - is the default package manager for node, used for :
        - install ready made codes
        - Manage dep
        - Share your code with others
    - Packages : reusable code made by others
    - **Dependencies** - package required for your entire project to run
    - **DevDep** - only needed for testing and local development
    - npm install [pkgname]
    Dep are essential when your code is cloned or used by other people also for tracking the version used
    - **scripts** used as shortcuts for commands you often use
    eg : ` "start": "node index.js" ` and then run `npm start`


## 4. Modules
- ### 4.1 Path Module : 
    provides utilities for working with **file and directory paths**.
    -Why Use It?
      ✅ Works on any OS 
      ✅ Handles path joining, parsing, and manipulation
      ✅ Avoids manual string concatenation errors
- ### 4.2 File System :
    - allows you to **interact with the file system** — create, read, update, and delete files and folders
    - provides three styles for file operations: **Sync , callback and promises**
    - `const fs = require('fs')`
    - readFileSync , writeFileSync , existsSync , mkdirSync(to Create directory) , unlinkSync(Delete Directory) ,renameSync , appendFileSync ,readdirSync 
    
    - `const fs = require('fs/promises')` - modern and recommended. 
- ### 4.3 HTTP Module : 
    -  allows you to **create web servers** and **make HTTP requests**.
    - `createServer()`
    `listen()` - starts server on a port
    - **request** - an object containing everything about what the client wants.
    - **respond** - an objcet whcih contains what you send back to the client.
    
