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

app.get('/courses/:id' , async (req , res , next) => {
    try{
        const { id } = req.params
        
            const result = await pool.query('SELECT c.title AS course_name , r.rating , r.body AS review_body FROM courses c LEFT JOIN reviews r ON c.id = r.course_id WHERE c.id = $1', [id])
            if(!result.rows) {
                return res.status(404).json({
                success : false,
                message : "Course isn't found"
            })
            }
            return res.json({
                success : true ,
                data : result.rows
            })


    }catch(err){
        next(err)
    }


})

app.post('/users' , async (req , res , next ) => {
    const { name } = req.body
    if(!req.body || !name){
        return res.status(400).json({
            sucess : false ,
            message : 'Insert Body properly with name'
        })
    }

    const result = await pool.query('INSERT INTO users(name) VALUES($1) RETURNING id , name', [name] )
    return res.status(201).json({
        success : true ,
        message : 'User was created Succesfully!' ,
        data : result.rows[0]
     })


})

app.post('/courses/:id/reviews' , async (req , res , next) => {
    try {
         const { user_id , rating , body } = req.body  
         const { id } = req.params

    if (!user_id || !id || !rating || !req.body) {
        return res.status(400).json({
            success : false ,
            message : 'Insert id , user_id & rating properly'
        })
    }
    if(rating > 5 || rating < 1){
        return res.status(400).json({
            success : false ,
            message : 'Rating could only be between 1 - 5'
        })
    }

    const result = await pool.query('INSERT INTO reviews(user_id , course_id , rating, body) VALUES ($1 , $2 , $3 , $4) RETURNING id, user_id , course_id , rating, body' , [user_id , id , rating , body])
    return res.status(201).json({
        success : true ,
        message : 'Review added succesfully',
        data : result.rows[0]
    })

    }catch(err){
        if (err.code === '23505') { // Postgresql gives you err.code for duplicate key violations of  unique constraint 
    return res.status(409).json({ success: false, message: 'You already reviewed this course' });
    }
        next(err)
    }
   
})

app.get('/courses' , async (req , res , next) => {
    try{
            const result = await pool.query('SELECT c.title AS course_name ,    ROUND(AVG(r.rating) ,2) AS average_rating FROM courses c LEFT JOIN reviews r ON c.id = r.course_id GROUP BY c.title ,c.id  ORDER BY AVG(r.rating) DESC NULLS LAST')
            // Postgres's default is: NULLS FIRST for DESC, NULLS LAST for ASC unlike my assumption so to fix Null being in the top we inserted 'NULLS LAST' to make NULL values to be in the bottom for DESC
            return res.json({
                success : true ,
                data : result.rows
            })


    }catch(err){
        next(err)
    }


})

app.post('/courses/reviews/bulk' ,  async (req , res , next) => {

    // const client = await pool.connect() I'm changing this code structure cause there will be an error mismatch down in the catch , for example if there is a postgres error and pool.connect fails then the catch block tries to rollback but their is no open client to rollback so to fix that we are gonna check if we have client , if so we ll rollback if not we will just the error to the errorHandler
    let client
    try{
        const { reviews } = req.body
        if(!Array.isArray(reviews)) {
             return res.status(400).json({
                    success : false ,
                    message : 'Insert an array of reviews'
                })
        }
        client = await pool.connect()
        await client.query('BEGIN')
        let arrayOfReviews = []

        for (const review of reviews) {
            const { user_id , course_id , rating , body } = review

            if (!user_id || !course_id || !rating) {
                await client.query('ROLLBACK')
                return res.status(400).json({
                    success : false ,
                    message : 'Insert id , course_id ,user_id & rating properly'
                })
            }
            if(rating > 5 || rating < 1){
                await client.query('ROLLBACK')
                return res.status(400).json({
                    success : false ,
                    message : 'Rating could only be between 1 - 5'
                })
            }

            arrayOfReviews.push((await client.query('INSERT INTO reviews(user_id , course_id , rating, body) VALUES ($1 , $2 , $3 , $4) RETURNING id, user_id , course_id , rating, body' , [user_id , course_id , rating , body])).rows[0])


        }
        
        await client.query('COMMIT')
            

        return res.status(201).json({
        success : true ,
        message : 'Reviews added succesfully',
        data : arrayOfReviews
        })


    }catch(err){

       if(client) await client.query('ROLLBACK')
       if (err.code === '23505')  return res.status(409).json({ success: false, message: 'You already reviewed this course' })
       next(err)
    }
    finally{
       if(client) client.release()
    }
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Connected to ${PORT}`)
});


app.use(errorHandler)