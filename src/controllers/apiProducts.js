import Product from "../models/Product";


export async function GetProducts(req, res){

    const query= await Product.findAll();
    res.json({query});
}