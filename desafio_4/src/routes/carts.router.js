import { CartManager } from '../services/cartManagerService.js';

//asi se declara el cuerepo de router - comienzo
import {Router} from 'express';
//aca creamos un router usando la funcion router de express
const cartsRouter =  Router()

let cartManagerInstance = new CartManager;
//declaro async porque voy a usar await en la funcion
cartsRouter.get("/:cid",async (request, response) => {

    let cartId = request.params.cid;

    let getCartIdResponse = await cartManagerInstance.getCartById(parseInt(cartId))

    console.log(getCartIdResponse)

    response.json(getCartIdResponse)


    
    
})

cartsRouter.post("/", async (request, response) => {

    //esta ruta es para añadir un carrito a traves de json
    //req.body llega desde postman y queda guardado en newCart2
    let newCart2 = request.body;
    
    let addCartResponse = await cartManagerInstance.addCart(newCart2)

    console.log(addCartResponse)

    response.json(addCartResponse)
})

cartsRouter.post("/:cid/product/:pid", async (request, response) => {

    let productId = request.params.pid

   let  cartId = request.params.cid

   let product = request.body.product

   let addProductToCartResponse = await cartManagerInstance.addProductToCart(parseInt(cartId), parseInt(productId), product)

   response.json(addProductToCartResponse);


})


export default cartsRouter;