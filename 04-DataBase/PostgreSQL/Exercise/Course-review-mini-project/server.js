import express from 'express'
import pg from 'pg'
import pool from './db.js'
const app = express()

const errorHandler = (err, req, res, next) => {
    console.error(err)

    return res.status(500).json({
        message: 'Internal server ERROR',
        error: err.message
    })
}

app.use(express.json())

app.post('/courses', async (req , res , next) => {

    try{
        const {title , code} = req.body
        if(!title || !code ){
        return res.status(400).json({
        message : 'Enter title and a  code values'
     })   
    }
    // pool.query(SQL, VALUES) - syntax
    // Without returning pool.query will return an object like { rows : [] , rowCount : 1} So  you cannot get the inserted/updated column values
     const result =  await pool.query('INSERT INTO courses(title , code) VALUES ($1 , $2) RETURNING id , title , code ', [title , code]) // $1 and $2 , These are parameters/placeholders.
     return res.status(201).json({
        success : true ,
        message : 'Created Succesfully!' ,
        data : result.rows[0]
     })
    }
    catch(err){
        next(err)
    }
})

app.get('/courses/:id' , async (req , res, next) => {
    try{
        const { id } = req.params
        if(id){
            const result = await pool.query('SELECT c.title AS course_name , r.rating , r.body AS review_body FROM courses c LEFT JOIN reviews r ON c.id = r.course_id WHERE c.id = $1', [id])

            return res.json({
                success : true ,
                data : result.rows
            })
        }

    }catch(err){
        next(err)
    }


})

// UNFINISHED
// app.post('/courses/:id/reviews' , async (req ,res , next) => {
//     try {
//          const { user_id , course_id , rating , body } = req.body 
//     if (!user_id || !course_id || !rating) {
//         return res.status(400).json({
//             success : false ,
//             message : 'user_id , course_id , rating properly'
//         })
//     }
//     if(rating > 5 || rating < 1){
//         return res.status(400).json({
//             success : false ,
//             message : 'Rating could only be between 1 - 5'
//         })
//     }

//     const result = await pool.query('INSERT INTO reviews(user_id , course_id , rating, body) VALUES ($1 , $2 , $3 , $4)' , [user_id , course_id , rating , body])
//     }catch(err){
//         next(err)
//     }
   
// })

const PORT = process.env.port

app.listen(PORT, () => {
    console.log(`Connected to ${PORT}`)
});





app.use(errorHandler)