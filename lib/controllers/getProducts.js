"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateVariantColor = CreateVariantColor;
exports.CreateVariantSize = CreateVariantSize;
exports.DeleteProduct = DeleteProduct;
exports.HomePage = HomePage;
exports.createProducts = createProducts;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Product = _interopRequireDefault(require("../models/Product"));

var _Variant_Size = _interopRequireDefault(require("../models/Variant_Size"));

var fs = _interopRequireWildcard(require("fs"));

var _Variant_Color = _interopRequireDefault(require("../models/Variant_Color"));

var path = _interopRequireWildcard(require("path"));

var _Categories = _interopRequireDefault(require("../models/Categories"));

var _ProductCategories = _interopRequireDefault(require("../models/ProductCategories"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//Esta vista se queda igual 
function HomePage(_x, _x2) {
  return _HomePage.apply(this, arguments);
} //Esta vista es solo para crear los productos


function _HomePage() {
  _HomePage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var query, color, sizes, categories;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Product["default"].findAll();

          case 2:
            query = _context.sent;
            _context.next = 5;
            return _Variant_Color["default"].findAll();

          case 5:
            color = _context.sent;
            _context.next = 8;
            return _Variant_Size["default"].findAll();

          case 8:
            sizes = _context.sent;
            _context.next = 11;
            return _Categories["default"].findAll();

          case 11:
            categories = _context.sent;
            res.render('panel', {
              "query": query,
              "color": color,
              "sizes": sizes,
              "categories": categories
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _HomePage.apply(this, arguments);
}

function createProducts(_x3, _x4) {
  return _createProducts.apply(this, arguments);
} //Esta vista es para crear variantes de color del producto


function _createProducts() {
  _createProducts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var product, category, productCategory;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Product["default"].create({
              title: req.body.nameproduct,
              description: req.body.description,
              price: req.body.price
            });

          case 2:
            product = _context2.sent;
            _context2.next = 5;
            return _Categories["default"].findOne({
              where: {
                name: req.body.category
              }
            });

          case 5:
            category = _context2.sent;
            console.log(category);

            if (category) {
              _context2.next = 11;
              break;
            }

            _context2.next = 10;
            return _Categories["default"].create({
              name: req.body.category
            });

          case 10:
            category = _context2.sent;

          case 11:
            _context2.next = 13;
            return _ProductCategories["default"].create({
              productId: product.dataValues.id,
              categoryId: category.dataValues.id
            });

          case 13:
            productCategory = _context2.sent;
            console.log("Se subio el producto correctamente");
            res.redirect("/");

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createProducts.apply(this, arguments);
}

function CreateVariantColor(_x5, _x6) {
  return _CreateVariantColor.apply(this, arguments);
}

function _CreateVariantColor() {
  _CreateVariantColor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var sampleFile, uploadPath, isWin, path;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(!req.files || Object.keys(req.files).length === 0)) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", res.status(400).send('No files were uploaded.'));

          case 2:
            sampleFile = req.files.sampleFile;
            isWin = process.platform === "win32";

            if (isWin) {
              uploadPath = __dirname.split("\controllers")[0] + "\public\\" + sampleFile.name;
            } else {
              uploadPath = __dirname.split("/controllers")[0] + "/public/" + sampleFile.name;
            }

            path = require('path');
            sampleFile.mv(uploadPath, function (err) {
              if (err) return res.status(500).send(err);

              if (!err) {
                var color = _Variant_Color["default"].build({
                  color: req.body.variant_color,
                  image: sampleFile.name,
                  productId: req.body.product_id
                });

                color.save();
                console.log("Se subio la variante correctamente");
                res.redirect("/");
              }
            });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _CreateVariantColor.apply(this, arguments);
}

function CreateVariantSize(_x7, _x8) {
  return _CreateVariantSize.apply(this, arguments);
} //Esta funcion es para borrar el producto


function _CreateVariantSize() {
  _CreateVariantSize = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var size;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            size = _Variant_Size["default"].build({
              size: req.body.variant_size,
              stock: req.body.stock,
              codebar: req.body.codebar,
              variant_color_id: req.body.variant_color_id
            });
            size.save();
            console.log("Se subio la variante de talla correctamente");
            res.redirect("/");

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _CreateVariantSize.apply(this, arguments);
}

function DeleteProduct(_x9, _x10) {
  return _DeleteProduct.apply(this, arguments);
}

function _DeleteProduct() {
  _DeleteProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var product, colors, list_of_color_id, sizes;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log(req.body);
            _context5.next = 3;
            return _Product["default"].findOne({
              where: {
                id: req.body.product_Id_delete
              }
            });

          case 3:
            product = _context5.sent;
            _context5.prev = 4;
            _context5.next = 7;
            return _Variant_Color["default"].findAll({
              where: {
                productId: product.id
              }
            });

          case 7:
            colors = _context5.sent;
            list_of_color_id = colors.map(function (obj) {
              return obj.id;
            });
            _context5.next = 11;
            return _Variant_Size["default"].findAll({
              where: {
                variant_color_id: list_of_color_id
              }
            });

          case 11:
            sizes = _context5.sent;
            sizes.map(function (obj) {
              _Variant_Size["default"].destroy({
                where: {
                  id: obj.id
                }
              });
            });
            colors.map(function (obj) {
              _Variant_Color["default"].destroy({
                where: {
                  id: obj.id
                }
              });
            });
            _context5.next = 19;
            break;

          case 16:
            _context5.prev = 16;
            _context5.t0 = _context5["catch"](4);
            console.log("error");

          case 19:
            product.destroy();
            console.log("Hello World");
            res.redirect("/");

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[4, 16]]);
  }));
  return _DeleteProduct.apply(this, arguments);
}