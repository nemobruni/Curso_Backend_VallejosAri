//es importante que yo importe productmanager porque es la cañeria mayor que conecta con la fuente de datos de products.json
import { ProductManager } from '../services/ProductManagerService.js';

//asi se declara el cuerepo de router - comienzo
import {Router} from 'express';
//aca creamos un router usando la funcion router de express
const productsRouter =  Router()
//productsRouter.get es la nueva ruta
//en productRouter se van a guardar todas las rutas que esten relacionadas

//aca estoy instalando la cañería con la fuente de agua de products.json
//en otras palabras, pero tambien lo mismo, estoy dejando aca la creacion de una nueva galletita
let productManagerInstance = new ProductManager;



productsRouter.get('/:pid', (request, response) => {
  
    //esta ruta es para pedir un producto por id

    //aca despues de request.params le agrego la ruta y solo me va a traer el valor
    //ejemplo, pido el pid y solo me mostrara el id
    console.log(request.params.pid)
    //guardando en variable pidParams a request.params.pid
    let pidParams = request.params.pid

    //creando variable para guardar resultado de getProductById
    //parseando pidParams para que se convierta en numero
    let productById = productManagerInstance.getProductById(parseInt(pidParams))
    

    //llamando con response.json a productById porque es un objeto
    response.json(productById)
})


productsRouter.get('/', (request, response) => {

    //esta ruta es para pedir una lista de todos los productos y se le puede poner un limite a n de prod que trae
    //el limite es un queryparam
    //los query params no tienen que ir incluidos en la ruta como los params normales
    //el limite es opcional
    //cuando quiera llamar al limite, debo llamarlo asi /?limit

    console.log("hola, este es para verificar que funciona el limit")
    console.log(request.query) // console.log esta llamando a todos los querys de la ruta //muestra los parametros que le mande por query params
    //es decir, solo muestra limit 3

    let limite = request.query.limit;
    //creamos otra variable que guarde a la  galletita de arriba+funcion get products
    let getProductsResponse = productManagerInstance.getProducts()
    console.log("ejecutando ruta")
  
    //slice sirve para cortar el array, 0 es donde comienza(se incluye en el array nuevo)
    //y en este caso, limite o el 2do parametro es donde termina(no se incluye en el array nuevo);

    //en rsponse.json() guardamos entre parentesis a la variable que tiene el 
    //resultado de pMI + getProducts
   if (limite){
    //aca estamos agregando una conicion donde si limite es verdadero o si existe
    //devuelve el array cortado
    //sino, devuelve getProductsResponse

    let arrayCortado = getProductsResponse.slice(0,limite); 
    
    response.json(arrayCortado);
   }else{
    response.json(getProductsResponse)
   }


})

productsRouter.post('/', (request, response) => {
  
    //esta ruta es para añadir un producto a traves de json

 let newProduct = request.body;

 let addProductResponse = productManagerInstance.addProduct(newProduct)

 console.log(addProductResponse)


response.json(addProductResponse)
})

productsRouter.put('/', (request, response) => {
  
    //esta ruta es para modificar un producto 

    let updatedProduct = request.body;

   
    let updatedProductResponse = productManagerInstance.updateProduct(updatedProduct)

    console.log(updatedProduct)

    response.json(updatedProductResponse);

})

productsRouter.delete('/:pid', (request, response) => {
  
    //esta ruta es para borrar un producto por id

    let id = request.params.pid;

    let deletedProductResponse = productManagerInstance.deleteProduct(id)

    response.json(deletedProductResponse);
})




export default productsRouter;



    productsRouter.get('/?limit', (request, response) => {

    })
    