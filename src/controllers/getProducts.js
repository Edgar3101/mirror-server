import Product from "../models/Product"
import Variant from "../models/Variant";
import * as fs from 'fs';
export async function HomePage(req, res){
    const query= await Product.findAll();
    console.log(query)
    
    res.render('panel', {query});
}

export async function createProducts(req, res){
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  sampleFile = req.files.sampleFile;
  if(__dirname.includes("\\")){
    uploadPath = __dirname.split("/controllers")[0] + '\\public\\' + sampleFile.name
  }else{
    uploadPath=  __dirname.split("/controllers")[0] + "/public/" + sampleFile.name
  }
   
   
  
  var path = require('path');

  console.log(sampleFile);


  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    if(!err) {
        const product= Product.build({
            title:req.body.nameproduct,
            description: req.body.description,
            price: req.body.price,
            image: sampleFile.name
      
        })
        product.save()
        console.log("Se subio el producto correctamente");
        res.redirect("/")

    }
  })
  
}

export async function CreateVariant(req, res){
  const creation = await Variant.build({
    type: req.body.type,
    description: req.body.variant,
    productId: req.body.product_id
  })
  creation.save()
  res.redirect("/")

}

export async function DeleteProduct(req, res){
  console.log(req.body)
  const product = await Product.findOne({
    where: {
      id: req.body.product_Id_delete
    }
  })
  try{
    let path = __dirname.split("/controllers")[0] + "/public/" + product.image;
  fs.unlinkSync(path);

  }catch{
    console.log("File already created")
  }
  
  product.destroy()
  res.redirect("/")

}

