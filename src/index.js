import express from "express";
import sequelize from "./db/connection.js"
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
async function connect(){
  var connect = await sequelize.sync();
  console.log("connected")
  

}


async function main(){
  const PORT= 8000;
  await app.listen(PORT)
  await connect()
  console.log(`Example app listening at http://localhost:${port}`);
}
 
main()
