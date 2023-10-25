const fs = require("fs");
/* TAREA___________________________________________________ 
  - addProduct (hecho)
  - getProducts (hecho)
  - getProductById(en proceso);
  - updateProduct()
  - deleteProduct()


*/

export class ProductManager {
  constructor() {
    //esta es la lista de productos
    this.products = [];

    //este es el contador
    this.idCounter = 0;
    //esta es la ruta
    this.path = "./";
  }
  addProduct = (newProduct) => {
    console.log("Hola, agregando el producto " + newProduct.title);
    // Agregando id
    let productWithId = {
      ...newProduct,
      id: this.idCounter,
    };
    this.idCounter++;

    //Validacion de campos obligatorios
    let poseeCamposObligatorios = this.validateObject(newProduct);

    if (poseeCamposObligatorios == false) {
      throw new Error("El producto no posee todos los campos obligatorios");
    }
    //Validación de propiedad code
    let sameCodeFound = this.products.find(
      (element) => element.code === newProduct.code
    );
    console.log({
      message:
        "Este es el producto que encontre con el codigo " + newProduct.code,
      sameCodeFound,
    });

    //aca sameCodeFound guarda 2 resultados: 1- un producto, 2-undefined 
    //unefined es lo mismo que false o cero 0 o null
    // por lo que si ponemos esta variable comparacion, no pasa nada
    // el codigo ya sabe que si da false, muestra un resultado 
    // y si da true, es otro resultado

    if (sameCodeFound == undefined) {
      console.log(
        "Un producto con este codigo ya existe, producto no agregado"
      );
      return "Un producto con este codigo ya existe";
    } else {
      // el productWithId es agregado al array de productos
      this.products.push(productWithId);
      // convierte la lista de productos a json
      let stringifiedArray = JSON.stringify(this.products);
      //
      fs.writeFileSync(`${this.path}productos.json`, stringifiedArray);
    }
  };

  getProducts = () => {
    console.log("hola, aqui esta lo que solicitaste:");

    if (fs.existsSync(`${this.path}productos.json`)) {
      let esteArchivoExiste = fs.readFileSync(
        `${this.path}productos.json`,
        "utf-8"
      );

      let pasandoDeJSONaJS = JSON.parse(esteArchivoExiste);
      return pasandoDeJSONaJS;
    }
    return "este archivo no existe";
  };

  getProductById = (id) => {
    console.log("Hola, este es el 1mer producto que encontre con el id: " + id);

    let guardandoAquiLaListaDeProductos = this.getProducts();

    let foundProduct = guardandoAquiLaListaDeProductos.find(
      (product) => product.id === id
    );

    if (foundProduct !== undefined) {
      return foundProduct;
    } else {
      return "Error, not found";
    }
  };

  validateObject(object) {
    //NOTA: AGREGAR FUNCION PARA QUE DEVUELVA QUE PROPIEDAD FALTA.
    if (
      object.hasOwnProperty("title") &&
      object.hasOwnProperty("description") &&
      object.hasOwnProperty("price") &&
      object.hasOwnProperty("thumbnail") &&
      object.hasOwnProperty("code") &&
      object.hasOwnProperty("stock")
    ) {
      return true;
    } else {
      return false;
    }
  }

  updateProduct = (id, objetoNuevo) => {
    //creando una variable indefinida
    let pasandoDeJSONaJS;

    //agregando id al objeto nuevo
    // llamamos al id del producto nuevo y ponerle como valor el id que esta pasando por parametro
    //para que asi sea conservado y no desaparezca
    objetoNuevo.id = id;
    //creando una condicion donde se verifica si el objeto existe
    if (fs.existsSync(`${this.path}productos.json`)) {
      //creando variable donde tenga como contenido el metodo para poder leer el archivo json
      let esteArchivoExiste = fs.readFileSync(
        `${this.path}productos.json`,
        "utf-8"
      );

      //llamamos a la variable indefinida y ahora le agregamos contenido: vamos a pasar json a javascript,
      //llamando en entre parentesis al archivo correspondiente
      pasandoDeJSONaJS = JSON.parse(esteArchivoExiste);
    }

    //aca llamamos con console.log a la variable "pasandoDeJSONaJS" para saber si funciona como esperamos
    console.log(pasandoDeJSONaJS);

    //ACA SE REPITEN LOS PASOS CREADOS, ESTAMOS EN LA PARTE DOS O EL PASO DOS
    // Busco el indice(posicion dentro del array) del objeto que tiene el id ingresado usando findIndex
    let indiceDeObjetoReemplazable = pasandoDeJSONaJS.findIndex(
      (element) => element.id === id
    );

    //PASO 3
    console.log(indiceDeObjetoReemplazable);

    //PASO 4
    // Referenciamos al array de objetos y al indice que encontramos y asignamos el objeto nuevo.
    pasandoDeJSONaJS[indiceDeObjetoReemplazable] = objetoNuevo;

    // creando un console.log pasando el array de productos
    console.log(pasandoDeJSONaJS);

    //creando variable que tiene como contenido pasando un objeto a json
    let stringifiedArray = JSON.stringify(pasandoDeJSONaJS);

    //escribiendo en el archivo
    // fs.write....recibe 2 parametros, 1- la ruta del archivo donde tiene que escribir
    //2- el objeto nuevo que tiene que escribir
    fs.writeFileSync(`${this.path}productos.json`, stringifiedArray);

    //PASO 5
    return pasandoDeJSONaJS;
  };

  deleteProduct = (id) => {
    let productList = this.getProducts();

    let indiceEncontrado = productList.findIndex(
      (element) => element.id === id
    );

    productList.splice(indiceEncontrado, 1);

    let listaNuevaAJSON = JSON.stringify(productList);

    fs.writeFileSync(`${this.path}productos.json`, listaNuevaAJSON);

    return "producto borrado exitosamente";
  };
}

let instanciaDos = new ProductManager();

instanciaDos.deleteProduct(2);

/* let productoNuevo = {
  title: "bizcochitos de grasa",
  description: "largo fino",
  price: 400,
  thumbnail: "sin imagen",
  code: 123324,
  stock: 20,
};

instanciaDos.addProduct(productoNuevo);

instanciaDos.addProduct({
  title: "Fideos",
  description: "tirabuzon",
  price: 500,
  thumbnail: "sin imagen",
  code: 1234,
  stock: 10,
});

instanciaDos.addProduct({
  title: "Lentejas",
  description: "para guisos y ensaladas",
  price: 300,
  thumbnail: "sin imagen",
  code: 123456,
  stock: 15,
});

instanciaDos.addProduct({
  title: "Cereales",
  description: "para desayunos y meriendas",
  price: 300,
  thumbnail: "sin imagen",
  code: 1234567,
  stock: 15,
});

instanciaDos.addProduct({
  title: "Leche en polvo",
  description: "para licuados y desayunos",
  price: 300,
  thumbnail: "sin imagen",
  code: 12345678,
  stock: 15,
}); */

// console.log(instanciaDos.products);

//console.log(instanciaDos.getProducts());

//para verificar que el codigo que estoy creando funciona
//tengo que ir a la terminal y correrlo con nodejs
//comando de ejemplo: "node desafio_2.js"

// cada vez que hago un cambio, debo guardar con control s y node en la terminal


// _______________________________________________________________________________________________________________
// _______________________________________________________________________________________________________________
// _______________________________________________________________________________________________________________
// DESAFIO UNO DE BACKEND

// BASE
// 1- Realizar una clase llamada "ProductManager" que gestione un conjunto de productos
// 2- El objeto de productos debe tener las caracteristicas de titulo, descripcion, precio, thumbnail(img), codigo y stock

// METODOS A AGREGAR EN DESAFIO 1
// addProducts
// getProducts
// getProductById


// DETALLES DE METODOS

// addProducts
// debe ahgregar: 
// a- debe agregar el producto, no debe repetir el codigo del producto, todas las caracteristicas deben ser obligatorias

// getProducts
// debe agregar: 
// -devolver el array de productos


// getProductsById
// debe agregar: 
// -funcion que busque en el array el producto que coincida con el id
// -en caso de no coincidir, mostrar un mensaje de "error, not found"



//  PSEUDOCODIGO

// getProductById
//


// _______________________________________________________________________________________________________________
// _______________________________________________________________________________________________________________
// _______________________________________________________________________________________________________________
// DESAFIO DOS DE BACKEND

// REPETIR BASE
// Agregar variable this.path que inicie constructor

// METODOS A AGREGAR EN DESAFIO 2
// updateProduct
// deleteProduct

// DETALLES DE METODOS

// updateProduct
// debe agregar:
// -debe recibir el id del producto que se debe actualizar


// deleteProduct
// debe agregar:
// debe recibir un id y eliminar el producto que tenga ese id en el archivo


// _______________________________________________________________________________________________________________
// _______________________________________________________________________________________________________________
// _______________________________________________________________________________________________________________
// DESAFIO TRES DE BACKEND
// Consigna: desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos
// 
// PSEUDOCODIGO:
// Utilizar la clase ProductManager que actualmente utilizamos en las ultimas clases
// desarrollar servidor express que en el archivo app.js importe al ProductManager que actualmente tenemos
// 1- desarrollar servidor express en app.js
// 2- importar ProductManager a app.js
// 
// ASPECTOS A INCLUIR
// Agregar los siguientes endpoints:
// *ruta '/products' (debe leer el archivo de productos y devolverlo dentro de un objeto) 
//
// agregar soporte para recibir queryparam el valor ?limit= el cual recibira un limite de resultados
//
// agregar una condicion que si no se recibe
// query de limite, se devolverá todos los productos

// or else, si se recibe un limitem solo devolver el numero de productos solicitados

//*ruta '/products/:pid', debe recibir por req.params el pid (product Id)
// y devolver solo el producto solicitado, en lugar de todos los productos

//SUGERENCIAS: Tu clase lee archivos con promesas: usar async/awaiy en endpoints

//el desafio es solo para gets, usar archivo que ya tenga productos(ya lo tengo)

// ________________________________________

// crear archivo app.js
// importar express y clase ProductManager
//usar query params para recibir un limite de resultados
//agregar condicion de si NO se recibe un limite, devolver todos los productos
// de lo contrario, devolver solo los productos solicitados
//agregar ruta '/productos/:pid' con req.params, y devolver solo el producto solicitado