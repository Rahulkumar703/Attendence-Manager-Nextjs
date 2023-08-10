import mongoose from "mongoose"

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connected ==> ");

    } catch (error) {
        console.log("DB not Connected ==> ", error.message);
    }

}

export default connect;