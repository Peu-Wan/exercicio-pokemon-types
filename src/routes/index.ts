import Router from "express";
import { catchThemAll, catchByName, testFilterByName, testCatchByType } from "../controller";

export const router = Router();

router.get("/", catchThemAll);

router.get("/pokemon/", testFilterByName);

router.get("/pokemon/type", testCatchByType);
