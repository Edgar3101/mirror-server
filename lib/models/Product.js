"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _connection = _interopRequireDefault(require("../db/connection.js"));

var Product = _connection["default"].define('product', {
  title: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: _sequelize.DataTypes.DATE,
    defaultValue: _sequelize.DataTypes.NOW
  },
  image: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
});

var _default = Product;
exports["default"] = _default;