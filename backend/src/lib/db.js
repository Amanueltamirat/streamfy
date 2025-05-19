import mongoose from 'mongoose';

export const connectDb = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log('mongodb connected:',conn.connection.host )
    } catch (error) {
        console.log('Error in connecting to mongoDB', error);
        process.exit(1)
    }
}