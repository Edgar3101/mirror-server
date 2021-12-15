import {Router} from "express";
const router = Router();

import {GetProducts} from "../controllers/apiProducts.js"


router.get("/", GetProducts );





export default router;