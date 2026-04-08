import Router from "express";
import { catchThemAll, catchByName, testFilterByName } from "../controller";

export const router = Router();

router.get("/", catchThemAll);

router.get("/pokemon/", testFilterByName);
