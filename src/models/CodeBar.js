import {Sequelize, DataTypes} from "sequelize";
import sequelize from "../db/connection.js"
import Product from "./Product.js";

const CodeBar = sequelize.define('codebar', { 
    code: {
        type: DataTypes.TEXT, // No sabemos que tan largo pueda ser el codigo de barras
        allowNull: false
    }, 
   
   
});
Product.hasOne(CodeBar);
CodeBar.belongsTo(Product, {foreignKey: "productId"})

export default CodeBar;