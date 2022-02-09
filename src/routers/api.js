import {Router} from "express";
const router = Router();

import {GetProducts, getCountofProduct, getRandomProducts, getVariantOfProduct, getExactProduct,
 getProductByCodeBar} from "../controllers/apiProducts.js"


router.get("/", GetProducts );
router.get("/count", getCountofProduct);
router.get("/random", getRandomProducts);
router.get("/variant/:id", getVariantOfProduct);
router.get("/:id", getExactProduct);
router.get("/code/:code", getProductByCodeBar)





export default router;