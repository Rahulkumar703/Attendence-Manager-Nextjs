import mongoose, { connection } from 'mongoose'


export default async function connect() {
    mongoose.connect(
        process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
        .then(() => {
            console.log("Database Connected SuccessFully");
        })
        .catch(err => {
            console.log('Database Connection failed, please make sure mongodb is running', err);
        })

} 