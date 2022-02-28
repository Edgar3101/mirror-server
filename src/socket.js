const express = require("express")
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
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});
//En este casi ya tenemos casi todo 

//start our server
server.listen(8002, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
