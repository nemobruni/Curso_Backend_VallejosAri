//este archivo es el servidor
//si tiene "app.listen" es un servidor 



//importamos a ProductManager porque es la clase que maneja a los productos
//es quien administra a los productos, es como que controla lo que hacen los productos
// (*
import { ProductManager } from './desafio2.js'

//importo express para poder hacer un servidor en js
import express, { request, response } from 'express';

//declaro una variable const app para usar express en todo el archivo
const app = express();

//utilizo express json para que el servidor entienda json
app.use(express.json());

//ahora vamos a hacer una instancia de clase
//productManagerInstance es una variables
//que guarda el resultado del molde,la nueva galletita
let productManagerInstance = new ProductManager;

//agregamos app.listen
app.listen(8888, (request,response) => {
    console.log("probando puerto 8888")

    //response.send("hola, soy un servidor escuchando en el puerto 8080")
})



//crear una ruta nueva
app.get('/products', (request,response) => {

// *)


    console.log("hola, este es para verificar que funciona el limit")
    console.log(request.query) // console.log esta llamando a todos los querys de la ruta //muestra los parametros que le mande por query params
    //es decir, solo muestra limit 3

    let limite = request.query.limit;


    //creamos otra variable que guarde a la  galletita de arriba+funcion get products
    let getProductsResponse = productManagerInstance.getProducts()
    console.log("ejecutando ruta")
    let arrayCortado = getProductsResponse.slice(0,limite); 
    //slice sirve para cortar el array, 0 es donde comienza(se incluye en el array nuevo)
    //y en este caso, limite o el 2do parametro es donde termina(no se incluye en el array nuevo);

    


    //en rsponse.json() guardamos entre parentesis a la variable que tiene el 
    //resultado de pMI + getProducts
   if (limite){
    //aca estamos agregando una conicion donde si limite es verdadero o si existe
    //devuelve el array cortado
    //sino, devuelve getProductsResponse
    response.json(arrayCortado);
   }else{
    response.json(getProductsResponse)
   }

})

//creando otra ruta llamada pdi
//solo va 2 puntos aca en la ruta, asi la ruta sabe que debe recibir un param
app.get('/products/:pid', (request, response) => {
    

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

//verificar que en package.json esta ejecutando el archivo correcto
//reiniciar con npm start en la terminal
//probar en insomnio

//todo lo que tenga * son los pasos que se hicieron antes, * = 1, ** = 2, etc