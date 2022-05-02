import {Router} from "express";
const router = Router();
import {getsizes,checkifexistproduct,checkifexistcolor,checkifexistsize, DeleteExcelProducts, HomePage, DownloadExcel, createProducts,  CreateVariantSize, CreateVariantColor, DeleteProduct,DeleteColor,DeleteSize, formPage,  ReadAyndExcel} from "../controllers/getProducts.js"

router.get("/api/checkprod/",checkifexistproduct);
router.get("/api/checkcolor/",checkifexistcolor);
router.get("/api/checksize/",checkifexistsize);
router.get("/api/getsizes/",getsizes);
router.get("/", HomePage);
router.post("/", createProducts);
router.post("/add-variant/color/", CreateVariantColor);
router.post("/add-variant/size/", CreateVariantSize);
router.post("/delete-product/", DeleteProduct);
router.post("/delete-color/", DeleteColor);
router.post("/delete-size/", DeleteSize)
//Apartir de aqui colocaremos todo lo relacionado a los excel
router.get("/form/", formPage);
router.post("/formexcel/", ReadAyndExcel)
router.get("/download-excel/", DownloadExcel)
router.post("/delete-excel/", DeleteExcelProducts)





export default router;