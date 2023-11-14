import fs from "fs";
/* TAREA___________________________________________________ 
  - addCart (hecho)
  - getCarts (hecho)
  - getCartById(en proceso);
  - updateCart()
  - deleteCart()


*/

export class CartManager {
  //un constructor es una funcion que contiene variables
  //que son utiles para una clase
  constructor() {
    //este es el contador - quedo eliminado
    
    //esta es la ruta
    this.path = "./";
  }

  //cambiando nombre a los metodos necesarios
  addCart = async (newCart) => {
    //crear array vacio para la nueva lista de carts
    //crear otra variable que se llame id inicial
    let newCartList = [];

    // Agregando id
    let cartWithId = {
      ...newCart,
      id: 0,
    };
    

    

    //Validacion de campos obligatorios
    //dejar campos obli9gatorios para que valide si trajo
    //un carto(id) y una cantidad
    let poseeCamposObligatorios = this.validateObject(newCart);

    if (poseeCamposObligatorios == false) {
      return {
        error: true,
        message: "El carto no posee todos los campos obligatorios",
      };
    }
    //Validación de propiedad code - quedo eliminada
    //se chequea si hay una lista previa de carritos

    if (fs.existsSync(`${this.path}carts.json`)) {
      let esteArchivoExiste = await fs.promises.readFile(
        `${this.path}carts.json`,
        "utf-8"
      );

      let currentCartList = JSON.parse(esteArchivoExiste);

      console.log(currentCartList)

      //***llamo al array currentCartList
      //de ese array, llamo al ultimo elemento de currentCartList con ayuda de length y le resto 1
      //sabiendo que tengo el ultimo elemtno del array currentCartList llamo a su id con .id
      //le sumo uno
      cartWithId.id = currentCartList[currentCartList.length - 1].id + 1;

      // el cartWithId es agregado al array de cartos
      currentCartList.push(cartWithId);
      // convierte la lista de cartos a json
      let stringifiedArray = JSON.stringify(currentCartList);
      //
      await fs.promises.writeFile(`${this.path}carts.json`, stringifiedArray);

      return { error: false, message: "cart agregado a la lista existamente" };
    }

    // el cartWithId es agregado al array de cartos
    newCartList.push(cartWithId);
    // convierte la lista de cartos a json
    let stringifiedArray = JSON.stringify(newCartList);
    //
    await fs.promises.writeFile(`${this.path}carts.json`, stringifiedArray);

    return { error: false, message: "cart creado exitosamente" };
  };


  addProductToCart = async (cartId, productId, product) => {


    let currentCart = await this.getCartById(cartId)

    let foundProduct = currentCart.products.findIndex((element) => element.product === productId)

    if(foundProduct >= 0){
      currentCart.products[foundProduct].quantity = currentCart.products[foundProduct].quantity + product.quantity


    }else{
      currentCart.products.push(product)
    }

    let currentCartList = await this.getCarts()

    let currentCartIndex = currentCartList.findIndex((element) => element.id === cartId)

    currentCartList[currentCartIndex] = currentCart;
    
    let stringifiedArray = JSON.stringify(currentCartList);
    //
    fs.writeFileSync(`${this.path}carts.json`, stringifiedArray);

    return { error: false, message: "producto agregado exitosamente" };



  }


  getCarts = async() => {
    console.log("hola, aqui esta lo que solicitaste:");

    if (fs.existsSync(`${this.path}carts.json`)) {
      let esteArchivoExiste = await fs.promises.readFile(
        `${this.path}carts.json`,
        "utf-8"
      );

      let pasandoDeJSONaJS = JSON.parse(esteArchivoExiste);
      return pasandoDeJSONaJS;
    }
    return "este archivo no existe";
  };

  getCartById = async (id) => {
    console.log("Hola, este es el 1mer cart que encontre con el id: " + id);

    let guardandoAquiLaListaDeCarts = await this.getCarts();

    let foundCart = guardandoAquiLaListaDeCarts.find((cart) => cart.id === id);

    if (foundCart !== undefined) {
      return foundCart;
    } else {
      return "Error, not found";
    }
  };

  validateObject(object) {
    //NOTA: AGREGAR FUNCION PARA QUE DEVUELVA QUE PROPIEDAD FALTA.
    if (object.hasOwnProperty("products")) {
      return true;
    } else {
      return false;
    }
  }

  updateCart = (objetoNuevo) => {
    //creando una variable indefinida
    let pasandoDeJSONaJS;

    //agregando id al objeto nuevo
    // llamamos al id del carto nuevo y ponerle como valor el id que esta pasando por parametro
    //para que asi sea conservado y no desaparezca
    //
    //creando una condicion donde se verifica si el objeto existe
    if (fs.existsSync(`${this.path}cartos.json`)) {
      //creando variable donde tenga como contenido el metodo para poder leer el archivo json
      let esteArchivoExiste = fs.readFileSync(
        `${this.path}cartos.json`,
        "utf-8"
      );

      //llamamos a la variable indefinida y ahora le agregamos contenido: vamos a pasar json a javascript,
      //llamando en entre parentesis al archivo correspondiente
      pasandoDeJSONaJS = JSON.parse(esteArchivoExiste);
    }

    //aca llamamos con console.log a la variable "pasandoDeJSONaJS" para saber si funciona como esperamos

    //ACA SE REPITEN LOS PASOS CREADOS, ESTAMOS EN LA PARTE DOS O EL PASO DOS
    // Busco el indice(posicion dentro del array) del objeto que tiene el id ingresado usando findIndex
    let indiceDeObjetoReemplazable = pasandoDeJSONaJS.findIndex(
      (element) => element.id === objetoNuevo.id
    );

    if (indiceDeObjetoReemplazable === -1) {
      return {
        error: true,
        message: "el id de este elemento no existe",
      };
    }

    //PASO 4
    // Referenciamos al array de objetos y al indice que encontramos y asignamos el objeto nuevo.
    pasandoDeJSONaJS[indiceDeObjetoReemplazable] = objetoNuevo;

    //creando variable que tiene como contenido pasando un objeto a json
    let stringifiedArray = JSON.stringify(pasandoDeJSONaJS);

    //escribiendo en el archivo
    // fs.write....recibe 2 parametros, 1- la ruta del archivo donde tiene que escribir
    //2- el objeto nuevo que tiene que escribir
    fs.writeFileSync(`${this.path}cartos.json`, stringifiedArray);

    //PASO 5
    return {
      error: true,
      message: "Carto actualizado exitosamente",
    };
  };
  deleteCart = (id) => {
    let cartList = this.getCarts();

    let indiceEncontrado = cartList.findIndex(
      (element) => element.id === Number(id)
    );

    if (indiceEncontrado < 0) {
      return {
        error: true,
        message: "error, id no encontrado",
      };
    }

    cartList.splice(indiceEncontrado, 1);

    let listaNuevaAJSON = JSON.stringify(cartList);

    fs.writeFileSync(`${this.path}cartos.json`, listaNuevaAJSON);

    return {
      error: false,
      message: "carto borrado exitosamente",
    };
  };
}


