
// const __filename = 2;
// console.log(__filename);
// ReferenceError: require is not defined in ES module scope, you can use import instead

const path = require('path')
const fs = require('fs')

const datafolder = path.join(path.dirname(__filename),"data")

//SYNC WAY
 
if(!fs.existsSync(datafolder)){
    fs.mkdirSync("data")
    console.log("Folder Created!");
    
}
//Write
const SampleFilePath = path.join(datafolder,"Sample.txt")

fs.writeFileSync(SampleFilePath, "Hello from fs.js")

 console.log("Folder Created!");

 //Read from file

 const readFromFile = fs.readFileSync(SampleFilePath,"utf-8");

 console.log("File content of SampleFilePath" , readFromFile);
 
 // Append
 fs.appendFileSync(SampleFilePath , "\nHello again I was appended")



//ASYNC WAY

 const asyncFile = path.join(datafolder, "async-example.txt");
 
//Write Async
 fs.writeFile(asyncFile , "Hi , Async Node js", (err) => {
    if (err) throw err
    console.log(" Async file Created!");

 })
 //If you forgot the callback fun:
 //TypeError [ERR_INVALID_ARG_TYPE]: The "cb" argument must be of type function. Received undefined



//Append
fs.appendFile(asyncFile , "\nSecond line" , (err) => {if (err) throw err
    console.log("Second line added to Async ")})

// Read Async
 fs.readFile(asyncFile , "utf-8", (err , data) => {
    if (err) throw err
    console.log(" Async file Read : " , data)
})
//If format is not specified like "utf-8" : <Buffer 48 69 20 2c 20 41 73 79 6e 63 20 4e 6f 64 65 20 6a 73> such kind of data is returned!