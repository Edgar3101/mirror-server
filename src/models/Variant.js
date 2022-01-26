import {Sequelize, DataTypes} from "sequelize";
import sequelize from "../db/connection.js"
import Product from "./Product.js";

const Variant = sequelize.define('variant', { 
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
   
});
Product.hasMany(Variant);
Variant.belongsTo(Product, {foreignKey: "productId"})

export default Variant;