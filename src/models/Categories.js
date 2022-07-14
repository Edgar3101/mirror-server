import DataTypes from "sequelize";
import sequelize from "../db/connection.js";

const Categories=  sequelize.define('categories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


export default Categories;