import {Router} from "express";
const router = Router();
import {HomePage,  createProducts,  CreateVariantSize, CreateVariantColor, DeleteProduct, formPage} from "../controllers/getProducts.js"


router.get("/", HomePage);
router.get("/form/", formPage);
router.post("/", createProducts);
router.post("/add-variant/color/", CreateVariantColor);
router.post("/add-variant/size/", CreateVariantSize);
router.post("/delete-product/", DeleteProduct)





export default router;