import Product from "../models/Product";
import VariantColor from "../models/Variant_Color";
import Variant_Size from "../models/Variant_Size";
import Categories from "../models/Categories";
import ProductCategories from "../models/ProductCategories";



export async function getProducts(req, res){

    try{

        const exactProduct= await getExactProduct(req.params.codebar);
        const relatedProducts= await getProductsRelated(exactProduct.dataValues);  
        res.json({ "product": exactProduct, "related": relatedProducts})

    }catch (error){
        console.log(error)
        res.status(500).json({ "error": error})

    }

}


async function getExactProduct(code){
    const size_exact = await Variant_Size.findOne({
        where: {
            codebar: code
        }
    });
    //Se supone que esto debe tener un variantColorId, entonces buscamos todos los sizes que tengan ese color
    const all_sizes= await Variant_Size.findAll({ //Esta va a ser la lista de todos los sizes que nos interesan
        where: {
            variant_color_id: size_exact.variant_color_id
        }
    })
    //Luego debe seguir la lista de todos los colores que necesitamos 
    const color_exact= await VariantColor.findOne({
        where: {
            id: size_exact.variant_color_id
        }
    })
    const all_colors= await VariantColor.findAll({
        where: {
            productId: color_exact.dataValues.productId
        }
    })
    const product= await Product.findOne({
        where: {
            id: color_exact.dataValues.productId
        }
    })

    product.dataValues.colors= all_colors
    product.dataValues.sizes= all_sizes
    return product;
}

async function getProductsRelated(obj){

    const preproductCategories= await ProductCategories.findOne({
        where: {
            productId: obj.id
        }
    })
    const productCategories = await ProductCategories.findAll({
        where: {
            categoryId: preproductCategories.dataValues.categoryId
        }
    })
    const list_of_id= productCategories.map(function(product){ return product.dataValues.productId });
    console.log(list_of_id)

    let queryReturn = {}

    for(let i=0; i<list_of_id.length; i++){
        queryReturn[i]= await getSubData(list_of_id[i])
    }
    return queryReturn

}
//La idea de esta funcion es dado un producto conseguir sus datos
async function getSubData(productId){
    const product= await Product.findOne({
        where: {
            id: productId
        }
    })
    const colors= await VariantColor.findAll({
        where: {productId: product.dataValues.id}
    })
    const list_of_id= colors.map(function(obj){ return obj.dataValues.id })
    const sizes= await Variant_Size.findAll({
        where: {
            variant_color_id: list_of_id
        }
    })
    product.dataValues.colors= colors;
    product.dataValues.sizes= sizes;

    return product;
}