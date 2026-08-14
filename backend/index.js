import express from "express";
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import projectRoutes from "./routes/projectRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import requestRoutes from "./routes/requestRoutes.js"
import companyRoutes from "./routes/companyRoutes.js"
import cors from "cors";

import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

//4707131df23554bff87838f074e00a03 ==> Token Mailtrap

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());//ALLOWS US TO PARSE INCOING REQUEST WITH JSON PAYLOADS(GET DATA JSON FROM FORM)
app.use(cookieParser());//ALLOWS TO PARSE THE INCOMING COOKIES

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/companies", companyRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port 3000")
});

//MONGODB_URI="mongodb+srv://aina:3LF0jn8alBE5vnj8@cluster0.hmyccqt.mongodb.net/portofolio?appName=my_project"