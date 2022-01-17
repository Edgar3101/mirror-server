import Product from "../models/Product"

export async function HomePage(req, res){
    res.render('panel');

}

export async function createProducts(req, res){
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname.split("/controllers")[0] + '/public/' + sampleFile.name;

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