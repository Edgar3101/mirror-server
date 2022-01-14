import Sequelize from "sequelize";
require('dotenv').config()

const sequelize = new Sequelize('mirror', process.env.DB_USER , process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });

  export default sequelize;
