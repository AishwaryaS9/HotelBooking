import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('Database Connected'));
        await mongoose.connect(`${process.env.MONGO_URI}`)
        // await mongoose.connect(`mongodb+srv://aishwaryas0908:aish*3927@mydbdata.19qlr.mongodb.net/wanderNest?retryWrites=true&w=majority`)

    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;
