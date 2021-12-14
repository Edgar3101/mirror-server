"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var sequelize = new _sequelize["default"]('mirror', 'edgar', '3101', {
  host: 'localhost',
  dialect: 'mariadb'
  /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */

});
var _default = sequelize;
exports["default"] = _default;