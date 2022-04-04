import Product from "../models/Product"
import VariantSize from "../models/Variant_Size";
import * as fs from 'fs';
import VariantColor from "../models/Variant_Color";
import * as path from "path";
import Categories from "../models/Categories";
import ProductCategories from "../models/ProductCategories";



//Esta vista se queda igual 
export async function HomePage(req, res) {
  const query = await Product.findAll();
  const color = await VariantColor.findAll();
  const sizes = await VariantSize.findAll();
  const categories = await Categories.findAll();
 
  
  res.render('panel', { "query": query, "color": color, "sizes": sizes, "categories": categories });
}

//Esta vista es solo para crear los productos
export async function createProducts(req, res) {
  const product = await Product.create({
    title: req.body.nameproduct,
    description: req.body.description,
    price: req.body.price

  })

  var category = await Categories.findOne({
    where: {
      name: req.body.category
    }

  })
  console.log(category)
  if (!category) {
    var category = await Categories.create({
      name: req.body.category
    })

  }

  const productCategory = await ProductCategories.create({
    productId: product.dataValues.id,
    categoryId: category.dataValues.id
  })
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

    const colors = await VariantColor.findAll({ where: { productId: product.id } });
    const list_of_color_id = colors.map(function (obj) { return obj.id });
    const sizes = await VariantSize.findAll({ where: { variant_color_id: list_of_color_id } });
    sizes.map(obj => {
      VariantSize.destroy({
        where: {
          id: obj.id
        }
      })

    })

    colors.map(obj => {
      VariantColor.destroy({
        where: {
          id: obj.id
        }
      })
    })
  } catch {
    console.log("error")
  }

  product.destroy()
  console.log("Hello World")
  res.redirect("/")

}

