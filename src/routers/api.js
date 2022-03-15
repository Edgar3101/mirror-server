import {Router} from "express";
const router = Router();

import {getProducts} from "../controllers/apiProducts(Refactor)"


router.get("/:codebar", getProducts );






export default router;