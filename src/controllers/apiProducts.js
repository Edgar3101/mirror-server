import sequelize from "../db/connection";
import Product from "../models/Product";
import VariantColor from "../models/Variant_Color";
import Variant_Size from "../models/Variant_Size";
import Categories from "../models/Categories";
import ProductCategories from "../models/ProductCategories";
import Op from "sequelize";

export async function GetProducts(req, res) {
    //Para no tener problemas podemos armar querys personalizados en la API

    var product = await Product.findAll();
    var variant_color = await VariantColor.findAll();
    var variant_Size = await Variant_Size.findAll();
    const categories = await Categories.findAll();
    const productCategorie = await ProductCategories.findAll();
    res.json({
        "product": product, "color": variant_color, "variant_Size": variant_Size,
        "categories": categories, "productCategorie": productCategorie
    });
}

export async function getExactProduct(req, res) {
    const query = await Product.findOne({
        where: {
            id: req.params.id
        }
    })
    //Es importante tener en cuenta que tambien debemos mandarle todo las variantes
    const variant_color = await VariantColor.findAll({
        where: {
            productId: query.dataValues.id
        }
    })
    list_of_id = variant_color.map(function (obj) {
        return obj.id
    });
    const variant_Size = await Variant_Size.findAll({
        where: {
            variant_color_id: list_of_id
        }
    })
    return json({ "product": query, "color": variant_color, "size": variant_Size });
}
export async function getCountofProduct(req, res) {
    const query = await Product.count();
    res.json({ query })
}
export async function getRandomProducts(req, res) {
    //La idea de ahora en adelante es que los productos que se obtengan se van a tener que obtener en base a la categoria
    const productcategories = await ProductCategories.findAll({
        where: {
            categoryId: req.params.id
        }
    });

    const list_of_id = await productcategories.map(function (obj) { return obj.dataValues.productId })
    const query = productcategories.length > 2 ? await Product.findAll({ where: { id: list_of_id }, order: sequelize.random(), limit: 3}) : await Product.findAll({ order: sequelize.random(), limit: 3 }) 

    console.log(query)

    const colors = await VariantColor.findAll();
    res.json({ "query": query, "colors": colors })

}

export async function getVariantOfProduct(req, res) {
    //Este modulo tiene el objetivo de entregar las variantes segun el id del producto
    const query = await VariantColor.findAll({
        where: {
            productId: req.params.id
        }

    })
    var list_of_id = query.map(function (obj) {
        return obj.id
    })
    var sizes = await Variant_Size.findAll({
        where: {
            variant_color_id: list_of_id
        }
    })
    res.json({ "query": query, "sizes": sizes })

}



export async function getProductByCodeBar(req, res) {
    //Primero debemos obtener el code_bar para buscar el producto
    try {
        const sizes = await Variant_Size.findOne({
            where: {
                codebar: req.params.code
            }
        });

        var color = await VariantColor.findOne({
            where: {
                id: sizes.variant_color_id
            }
        })
        //Una vez tengamos el codebar debemos buscar el producto
        const product = await Product.findOne({
            where: {
                id: color.productId
            }
        })
        res.json({ "product": product, "color": color, "sizes": sizes });

    } catch (e) {
        console.log(e);
        res.status(500).json({ "error": "error" });
    }
}

export async function getVariants(req, res) {
    var products = await Product.findAll();
    var colors = await VariantColor.findAll();
    var sizes = await Variant_Size.findAll();
    res.json({ "colors": colors, "sizes": sizes, "products": products });
}