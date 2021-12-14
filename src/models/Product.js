import {Sequelize, DataTypes} from "sequelize";
import sequelize from "../db/connection.js"


const Product = sequelize.define('product', { 
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price : {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    createdAt: { 
        type: DataTypes.DATE, defaultValue: DataTypes.NOW 
    },
    image : {
        type: DataTypes.STRING, 
        allowNull: false
    }
});

export default Product;