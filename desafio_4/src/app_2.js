//este archivo es el servidor
//si tiene "app.listen" es un servidor 


//importamos a ProductManager porque es la clase que maneja a los productos
//es quien administra a los productos, es como que controla lo que hacen los productos
// (*
import { ProductManager } from './services/ProductManagerService.js'

//aca importo el productsRouter
import productsRouter from './routes/products.router.js';

//importando cartsRouter
import cartsRouter from './routes/carts.router.js';

//importo express para poder hacer un servidor en js
import express, { request, response } from 'express';

//declaro una variable const app para usar express en todo el archivo
const app = express();

//utilizo express json para que el servidor entienda json
//esto es un middleware que viene incluido dentro de express
//
//MIDDLEWARE - es algo que intercepta a todas las peticiones del servidor
//MIDDLEWARE - es como un guarda espaldas ue vigila quien puede entrar y quien no

app.use(express.json());

//aca conecto mi servidor express con el router
app.use("/api/products", productsRouter)

//conectando cartsRouter con el servidor
app.use("/api/carts",cartsRouter);

//ahora vamos a hacer una instancia de clase
//productManagerInstance es una variables
//que guarda el resultado del molde,la nueva galletita
let productManagerInstance = new ProductManager;

//agregamos app.listen
app.listen(8888, (request,response) => {
    console.log("probando puerto 8888")

    //response.send("hola, soy un servidor escuchando en el puerto 8080")
})





