import sequelize from "./db/connection.js"
import app from "./app.js"
require('dotenv').config()


async function connect(){
  //Aqui colocaremos una creacion de tablas para mas adelante
  var connect = await sequelize.sync();
}


async function main(){
  const port= process.env.PORT
  await app.listen(port)
  await connect()
  console.log(`Example app listening at http://localhost:${port}`);
}
 
main()
