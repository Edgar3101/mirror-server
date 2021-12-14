import express from "express";
import routerProduct from "./routers/productRouter"
const app= express();


app.use("/", routerProduct);


export default app;