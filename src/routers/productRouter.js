import {Router} from "express";
const router = Router();
import {HomePage,  createProducts, CreateVariant, DeleteProduct} from "../controllers/getProducts.js"


router.get("/", HomePage);
router.post("/", createProducts);
router.post("/add-variant/", CreateVariant);
router.post("/delete-product/", DeleteProduct)





export default router;