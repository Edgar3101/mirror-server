import express from "express";
import routerProduct from "./routers/productRouter"
import routerAPI from "./routers/api"
const fileUpload = require('express-fileupload');
import { engine } from 'express-handlebars';
import path from "path";
const app= express();

app.use(fileUpload());

// Static Files



app.use('/uploads', express.static(__dirname + '/public'));


app.use("/", routerProduct);
app.use("/api", routerAPI);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views',  path.join(__dirname, '/views'));


export default app;