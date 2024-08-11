const {Router} = require('express');
// Importo products
const CartsManager = require("../dao/CartsManager.js")

const cartsRouter= Router() // RECORDAR PONER ELL TRY CATCH

cartsRouter.post('/', async(req, res) => {
    let { products } = req.body

    if (!products) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: `Falta agregar productos al carrito` })
    }
    try {
        let newCart = await CartsManager.create(products )
        res.setHeader('Content-Type', 'application/json')
        return res.status(201).json(newCart)
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            Error: `Error inesperado en el servidor. Por favor intente más tarde`,
            detalle: `${error.message}`
        })
    }
}) 
 // CAMPOS ID PERO NO VA EN EL BODY, SE GENERA SOLO Y PRODUCTS COMO ARRAY

cartsRouter.get('/:cid', async(req, res) => {
    res.send()
}) // RECORDAR CONDICIONES PARA FILTRAR. MIRAR CLASE 

cartsRouter.post('/:cid/product/:pid', (req, res) => {
    
}) // SEGUN EL ID, SE AGREGA UN PRODUCTO AL ARRAY PRODUCTS  YSE PONE LA CANTIDAD ED EJEMPLARES . SI ES UN PRODUCTO QUE YA EXISTIA EN EL CARRO, SE INCREMENTA


module.exports = cartsRouter;

