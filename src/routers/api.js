import {Router} from "express";
const router = Router();

import {GetProducts, getCountofProduct} from "../controllers/apiProducts.js"


router.get("/", GetProducts );
router.get("/count", getCountofProduct);





export default router;