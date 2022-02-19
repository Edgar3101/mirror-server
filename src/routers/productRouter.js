import {Router} from "express";
const router = Router();
import {HomePage,  createProducts, CreateVariantSize, CreateVariantColor, DeleteProduct} from "../controllers/getProducts.js"


router.get("/", HomePage);
router.post("/", createProducts);
router.post("/add-variant/color/", CreateVariantColor);
router.post("/add-variant/size/", CreateVariantSize);
router.post("/delete-product/", DeleteProduct)





export default router;