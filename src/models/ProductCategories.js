import {DataTypes} from "sequelize";
import sequelize from "../db/connection.js";
import Product from "./Product";
import Categories from "./Categories.js";

const ProductCategories=  sequelize.define('ProductCategories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    
})

Product.belongsToMany(Categories, { through: ProductCategories});
Categories.belongsToMany(Product, { through: ProductCategories});

export default ProductCategories;