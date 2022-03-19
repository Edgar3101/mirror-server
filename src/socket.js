import express from "express";
import Product from "./models/Product";
import VariantColor from "./models/Variant_Color";
import Variant_Size from "./models/Variant_Size";
const http = require("http")
const WebSocket= require("ws")

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message, isBinary) {
    console.log(message.toString(), isBinary);
    wss.clients.forEach(async function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        var buffer= JSON.parse(message.toString())
        var data= await searchData(buffer)
        console.log(data)
        client.send(JSON.stringify(data));
      }
    });
  });
});
//En este casi ya tenemos casi todo 

//start our server
server.listen(8002, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

async function searchData(buffer){
  const size= await Variant_Size.findOne({
    where: {
      id: buffer.message.id
    }
  })
  const color= await VariantColor.findOne({
    where: {
      id: size.variant_color_id
    }
  })
  const product= await Product.findOne({
    where: {
      id: color.productId
    }
  })

  return { id: product.dataValues.id, title: product.dataValues.title, description: product.dataValues.description, 
    color: color.dataValues.color, size: size.dataValues.size}
}