"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProducts = getProducts;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function getProducts(_x, _x2) {
  return _getProducts.apply(this, arguments);
}

function _getProducts() {
  _getProducts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res.render('home');

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getProducts.apply(this, arguments);
}