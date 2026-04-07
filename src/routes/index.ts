import Router from "express";
import { Response, Request } from "express";
import {catchThemAll,catchByName,testFilterByName} from "../controller";

export const router = Router();

router.get("/",catchThemAll);

router.get("/filtro/:name",testFilterByName);

