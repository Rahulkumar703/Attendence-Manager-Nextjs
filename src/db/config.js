import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

export default async function connect() {

    // const URI = process.env.MONGODB_URI || "mongodb+srv://rahulkumar703:Rahul%40Attendence-Manager@attendencemanager.5do3mlw.mongodb.net/Attendence_Manager_Website";
    const URI = process.env.MONGODB_URI;


    try {
        // Connect to the MongoDB database
        await mongoose.connect(
            URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }

} 