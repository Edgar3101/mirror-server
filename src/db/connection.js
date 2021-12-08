import Sequelize from "sequelize";

const sequelize = new Sequelize('mirror', 'edgar', '3101', {
    host: 'localhost',
    dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });

  export default sequelize;