
import { ProductManager } from './services/ProductManagerService.js'
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import router from './routes/views.router.js';
import * as productos from '../productos.json' assert { type: "json" };
//falta agregar home y realtime handlebars
const app = express();

//Server HTTP
const httpServer = app.listen(8888, (request,response) => {
    console.log("probando puerto 8888")
})
//servidor para sockets
const socketServer = new Server(httpServer)

//plantillas

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));
app.use('/', router);


app.use(express.json());
app.use("/api/products", productsRouter)
app.use("/api/carts",cartsRouter);
let productManagerInstance = new ProductManager;

//esto es lo que me piden agregar en el desafio
//parte 1
app.post('/', (req, res) =>{
    const {msg} = req.body;
    socketServer.emit('message', msg);
    res.send('se envio el mensaje al socket del cliente');
});

const products = [];
//PENDIENTE 1: ENTENDER ESTO, FLUJO DEL SERVER/RECEPTOR
socketServer.on('connection', (socket) => {
    console.log(`usuario conectado ${socket.id}`);

    socket.on('disconnect', ()=> console.log('usuario desconectado'));

    //de esta manera puedo crear eventos
    //el evento se llama saludosDesdeBack
    //llamo al evento desde index.js

    socket.emit('saludoDesdeBack', 'bienvenidooo')

    //respuesta del socket, recibimo el msj
    socket.on('respuestaDesdeFront', (msg)=> console.log(msg))

    //el servidor escucha al evento y guarda al producto en el array de products
    //y emite el nuevo evento con el obj insertado
    //este evento va a ser recibido en index.js
    socket.on('newProduct', (product) => {

        //productManagerInstance.addProduct(products)
        products.push(product)
        socketServer.emit('arrayProducts', products)

    })

});




