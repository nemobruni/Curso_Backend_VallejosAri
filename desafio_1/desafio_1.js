/* TAREA___________________________________________________ */
class ProductManager {
    constructor() {
      this.products = [];
      this.idCounter = 0;
    }
    addProduct = (newProduct) => {
      console.log("Hola, agregando el producto " + newProduct.title);
      // Agregando id
  
      let productWithId = {
          ...newProduct, 
          id: this.idCounter
      }
  
      this.idCounter++;
  
  
      //Validacion de campos obligatorios
      let poseeCamposObligatorios = validateObject(newProduct);
  
      if (poseeCamposObligatorios == false) {
        throw new Error("El producto no posee todos los campos obligatorios");
      }
  
      //Validación de propiedad code
      let sameCodeFound = this.products.find(
        (element) => element.code === newProduct.code
      );
      if (sameCodeFound !== undefined) {
        console.log("Un producto con este codigo ya existe");
        return "Un producto con este codigo ya existe";
      } else {
        this.products.push(productWithId);
      }
    };
    getProducts = () => {
      console.log("hola, aca esta la lista completa de productos:");
      return this.products;
    };
    getProductById = (id) => {
      console.log("Hola, este es el 1mer producto que encontre con el id: " + id);
      let result = "";
      let foundProduct = this.products.find((product) => product.id === id);
  
      if (foundProduct !== undefined) {
        return foundProduct;
      } else {
        return "Error, not found";
      }
    };
  
    validateObject(object) {
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
  }
  
  let instanciaDos = new ProductManager();
  
  instanciaDos.addProduct({
    title: "Arroz",
    description: "largo fino",
    price: 400,
    thumbnail: "sin imagen",
    code: 1234,
    stock:20
  });
  
  instanciaDos.addProduct({
    title: "Fideos",
    description: "tirabuzon",
    price: 500,
    thumbnail: "sin imagen",
    code: 12345,
    stock: 10
  });
  
  instanciaDos.addProduct({
      title: "Lentejas",
      description: "para guisos y ensaladas",
      price: 300,
      thumbnail: "sin imagen",
      code: 123456,
      stock: 15
    });
  
  // console.log(instanciaDos.products);
  
  console.log(instanciaDos.getProducts());
  
  console.log(instanciaDos.getProductById(1));
  
