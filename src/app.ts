import express, { json } from "express";
import { router as index } from "./routes/index";
import cors from "cors";


const app = express();

app.use(json());
app.use(cors())
app.use("/", index);


export default app;
