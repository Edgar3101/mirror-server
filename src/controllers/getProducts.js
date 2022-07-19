import Product from "../models/Product"
import VariantSize from "../models/Variant_Size";
const writeXlsxFile = require('write-excel-file/node')
import VariantColor from "../models/Variant_Color";
import Categories from "../models/Categories";
import ProductCategories from "../models/ProductCategories";
import { copyFile } from 'node:fs/promises';
import { MissingData } from "../helpers/errors";
import sequelize from "../db/connection";
const readXlsxFile = require('read-excel-file/node')

var fs = require('fs');

export async function checkifexistproduct(req, res) {
  try {
    const productexists = await Product.findAll({
      where: {
        title: req.query.title
      }
    });
    return res.json({
      "result": productexists
    })
  } catch (error) {
    return res.json({
      "error": error
    })
  }
}

export async function checkifexistcolor(req, res) {
  try {
    const color = await VariantColor.findAll({
      where: {
        productId: req.query.product_id,
        color: '#' + req.query.color
      }
    });
    return res.json({
      "result": color
    })
  } catch (error) {
    return res.json({
      "error": error
    })
  }
}
export async function checkifexistsize(req, res) {
  try {
    const size = await VariantSize.findAll({
      where: {
        size: req.query.size,
        variant_color_id: req.query.color_id
      }
    });
    return res.json({
      "result": size
    })
  } catch (error) {
    return res.json({
      "error": error
    })
  }
}
//Esta vista se queda igual 
export async function HomePage(req, res) {
  const query = await Product.findAll();
  const color = await VariantColor.findAll();
  const sizes = await VariantSize.findAll();
  const categories = await Categories.findAll();


  res.render('panel', {
    "query": query,
    "color": color,
    "sizes": sizes,
    "categories": categories
  });
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
    const colors = await VariantColor.findAll({
      where: {
        productId: product.id
      }
    });
    const list_of_color_id = colors.map(function (obj) {
      return obj.id
    });
    const sizes = await VariantSize.findAll({
      where: {
        variant_color_id: list_of_color_id
      }
    });
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
      id: req.body.variant_color_id
    }
  })
  try {
    const sizes = await VariantSize.findAll({
      where: {
        variant_color_id: req.body.variant_color_id
      }
    });
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
      id: req.body.size_id
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
    res.json({
      "size": sizes
    })
  } catch (error) {
    res.json({
      "error": error
    })
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
      try{

      
      //Sabemos hasta este punto que nos mandaran un excel con los datos
      readXlsxFile(uploadPath, {
        sheet: 'Modelo Prueba'
      }).then(async function (rows) {
        var errorList=[]
        for (const i in rows) {
          if (i !== "0") {
            try{
              //Ve la categoría, sino la crea
              await sequelize.transaction(async (t) =>{
                var promises= [];
              })
                const arrayCat = {
                  name: rows[i][0]
                }
                const whereCat = {
                  where: arrayCat
                }
                const category = await Categories.count(whereCat) > 0 ? await Categories.findOne(whereCat) : await Categories.create(arrayCat, { transaction: t });
    
                //Ve si hay un producto, sino lo crea
                const arrayProd = {
                  title: rows[i][1],
                  description: rows[i][2],
                  price: rows[i][3]
                }
                const WhereProd = {
                  where: arrayProd
                }
                const product = await Product.count(WhereProd) > 0 ? await Product.findOne(WhereProd) : await Product.create(arrayProd, { transaction: t });
                //Luego de esta parte debemos asociar cada categoria con un producto
                const arrayProdCat = {
                  productId: product.dataValues.id,
                  categoryId: category.dataValues.id
                }
                let product_category_exist = await ProductCategories.count({
                  where: arrayProdCat
                }) > 0;
    
                if (product_category_exist === false) {
                  //Si no existe alguna asociacion entonces la creamos
                  await ProductCategories.create(arrayProdCat, { transaction: t })
                }
                //A partir de aqui iremos con las variantes de color
                let colors = rows[i][4]
                let list_of_colors = colors.split(';');
    
                for (const k in list_of_colors) {
                  var color_value = list_of_colors[k];
                  const whereVarColor = {
                    where: {
                      color: color_value,
                      productId: product.dataValues.id
                    }
                  }
                  var image_url=rows[i][5].split(";")[k];
                  if(image_url === undefined || image_url === "" || image_url === null){
                    throw new MissingData( "error",{'product':rows[i][1],'color':color_value,'sizes':rows[i][6].split(";")[k],'reason':'La imagen proporcionada no es valida'});
                  }
                  var isWin = process.platform === "win32";
                  if (isWin) {
                    uploadPath = __dirname.split("\controllers")[0] + "\public\\" + image_url.substring(image_url.lastIndexOf("\\"), image_url.length)
                  } else {
                    uploadPath = __dirname.split("/controllers")[0] + "/public/" + image_url.substring(image_url.lastIndexOf("/"), image_url.length)
                  }
    
                  if (fs.existsSync(image_url)) {
                    await copyFile(image_url, uploadPath);                          
                  }else{
                    throw new MissingData("error", {'product':rows[i][1],'color':color_value,'sizes':rows[i][6].split(";")[k],'reason':'La imagen proporcionada no es valida'})
                  }
                  const colorModel = await VariantColor.count(whereVarColor) > 0 ?
                    await VariantColor.findOne(whereVarColor) :
                    await VariantColor.create({
                      color: color_value,
                      productId: product.dataValues.id,
                      image: rows[i][5].split(";")[k]
                    }, { transaction: t });
                  //El detalle es que por cada color puede haber varias tallas
                  try {
                    var list_of_sizes = rows[i][6].split(";")[k]; // -> Esto devuelve un string de los elementos que nos interesan
                    var stocks = typeof rows[i][7] === 'string' ? rows[i][7] : rows[i][7].toString();
                    var list_of_stocks = stocks == 'undefined' ? '0' : stocks.split(";")[k];
                    var codebars = rows[i][8];
                    codebars = typeof codebars === 'string' ? codebars : codebars.toString();
                    var list_of_codebars = codebars.split(";")[k]
                    if (typeof list_of_codebars === 'undefined') {
                      throw new MissingData( "error" ,{'product':rows[i][1],'color':color_value,'sizes':list_of_sizes,'reason':'No posee código de barras'})
                    }else{
                      list_of_stocks = typeof list_of_stocks === 'string' ? list_of_stocks : list_of_stocks.toString();
                      list_of_codebars = typeof list_of_codebars === 'string' ? list_of_codebars : list_of_codebars.toString();
                      list_of_sizes = list_of_sizes.split(",");
                      list_of_stocks = list_of_stocks.split(",");
                      list_of_codebars = list_of_codebars.split(",");
                      for (const i in list_of_sizes) {
                        const arrayVarSize = {
                          size: list_of_sizes[i],
                          stock: list_of_stocks[i],
                          codebar: list_of_codebars[i],
                          variant_color_id: colorModel.dataValues.id
                        }
                        const variant_size_exist = await VariantSize.count({
                          where: arrayVarSize
                        }) > 0;
                        if (variant_size_exist === false) {
                          await VariantSize.create(arrayVarSize)
                        }
                      
                      }   
                      console.log("1 product Created")  
                    }
                                 
                  } catch (error) {
                    throw new MissingData("error" ,{'product':rows[i][1],'color':color_value,'sizes':rows[i][6].split(";")[k],'reason':'La cantidad de tallas ,stocks, codigo de barras, colores NO es la misma '})
                  }
                }
            }catch(error){
              if(error instanceof MissingData){
                console.log(error.object)  
                errorList.push(error.object)         
              }
            }
            
          }
        }
        res.render('uploadedexcel', {
          "query": errorList,
        });
    
      })
    }
    catch(err){
      res.json({"error":"El nombre de la hoja de su excel debe ser 'Modelo Prueba' (sin comillas)"})
    }
      
    }
  })

}

async function createSizesExcel(list_of_sizes, list_of_stocks, list_of_codebars, colorModel) {
  list_of_stocks = typeof list_of_stocks === 'string' ? list_of_stocks : list_of_stocks.toString();
  list_of_codebars = typeof list_of_codebars === 'string' ? list_of_codebars : list_of_codebars.toString();
  list_of_sizes = list_of_sizes.split(",");
  list_of_stocks = list_of_stocks.split(",");
  list_of_codebars = list_of_codebars.split(",");
  for (const i in list_of_sizes) {
    const arrayVarSize = {
      size: list_of_sizes[i],
      stock: list_of_stocks[i],
      codebar: list_of_codebars[i],
      variant_color_id: colorModel.dataValues.id
    }
    const variant_size_exist = await VariantSize.count({
      where: arrayVarSize
    }) > 0;
    if (variant_size_exist === false) {
      await VariantSize.create(arrayVarSize)
    }
   
  }

}

export async function DownloadExcel(req, res) {

  const products = await Product.findAll();

  const results = [
    [{
      value: "Productos",
      fontWeight: 20
    }, {
      value: "Precio",
      fontWeight: 20
    }, {
      value: "ID",
      fontWeight: 20
    }]
  ]


  products.map(obj => {
    results.push([{
      type: String,
      value: obj.dataValues.title
    }, {
      type: Number,
      value: obj.dataValues.price
    }, {
      type: Number,
      value: obj.dataValues.id
    }])
  })
  var isWin = process.platform === "win32";
  if (!isWin) {
    await writeXlsxFile(results, {
      filePath: __dirname + "/products.xlsx"
    })
    deleteFile(__dirname + "/products.xlsx")

    return res.download(__dirname + "/products.xlsx");

  } else {
    await writeXlsxFile(results, {
      filePath: __dirname + "\\products.xlsx"
    })
    deleteFile(__dirname + "\\products.xlsx")

    return res.download(__dirname + "\\products.xlsx");
  }

}
async function deleteFile(path) {
  var fs = require('fs');
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  await sleep(5000) //Es mejor esperar 5 segundos por si son muchos productos
  await fs.unlinkSync(path)
}

export async function DeleteExcelProducts(req, res) {
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
    if (err) return res.send(err);
    if (!err) {
      readXlsxFile(uploadPath, {
        sheet: 'Sheet1'
      }).then(async function (rows) {

        for (const i in rows) {
          if (i !== "0") {
            console.log(rows[i])
            const product = await Product.findOne({
              where: {
                "id": rows[i][2]
              }
            })
            const colors = await VariantColor.findAll({
              where: {
                productId: product.id
              }
            });
            const list_of_color_id = colors.map(function (obj) {
              return obj.id
            });
            const sizes = await VariantSize.findAll({
              where: {
                variant_color_id: list_of_color_id
              }
            });
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
            product.destroy();

          }
        }
      })

    }

  })
  deleteFile(uploadPath);
  res.redirect("/form/")
}