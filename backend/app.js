import express from "express";
import authRouter from "./routes/v1/auth.js";
// import cors from 'cors'
// import path from 'path'
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const app = express();

// app.use("covers", express.static(path.join(__dirname, "public", "covers")));

// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/v1/auth", authRouter);

export default app;
