"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateVariant = CreateVariant;
exports.DeleteProduct = DeleteProduct;
exports.HomePage = HomePage;
exports.createProducts = createProducts;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Product = _interopRequireDefault(require("../models/Product"));

var _Variant = _interopRequireDefault(require("../models/Variant"));

var fs = _interopRequireWildcard(require("fs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function HomePage(_x, _x2) {
  return _HomePage.apply(this, arguments);
}

function _HomePage() {
  _HomePage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Product["default"].findAll();

          case 2:
            query = _context.sent;
            console.log(query);
            res.render('panel', {
              query: query
            });

          case 5:
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
}

function _createProducts() {
  _createProducts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var sampleFile, uploadPath, path;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(!req.files || Object.keys(req.files).length === 0)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", res.status(400).send('No files were uploaded.'));

          case 2:
            sampleFile = req.files.sampleFile;

            if (__dirname.includes("\\")) {
              uploadPath = __dirname.split("/controllers")[0] + '\\public\\' + sampleFile.name;
            } else {
              uploadPath = __dirname.split("/controllers")[0] + "/public/" + sampleFile.name;
            }

            path = require('path');
            console.log(sampleFile);
            sampleFile.mv(uploadPath, function (err) {
              if (err) return res.status(500).send(err);

              if (!err) {
                var product = _Product["default"].build({
                  title: req.body.nameproduct,
                  description: req.body.description,
                  price: req.body.price,
                  image: sampleFile.name
                });

                product.save();
                console.log("Se subio el producto correctamente");
                res.redirect("/");
              }
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createProducts.apply(this, arguments);
}

function CreateVariant(_x5, _x6) {
  return _CreateVariant.apply(this, arguments);
}

function _CreateVariant() {
  _CreateVariant = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var variant, creation;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            req.body.type === 'color' ? variant = req.body.variant_color : variant = req.body.variant_size;
            _context3.next = 3;
            return _Variant["default"].build({
              type: req.body.type,
              description: variant,
              productId: req.body.product_id
            });

          case 3:
            creation = _context3.sent;
            creation.save();
            res.redirect("/");

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _CreateVariant.apply(this, arguments);
}

function DeleteProduct(_x7, _x8) {
  return _DeleteProduct.apply(this, arguments);
}

function _DeleteProduct() {
  _DeleteProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var product, path;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(req.body);
            _context4.next = 3;
            return _Product["default"].findOne({
              where: {
                id: req.body.product_Id_delete
              }
            });

          case 3:
            product = _context4.sent;

            try {
              path = __dirname.split("/controllers")[0] + "/public/" + product.image;
              fs.unlinkSync(path);
            } catch (_unused) {
              console.log("File already created");
            }

            product.destroy();
            res.redirect("/");

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _DeleteProduct.apply(this, arguments);
}