// Realizar un proyecto basado en node.js que utilice el modulo express e implemente los siguientes endpoints.

// 1. Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor

// 2. Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles

const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 8080;
let contador = 0;

const server = app.listen(8080, () => {
  console.log(`Servidor inicado en el puerto ${server.address().port}`);
});

class Contenedor {
  constructor(name) {
    this.name = name;
  }

  //    Método save

  async save(obj) {
    try {
      // Leo el archivo producto.txt y guardo su contenido en content.
      const content = await fs.readFileSync(this.name, "utf-8");
      const content_parsed = JSON.parse(content);

      // Usando los corchetes en ["id"] se le indica a js que si esa propiedad no existe
      obj["id"] = content_parsed[content_parsed.length - 1].id + 1;

      if (content_parsed.length < 3) {
        fs.writeFileSync(
          "./productos.txt",
          JSON.stringify([...content_parsed, obj])
        );
      } else {
        console.log("No se agregan mas productos");
      }
    } catch (err) {
      fs.writeFileSync("./productos.txt", JSON.stringify([{ ...obj, id: 0 }]));
    }
  }

  //   Método getAll

  async getAll() {
    try {
      const content = await fs.readFileSync("./productos.txt", "utf-8");
      if (content == "[]" || content == "") {
        console.log("No hay contenido para mostrar");
      } else {
        let contentObj = JSON.parse(content);
        console.log(contentObj);
        return contentObj;
      }
    } catch (error) {
      console.log("No se pudo leer el archivo en getAllParsed().");
    }
  }
}

// Contenedor

const firstContainer = new Contenedor("./productos.txt");

const prod1 = firstContainer.save({
  title: "Escuadra",
  price: 123.45,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
});

const prod2 = firstContainer.save({
  title: "Globo Terráqueo",
  price: 345.67,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  id: null,
});

const prod3 = firstContainer.save({
  title: "Calculadora",
  price: 234.56,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  id: null,
});

app.get("/", async (req, res) => {
  res.send(
    `
      <h1>Este es mi servidor y se está ejecutando en el puerto ${
        server.address().port
      }</h1>
      `
  );
});

app.get("/productos", async (req, res) => {
  let info = await firstContainer.getAll();
  console.log("info", info);
  res.type("application/json");
  res.send(JSON.stringify(await info, null, 2));
});

app.get("/productorandom", async (req, res) => {
  let info = await firstContainer.getAll();
  let randomProduct = info[Math.floor(Math.random() * info.length)];
  res.json(randomProduct, null, 2);
});
