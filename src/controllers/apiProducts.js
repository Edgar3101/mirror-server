import sequelize from "../db/connection";
import Product from "../models/Product";
import Variant from "../models/Variant";

export async function GetProducts(req, res){

    const query= await Product.findAll();
    res.json({query});
}

export async function getExactProduct(req, res){
    const query = await  Product.findOne({
        where: {
            id: req.params.id
        }
    })
    return json([query])
}
export async function getCountofProduct(req, res){
    const query = await Product.count();
    res.json({query})
}
export async function getRandomProducts(req, res){
    //Este modulo tiene el objetivo de entregar productos aleatorios al espejo
    const query= await Product.findAll({
    order: sequelize.random(),
    limit: 8
    
    })
    res.json({query})

}

export async function getVariantOfProduct(req, res){
    //Este modulo tiene el objetivo de entregar las variantes segun el id del producto
    const query= await Variant.findAll({
        where: {
            productId: req.params.id
        }
    
    })
    res.json({query})

}