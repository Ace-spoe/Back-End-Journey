## MongoDB 
 - MongoDB is a NoSQL database (stores data in documents which looks like JSON) , while traditional DB use SQL databases (tables witih rows and columns).
 - Example of a document:
     ```js 
      {
        "_id": "abc123",
        "name": "John Doe",
        "email": "john@example.com",
        "age": 28,
        "hobbies": ["reading", "gaming"],
        "address": {
            "city": "Nairobi",
            "country": "Kenya"
        }
     }` 
 - a group of similar documnets are called **collections**

### Mongoose
 - is a library for node.sj that makes wrking with mongo db easier and safer
 - benefits include **schema definition , model creation , easy CRUD operation and more**

- So mongo DB with out the helper tool (mongoose) is the pure method that build every thing from scratch while the monogoose is built up on mongo DB and it's native driver methods by adding additional powerful methods , schemas and models. think it like its an **Architect + Construction Team** - that being said its just runs the native methods under the hood.
 
- Schema - a blue print of how the obeject should be.
- Model - the constructor function that is used to create a JS object based on the provided schema , these object not only includes the model's property but also methods for saving the object to the DB(like save()) and other methods.

### Methods
- find({}) : the parameter is the searching condition which adhere to the Mongo search query syntax. 
```js
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
//All notes
```












### Side Notes
- mongoose.connect(url, { family: 4 }) - the { family: 4 } specifies that the connection should always use the IPV4 

- `const Note = mongoose.model('Note', noteSchema)`
  - The schema tells Mongoose how the note objects are to be stored in the database.

  - the first "Note" parameter is the singular name of the model. The name of the collection will be the lowercase plural notes, because the Mongoose convention is to automatically name collections as the plural (e.g. notes) when the schema refers to them in the singular (e.g. Note).

  - documnent based databases like mongo are schemaless.

  - **process.argv** is an array containing all command-line arguments passed when you run your Node.js script.
  - **process.exit(1)** - exit with error

