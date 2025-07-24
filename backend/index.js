import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

const _dirname = path.resolve();

if (process.env.NODE_ENV != `production`) {
    dotenv.config({});
}

// MongoDB connection
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// CORS Permission
const corsOptions = {
    origin: `https://skillsync-ap01.onrender.com`,
    credentials: true
}
app.use(cors(corsOptions));


// Deafult Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// APIs
app.use(`/api/v1/user`, userRoute);
app.use(`/api/v1/company`, companyRoute);
app.use(`/api/v1/job`, jobRoute);
app.use(`/api/v1/application`, applicationRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get((_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});