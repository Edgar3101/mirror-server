"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _getProducts = require("../controllers/getProducts.js");

var router = (0, _express.Router)();
router.get("/", _getProducts.getProducts);
var _default = router;
exports["default"] = _default;