import express, { json } from "express";
import { router as index } from "./routes/index";
const app = express();

app.use(json());
app.use("/", index);

export default app;
