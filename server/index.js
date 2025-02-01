import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import crud from "./routes/crud.js"
import cors from "cors"


env.config();

const app = express();
const port = 5000;


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.get("/", (req, res)=>{
    res.send("Welcome to refresh with Mongo-DB")
});

app.use("/crud", crud)


mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Connected to MongoDb!");
    app.listen(port, ()=>{
        console.log(`Server is running from port: ${port}`)
    });
})
.catch((error)=>{
    console.log("MongoDb connection failed!", error)
})
