import express from 'express';

import * as productos from '../productos.json' assert { type: "json" };

const router = express.Router();

let parsedProducts = productos.default

let productList = parsedProducts

router.get('/', (req,res) => {
    console.log(productos.default)

    res.render('home', {
        
        productList
    })
})

router.get('/real-time-products', (req,res) => {

    res.render('realTimeProducts')

});


export default router;