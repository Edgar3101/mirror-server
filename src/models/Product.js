import {Sequelize, DataTypes} from "sequelize";
import sequelize from "../db/connection.js"


const Product = sequelize.define('product', { 
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price : {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    createdAt: { 
        type: DataTypes.DATE, defaultValue: DataTypes.NOW 
    },
    //Se supone que vamos a averiguar sipodemos tener una URL para la imagen
    image : {
        type: DataTypes.STRING, 
        allowNull: false
    }
});

export default Product;
