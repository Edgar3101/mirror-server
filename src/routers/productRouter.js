import {Router} from "express";
const router = Router();
import {HomePage,  createProducts} from "../controllers/getProducts.js"


router.get("/", HomePage);
router.post("/", createProducts);





export default router;