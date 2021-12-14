import {Router} from "express";
const router = Router();
import {getProducts} from "../controllers/getProducts.js"


router.get("/", getProducts );





export default router;