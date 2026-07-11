const http = require("http");

const server = http.createServer((req , res)=>{
    res.writeHead(200 , {"content-type" : "text/html"})
    res.end("<h1>Hello </h1>")
    console.log(res.statusCode)
})

const port = 3000;
server.listen(port , ()=>{
    console.log(`server listening to ${port}`);
    
})


// const http = require('http');

// // Create server
// const server = http.createServer((request, response) => {
//     // This runs for EVERY request
    
//     // Send a response
//     response.end('Hello World!');
// });

// // Start server on port 3000
// server.listen(3000, () => {
//     console.log('Server running on http://localhost:3000');
// });