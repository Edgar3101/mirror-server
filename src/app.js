import express from "express";
import routerProduct from "./routers/productRouter"
import routerAPI from "./routers/api"
const fileUpload = require('express-fileupload');
import { engine } from 'express-handlebars';
import path from "path";
import helmet from "helmet";
import cors from "cors";
const app= express();

app.use(fileUpload());

// Static Files

app.use(cors())

app.use('/uploads', express.static(__dirname + '/public'));

app.use('/assets', express.static(__dirname + '/assets'));


app.use("/", routerProduct);
app.use("/api", routerAPI);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views',  path.join(__dirname, '/views'));
app.use(helmet())


export default app;