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

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

var fileUpload = require('express-fileupload');

var app = (0, _express["default"])();
/* Configuracion necesaria para socketIO */

app.use(fileUpload()); // Static Files

app.use((0, _cors["default"])({
  origin: 'http://localhost:3000'
}));
app.use('/uploads', _express["default"]["static"](__dirname + '/public'));
app.use('/media', _express["default"]["static"](__dirname + '/public'));
app.use('/assets', _express["default"]["static"](__dirname + '/assets'));
app.use("/", _productRouter["default"]);
app.use("/api", _api["default"]);
app.engine('handlebars', (0, _expressHandlebars.engine)());
app.set('view engine', 'handlebars');
app.set('views', _path["default"].join(__dirname, '/views'));
app.use((0, _helmet["default"])());
var _default = app;
exports["default"] = _default;