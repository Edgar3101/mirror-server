import {Sequelize, DataTypes} from "sequelize";
import sequelize from "../db/connection.js"
import VariantColor from "./Variant_Color";

const VariantSize = sequelize.define('variant_Size', { 
    size: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codebar: {
        type: DataTypes.STRING,
        allowNull: false
        }
   
});
VariantColor.hasMany(VariantSize);
VariantSize.belongsTo(VariantColor, {foreignKey: "variant_color_id"})

export default VariantSize;