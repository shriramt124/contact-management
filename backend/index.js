import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import express from "express"
import dbConnect from "./utils/dbConnect.js";
import router from "./routes/route.js";
const app = express();



app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],

}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);




const port = 3000 || process.env.PORT
app.listen(port, async () => {
    await dbConnect()
        .then(() => {
            console.log(`Server is running on port ${port}`);
        })
        .catch((err) => {
            throw new Error(err);
        })
})