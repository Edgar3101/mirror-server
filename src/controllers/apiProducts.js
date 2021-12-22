import Product from "../models/Product";


export async function GetProducts(req, res){

    const query= await Product.findAll();
    res.json({query});
}
export async function getCountofProduct(req, res){
    const query = await Product.count();
    res.json({query})


  
}