import {Router} from "express";
const router = Router();
import {getProducts, createProducts} from "../controllers/getProducts.js"


router.get("/", getProducts );
router.post("/", createProducts);





export default router;