"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _productRouter = _interopRequireDefault(require("./routers/productRouter"));

var _api = _interopRequireDefault(require("./routers/api"));

var _expressHandlebars = require("express-handlebars");

var _path = _interopRequireDefault(require("path"));

var fileUpload = require('express-fileupload');

var app = (0, _express["default"])();
app.use(fileUpload()); // Static Files

app.use(_express["default"]["static"]('public'));
app.use(_express["default"]["static"]('upload'));
app.use("/", _productRouter["default"]);
app.use("/api", _api["default"]);
app.engine('handlebars', (0, _expressHandlebars.engine)());
app.set('view engine', 'handlebars');
app.set('views', _path["default"].join(__dirname, '/views'));
var _default = app;
exports["default"] = _default;