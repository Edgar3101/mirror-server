import {Router} from "express";
import {getProducts, getVariant} from "../controllers/apiProducts(Refactor).js"
const router = Router();


router.get("/variant/", getVariant);
router.get("/:codebar", getProducts);







export default router;