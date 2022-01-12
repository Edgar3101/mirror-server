import Sequelize from "sequelize";

const sequelize = new Sequelize('mirror', 'juan', '1234', {
    host: 'localhost',
    dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });

  export default sequelize;
