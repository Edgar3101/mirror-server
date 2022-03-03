import {Router} from "express";
const router = Router();

import {GetProducts, getCountofProduct, getRandomProducts,  getVariants ,getVariantOfProduct, getExactProduct,
 getProductByCodeBar} from "../controllers/apiProducts.js"


router.get("/", GetProducts );
router.get("/variants/", getVariants);
router.get("/count", getCountofProduct);
router.get("/random/:id", getRandomProducts);
router.get("/variant/:id", getVariantOfProduct);
router.get("/:id", getExactProduct);
router.get("/code/:code", getProductByCodeBar)





export default router;