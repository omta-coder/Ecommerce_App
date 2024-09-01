import 'dotenv/config'
import express from "express";
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import cors from "cors";

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin:'http://localhost:5173/',
    methods:['GET','POST','DELETE','PUT'],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
    ],
    credentials:true
}))
app.use(cookieParser())
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
