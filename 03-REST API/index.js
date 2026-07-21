const express = require('express')
const app = express()

app.use(express.json())

let books = [
  { id: 1 , title : 'Book 1' },
  { id: 2 , title : 'Book 2' },
  { id: 3 , title : 'Book 3' }
]


app.get('/', (req,res) => {
  res.json({
    messgae : 'Welcome'
  })
})

app.get('/get', (req,res) => {
  res.json(books)
})

app.get('/get/:id', (req,res) => {
  const reqBookID = req.params.id
  const reqBook = books.find((book) => (book.id == reqBookID))

  reqBook ? res.json(reqBook) :
    res.status(404).json({ messgae : 'Book not found!' })
})

app.post('/add', (req,res) => {
  const newBook = {
    id : books.length + 1,
    title : `Book${books.length + 1}`
  }

  books.push(newBook)

  res.status(201).json({
    data: newBook,
    message: 'New Book has been Added!'
  })
})

app.put('/update/:id', (req, res) => {
  const findBook = books.find(book => book.id == req.params.id)

  if (findBook) {
    findBook.title = req.body?.title || findBook.title
    //The ?. operator means "only access title if req.body exists."

    return res.status(200).json({
      message: `Book with ID ${req.params.id} updated successfully!`,
      data: findBook
    })
  }

  return res.status(404).json({
    message: 'Book not Found!'
  })
})

// I missed th slash(/) in '/delete/:id' as in like I wrote 'delete/:id' that's why it wasn't working :_

app.delete('/delete/:id', (req,res) => {
  const IndexOfCurrent = books.findIndex(book => book.id == req.params.id)

  if(IndexOfCurrent !== -1){
    const deletedBook = books.splice(IndexOfCurrent,1)

    res.status(200).json({
      message: `Book with ID ${req.params.id} was deleted successfully!`,
      data: deletedBook[0]
    })
  }
  else{
    res.status(404).json({
      message: 'Book not Found!'
    })
  }


})



const port = 3000

app.listen(port , () => {
  console.log(`server on port : ${port}`)

})
