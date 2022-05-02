import Product from "../models/Product"
import VariantSize from "../models/Variant_Size";
var xl = require('excel4node');
import VariantColor from "../models/Variant_Color";
import Categories from "../models/Categories";
import ProductCategories from "../models/ProductCategories";
const readXlsxFile = require('read-excel-file/node')

export async function checkifexistproduct(req, res) {
  try {
      const productexists = await Product.findAll({
          where: {
              title: req.query.title
          }
      });
      return res.json({"result": productexists })
  } catch (error) {
      return res.json({ "error": error })
  }
}

export async function checkifexistcolor(req, res) {
  try {
      const color = await VariantColor.findAll({
          where: {
              productId: req.query.product_id,
              color:'#'+req.query.color
          }
      });
      return res.json({"result": color })
  } catch (error) {
      return res.json({ "error": error })
  }
}
export async function checkifexistsize(req, res) {
  try {
      const size = await VariantSize.findAll({
          where: {
              size:req.query.size,
              variant_color_id:req.query.color_id
          }
      });
      return res.json({"result": size })
  } catch (error) {
      return res.json({ "error": error })
  }
}
//Esta vista se queda igual 
export async function HomePage(req, res) {
  const query = await Product.findAll();
  const color = await VariantColor.findAll();
  const sizes = await VariantSize.findAll();
  const categories = await Categories.findAll();


  res.render('panel', { "query": query, "color": color, "sizes": sizes, "categories": categories });
}
export function formPage(req, res) {
  res.render("read_excel")
}


//Esta vista es solo para crear los productos
export async function createProducts(req, res) {
  const product = await Product.create({
    title: req.body.nameproduct,
    description: req.body.description,
    price: req.body.price

  })

  var category = await Categories.findOne({
    where: {
      name: req.body.category
    }

  })
  console.log(category)
  if (!category) {
    var category = await Categories.create({
      name: req.body.category
    })

  }

  const productCategory = await ProductCategories.create({
    productId: product.dataValues.id,
    categoryId: category.dataValues.id
  })
  console.log("Se subio el producto correctamente");
  res.redirect("/")

}

//Esta vista es para crear variantes de color del producto

export async function CreateVariantColor(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  sampleFile = req.files.sampleFile;
  var isWin = process.platform === "win32";
  if (isWin) {
    uploadPath = __dirname.split("\controllers")[0] + "\public\\" + sampleFile.name
  } else {
    uploadPath = __dirname.split("/controllers")[0] + "/public/" + sampleFile.name
  }



  var path = require('path');


  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    if (!err) {
      const color = VariantColor.build({
        color: req.body.variant_color,
        image: sampleFile.name,
        productId: req.body.product_id
      })
      color.save()
      console.log("Se subio la variante correctamente");
      res.redirect("/")

    }
  })


}

export async function CreateVariantSize(req, res) {

  const size = VariantSize.build({
    size: req.body.variant_size,
    stock: req.body.stock,
    codebar: req.body.codebar,
    variant_color_id: req.body.variant_color_id


  })
  size.save()
  console.log("Se subio la variante de talla correctamente");
  res.redirect("/")

}

//Esta funcion es para borrar el producto
export async function DeleteProduct(req, res) {
  console.log(req.body)
  const product = await Product.findOne({
    where: {
      id: req.body.product_Id_delete
    }
  })
  try {

    const colors = await VariantColor.findAll({ where: { productId: product.id } });
    const list_of_color_id = colors.map(function (obj) { return obj.id });
    const sizes = await VariantSize.findAll({ where: { variant_color_id: list_of_color_id } });
    sizes.map(obj => {
      VariantSize.destroy({
        where: {
          id: obj.id
        }
      })

    })

    colors.map(obj => {
      VariantColor.destroy({
        where: {
          id: obj.id
        }
      })
    })
  } catch {
    console.log("error")
  }

  product.destroy()
  console.log("Hello World")
  res.redirect("/")

}
export async function DeleteColor(req, res) {
  console.log(req.body)
  const color = await VariantColor.findOne({
    where: {
      id:req.body.variant_color_id
    }
  })
  try {
    const sizes = await VariantSize.findAll({ where: { variant_color_id: req.body.variant_color_id } });
    sizes.map(obj => {
      VariantSize.destroy({
        where: {
          id: obj.id
        }
      })
    })
    color.destroy()
  } catch {
    console.log("error")
  }
  console.log("Hello World")
  res.redirect("/")

}
export async function DeleteSize(req, res) {
  console.log(req.body)
  const size = await VariantSize.findOne({
    where: {
      id:req.body.size_id
    }
  })
  try {
    size.destroy()
  } catch {
    console.log("error")
  }
  console.log("Hello World")
  res.redirect("/")

}
export async function getsizes(req, res) {
  try {
      const sizes = await VariantSize.findAll({
          where: {
            variant_color_id: req.query.color_id
          }
      });
      res.json({"size": sizes })
  } catch (error) {
      res.json({ "error": error })
  }
}

export async function ReadAyndExcel(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    console.log(req.files)
    return res.status(400).send('No files were uploaded.');
  }
  sampleFile = req.files.sampleFile;
  var isWin = process.platform === "win32";
  if (isWin) {
    uploadPath = __dirname.split("\controllers")[0] + "\public\\" + sampleFile.name
  } else {
    uploadPath = __dirname.split("/controllers")[0] + "/public/" + sampleFile.name
  }

  sampleFile.mv(uploadPath, async function (err) {
    if (err) return res.status(500).send(err);
    if (!err) {
      //Sabemos hasta este punto que nos mandaran un excel con los datos
      readXlsxFile(uploadPath, { sheet: 'Modelo Prueba' }).then(async function(rows){
        for (const i in rows) {
          if (i !== "0") {
            const category =  await Categories.count({ where: { name: rows[i][0] } }) > 0 ?  await Categories.findOne({ where: { name: rows[i][0] } }) :
               await Categories.create({ name: rows[i][0] });
            const product =  await Product.count({ where: { title: rows[i][1], description: rows[i][2], price: rows[i][3] } }) > 0 ?
               await Product.findOne({ where: { title: rows[i][1], description: rows[i][2], price: rows[i][3] } }) :
               await Product.create({ title: rows[i][1], description: rows[i][2], price: rows[i][3] });
            //Luego de esta parte debemos asociar cada categoria con un producto

            let product_category_exist =  await ProductCategories.count({ where: { productId: product.dataValues.id, categoryId: category.dataValues.id } }) > 0;
            if (product_category_exist === false) {
              //Si no existe alguna asociacion entonces la creamos
              await ProductCategories.create({ productId: product.dataValues.id, categoryId: category.dataValues.id })
            }
            //A partir de aqui iremos con las variantes de color
            let list_of_colors = rows[i][4].split(';');
            for (const k in list_of_colors) {
              var color_value = list_of_colors[k];
              const colorModel =  await VariantColor.count({ where: { color: color_value, productId: product.dataValues.id } }) > 0 ?
                 await VariantColor.findOne({ where: { color: color_value, productId: product.dataValues.id } }) :
                await VariantColor.create({ color: color_value, productId: product.dataValues.id, image: rows[i][5].split(";")[k] });
              //El detalle es que por cada color puede haber varias tallas
              const list_of_sizes = rows[i][6].split(";")[k]; // -> Esto devuelve un string de los elementos que nos interesan
              const list_of_stocks = rows[i][7].split(";")[k]
              const list_of_codebars = rows[i][8].split(";")[k]
              await createSizesExcel(list_of_sizes, list_of_stocks, list_of_codebars, colorModel)
            }



          }
        }



      })


      res.json({ "success": "success" })


    }
  })

}

async function createSizesExcel(list_of_sizes, list_of_stocks, list_of_codebars, colorModel) {
  list_of_sizes = list_of_sizes.split(",");
  list_of_stocks = list_of_stocks.split(",");
  list_of_codebars = list_of_codebars.split(",");
  for (const i in list_of_sizes) {
    const variant_size_exist =await VariantSize.count({ where: { size: list_of_sizes[i], stock: list_of_stocks[i], codebar: list_of_codebars[i], variant_color_id: colorModel.dataValues.id } }) > 0;
    if (variant_size_exist === false) {
      await VariantSize.create({ size: list_of_sizes[i], stock: list_of_stocks[i], codebar: list_of_codebars[i], variant_color_id: colorModel.dataValues.id })
    }
  }

}

export async function DownloadExcel(req, res){


  var wb= new xl.Workbook();
  var ws= wb.addWorksheet('Sheet 1');

  ws.cell(1,1).string("Productos")
  ws.cell(1,2).string("Precio")
  ws.cell(1,3).string("ID")

  //Luego debemos buscar los productos en la base de datos y escribirlo en el archivo excel
  const product= await Product.findAll();
  var counter= 2;
  product.map(obj => {
    ws.cell(counter, 1).string(obj.dataValues.title);
    ws.cell(counter, 2).number(obj.dataValues.price);
    ws.cell(counter, 3).number(obj.dataValues.id)
    counter++;
  })

  await wb.write(__dirname + "/products.xlsx")

  deleteFile()

  res.download(`${__dirname}/products.xlsx`);
}
async function deleteFile(){
  var fs = require('fs');
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  await sleep(5000)
  await fs.unlinkSync(__dirname + "/products.xlsx")
}