import {Sequelize, DataTypes} from "sequelize";
import sequelize from "../db/connection.js"
import Product from "./Product.js";

const VariantColor = sequelize.define('variant_color', { 
    color: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
});
Product.hasMany(VariantColor);
VariantColor.belongsTo(Product, {foreignKey: "productId"})

export default VariantColor;