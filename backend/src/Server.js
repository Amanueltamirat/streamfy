import express from  'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js'
import { connectDb } from './lib/db.js';

dotenv.config()

const app = express()

const PORT = process.env.PORT;


app.use('/api/auth', authRouter)

app.listen(5001, ()=>{
    console.log('Server is running on port',PORT)
    connectDb()
})