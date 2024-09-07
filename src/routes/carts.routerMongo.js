const { Router } = require('express');
const { isValidObjectId } = require('mongoose');

// Importo products
const CartsManagerMongo = require("../dao/CartsManagerMongo.js");
const ProductsManagerMongo = require('../dao/ProductsManagerMongo.js');

const cartsRouterMongo = Router()

const cartsManager = new CartsManagerMongo();
const productsManager = new ProductsManagerMongo();

cartsRouterMongo.post('/', async (req, res) => { // Método para generar un carrito nuevo
    try {
        let newCart = await cartsManager.createCart();
        res.status(201).json({ message: 'Carrito creado correctamente', cart: newCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Error: 'Error inesperado en el servidor. Por favor intente más tarde',
            detalle: `${error.message}`
        });
    }
});

cartsRouterMongo.get('/:cid', async (req, res) => { // Método para mostrar un carrito de id específico
    try {
        let { cid } = req.params;
        if (!isValidObjectId(cid)) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: `El id ${pid} es inválido` })
        }

        let cart = await cartsManager.getCartById(cid);
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Error: 'Error inesperado en el servidor. Por favor intente más tarde',
            detalle: error.message
        });
    }
})

cartsRouterMongo.post('/:cid/product/:pid', async (req, res) => { // Agrega un producto a un carrito ya existente
    let { cid, pid } = req.params

    if (!isValidObjectId(cid)) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: `El id ${cid} de cart es inválido` })
    }
    if (!isValidObjectId(pid)) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: `El id ${pid} de product es inválido` })
    }
    try { 
        let cart = await cartsManager.getCartById(cid);
        if (!cart) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({
                error: `No existe carrito con id ${cid}`
            });
        }

        let product = await productsManager.getProductById(pid);
        if (!product) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({
                error: `No existe producto con id ${pid}`
            });
        }

        let cartProduct = cart.products.find(p => p.id.toString() === pid);

        if (cartProduct) {
            cartProduct.quantity += 1;
        } else {
            cart.products.push({ id: pid, quantity: 1 });
        }

        await cartsManager.updateCart(cid, cart); 

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({
            message: `Producto con id ${pid} añadido al carrito ${cid}.`,
            cart: cart
        });
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({
            Error: 'Error inesperado en el servidor. Por favor intente más tarde',
            detalle: error.message
        });
    }
});

module.exports = cartsRouterMongo;

