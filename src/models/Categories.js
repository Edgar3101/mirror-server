import {Sequelize, DataTypes} from "sequelize";
import sequelize from "../db/connection.js";
import Product from "./Product";

const Categories=  sequelize.define('categories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


export default Categories;