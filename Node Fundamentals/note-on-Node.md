# Node JS
- ## 1.Intro 
    -There are 2 ways of running the node code 
     1. REPL(Run-Eval-Print-Loop) - used for testing , written in cmd,
      Interactive, runs line-by-line, good for testing
     2. in .js file
      Save code permanently, run the whole program at once, good 'for building apps
    - While Testing : Hello.js and hello.js printed the same so it wasn't case sensetive.(But deepseek said : "No, it IS case-sensitive — but X.js and x.js just happen to work on Windows and macOS because their file systems are case-insensitive by default.")

- ## 2.node module system 
    - Allows you to organize your code into resusable components
    - uses the standard common JS (which allows JS to import and export between files(modules))
    - common JS module.exports = ...  and require("")
    -Each file is a module (private by default)
    - Don't mix export and module.exports 


   ### 2.1 module wrapper 
   - The module wrapper is Node's way of making every file a private, self-contained module with all the tools you need to import/export and access file paths.

   - Imporing (using require(..) loads the file , executes the codes there and returns whatever module.exports contains)

- ## 3.Node Project Manager
    - is the default package manager for node, used for :
        - install ready made codes
        - Manage dep
        - Share your code with others
    - **Packages** : reusable code made by others
    - **Dependencies** - package required for your entire project to run
    - **DevDep** - only needed for testing and local development
    - npm install [pkgname]
    - Dep are essential when your code is cloned or used by other people also for tracking the version used
    - **scripts** used as shortcuts for commands you often use
    eg : ` "start": "node index.js" ` and then run `npm start`


## 4. Modules
- ### 4.1 Path Module : 
    provides utilities for working with **file and directory paths**.
    - Why Use It?
      -  Works on any OS 
      -  Handles path joining, parsing, and manipulation
      -  Avoids manual string concatenation errors
- ### 4.2 File System :
    - allows you to **interact with the file system** — create, read, update, and delete files and folders
    - provides three styles for file operations: **Sync , callback and promises**
    - `const fs = require('fs')`
    - readFileSync , writeFileSync , existsSync , mkdirSync(to Create directory) , unlinkSync(Delete Directory) ,renameSync , appendFileSync ,readdirSync 
    
    - `const fs = require('fs/promises')` - modern and recommended. 
- ### 4.3 HTTP Module : 
    -  allows you to **create web servers** and **make HTTP requests**.
    - `createServer()`
    - `listen()` - starts server on a port
    - **request** - an object containing everything about what the client wants.
    - **respond** - an objcet whcih contains what you send back to the client.
    

## 5. Essential JS Concepts
- ### 1.Callback and Callback Hell
    - **Callback** - is a function that is passed to other functions as an argument, and they are executed later.
    - Async can be acheived using callbacks and node is async
    - **Callback hell** - when nesting multiple of these the code becomes what is known as **pyramid of doom** which becomes difficult to read and maintain.
- ### 2. Promises
    - can be used to fix the callback hell problem
    - are objects representing a future value , think of it like a receipt from restaurant , the receipt is the promise that a food will come ,it might be resolved (as in success if you got your food) or rejected(failure so you are not getting your food for different reasons) 
    - `resolve(value)` -> goes to `.then()`
    - `reject(reason)` -> goes to `.catch()`
    - Hence `Promise` is a pending waiting to be FULFILLED (`resolve`) or REJECTED (`reject`)
     #### `Promise.all`  
    - used when you have many different promises to handle but those doesn't depend on each other so you use `.all` to compute it parallely
    - takes an array of promises
    - The catch (important): if any one of them rejects, Promise.all immediately rejects — you lose the results of the ones that succeeded.
    - When you want results even if some fail — `Promise.allSettled` 
    - results looks like : ``` [
   { status: 'fulfilled', value: userObj },
   { status: 'fulfilled', value: postsArr },
   { status: 'rejected', reason: Error }
 ]```
   - *what do you think happens if you never call resolve or reject inside the executor at all?* 
       - **It will be pending forever , no syntax error just a silent bug**


- ### 3. async - await
    - is modern way of handling promises , a syntax sugar as they say
    - uses try catch block instead of chaining .then and .catch
    - `async` tells the func to expect a promise while `await` pauses the block till its resolved like then
## 4. Event Emitter
 #### What It Is
   - Built-in Node.js module (`events`)
   - Allows objects to **emit** and **listen to** events
   - Core to Node.js event-driven architecture

 #### Import
```js
    const EventEmitter = require('events');
    const emitter = new EventEmitter();
```

 #### Main Methods
| Method | Purpose |
|--------|---------|
| `.on(event, listener)` | Listen to event (runs every time) |
| `.once(event, listener)` | Listen only once |
| `.emit(event, ...args)` | Trigger event, pass data |
| `.off(event, listener)` | Remove specific listener |
| `.removeAllListeners(event)` | Remove all listeners for event |

#### Basic Example
```js
emitter.on('greet', (name) => console.log(`Hi ${name}`));
emitter.emit('greet', 'John'); // Hi John
```

#### One-Time Listener
```js
emitter.once('welcome', (name) => console.log(`Welcome ${name}`));
emitter.emit('welcome', 'Alice'); // runs
emitter.emit('welcome', 'Bob');   // ignored
```

#### Custom Class (Inherit)
 ```js
class MyEmitter extends EventEmitter {}
const obj = new MyEmitter();
obj.on('event', () => {});
obj.emit('event');
```

#### Error Handling
```js
emitter.on('error', (err) => console.error(err.message));
emitter.emit('error', new Error('Something broke'));
```

#### Important Notes
- Listeners run **synchronously** by default
- Use `.off()` to prevent memory leaks
- Always handle `'error'` events to avoid crashes    