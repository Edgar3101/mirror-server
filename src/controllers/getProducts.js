import Product from "../models/Product"
import VariantSize from "../models/Variant_Size";
import * as fs from 'fs';
import VariantColor from "../models/Variant_Color";
import * as path from "path";

//Esta vista se queda igual 
export async function HomePage(req, res) {
  const query = await Product.findAll();
  const color= await VariantColor.findAll();
  const sizes= await VariantSize.findAll();
  res.render('panel', { "query": query, "color": color, "sizes": sizes });
}

//Esta vista es solo para crear los productos
export async function createProducts(req, res) {
  const product = Product.build({
    title: req.body.nameproduct,
    description: req.body.description,
    price: req.body.price

  })
  product.save();
  console.log("Se subio el producto correctamente");
  res.redirect("/")

}

//Esta vista es para crear variantes de color del producto

export async function CreateVariantColor(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  sampleFile = req.files.sampleFile;
  var isWin = process.platform === "win32";
  if (isWin) {
    uploadPath = __dirname.split("\controllers")[0] + "\public\\" + sampleFile.name
  } else {
    uploadPath = __dirname.split("/controllers")[0] + "/public/" + sampleFile.name
  }



  var path = require('path');


  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    if (!err) {
      const color = VariantColor.build({
        color: req.body.variant_color,
        image: sampleFile.name,
        productId: req.body.product_id
      })
      color.save()
      console.log("Se subio la variante correctamente");
      res.redirect("/")

    }
  })


}

export async function CreateVariantSize(req, res) {

  const size = VariantSize.build({
    size: req.body.variant_size,
    stock: req.body.stock,
    codebar: req.body.codebar,
    variant_color_id: req.body.variant_color_id


  })
  size.save()
  console.log("Se subio la variante de talla correctamente");
  res.redirect("/")

}

//Esta funcion es para borrar el producto
export async function DeleteProduct(req, res) {
  console.log(req.body)
  const product = await Product.findOne({
    where: {
      id: req.body.product_Id_delete
    }
  })
  try {
   
    const colors= await VariantColor.findAll({ where: { productId: product.id}});
    const list_of_color_id= colors.map(function(ob){ return obj.id});
    VariantSize.destroy({ where: {variant_color_id: list_of_color_id}});
    colors.destroy();
  } catch {
    console.log("File already created")
  }

  product.destroy()
  res.redirect("/")

}

