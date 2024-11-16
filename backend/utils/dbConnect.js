import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => console.log("Connected to MongoDB"))
            .catch((error) => {
                 throw new Error(error)
             })
    } catch (error) {
        console.log("Error in db Connection ",error.message)
    }

}


export default dbConnect;