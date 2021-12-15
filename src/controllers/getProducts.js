import Product from "../models/Product"

export async function HomePage(req, res){
    res.render('home');

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
            title:"Mi producto uno",
            description: "Mi descripcion",
            price: 3,
            image: sampleFile.name
      
        })
        product.save()
        res.send("Image created");

    }
  })
  
}