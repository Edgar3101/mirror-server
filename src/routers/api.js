import {Router} from "express";
const router = Router();

import {GetProducts, getCountofProduct, getRandomProducts, getVariantOfProduct} from "../controllers/apiProducts.js"


router.get("/", GetProducts );
router.get("/count", getCountofProduct);
router.get("/random", getRandomProducts);
router.get("/variant/:id", getVariantOfProduct);





export default router;