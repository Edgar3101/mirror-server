import sequelize from "./db/connection.js"
import app from "./app.js"
import Variant from "./models/Variant"
require('dotenv').config()


async function connect(){
  //Aqui colocaremos una creacion de tablas para mas adelante
  var connect = await sequelize.sync();
  //await Variant.sync();
  
}


async function main(){
  const port= process.env.PORT
  await app.listen(port)
  await connect()
  console.log(`Example app listening at http://localhost:${port}`);
}
 
main()
