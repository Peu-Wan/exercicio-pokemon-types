import Router from "express";
import { catchThemAll, catchByName, testFilterByName, testCatchByType, testCatchByWeakness } from "../controller";

export const router = Router();

router.get("/", catchThemAll);

router.get("/pokemon/", testFilterByName);

router.get("/pokemon/type", testCatchByType);

router.get("/pokemon/weakness", testCatchByWeakness);
