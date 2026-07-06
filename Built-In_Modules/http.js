// const http = require("http");

// const server =  http.createServer((res ,req) => {
//     // console.log("req" , req);
//     res.wrtieHead(200 , { 'Content-Type': 'text/plain' })
//     res.end("Hi from node js")
// })

// const port = 3000;
// server.listen(port , () => {
//     console.log(`server is listening to port :${port}`);
    
// })

const http = require('http');

// Create server
const server = http.createServer((request, response) => {
    // This runs for EVERY request
    
    // Send a response
    response.end('Hello World!');
});

// Start server on port 3000
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});