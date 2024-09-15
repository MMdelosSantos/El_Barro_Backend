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
        if (!cart) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({ error: `No existe carrito con id ${cid}` });
        }
        let products = cart.products; 

        res.setHeader('Content-Type', 'application/json'); 
                return res.status(200).json({
            message: `Carrito con id ${cid} encontrado.`,
            cartId: cid,
            products: products
        });
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

        let cartProduct = cart.products.find(p => p.product._id.toString() === pid);

        if (cartProduct) {
            cartProduct.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cartsManager.updateCart(cid, cart);

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({
            message: `Producto con id ${pid} añadido al carrito ${cid}.`,
            cart: cart
        });
    } catch (error) {
        console.error('Error al añadir producto al carrito:', error);
        return res.status(500).json({
            Error: 'Error inesperado en el servidor. Por favor intente más tarde',
            detalle: error.message
        });
    }
});



cartsRouterMongo.delete('/:cid/products/:pid', async (req, res) => { // Método para borrar un producto de un carrito
    let { cid, pid } = req.params;

    if (!isValidObjectId(cid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `El id ${cid} de carrito es inválido` });
    }
    if (!isValidObjectId(pid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `El id ${pid} de producto es inválido` });
    }

    try {
        let cart = await cartsManager.getCartById(cid);
        if (!cart) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `No existe carrito con id ${cid}` });
        }

console.log(cart.products)
        let productIndex = cart.products.findIndex(p => p.product._id.toString() === pid);

        if (productIndex === -1) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `No existe el producto con id ${pid} en el carrito ${cid}` });
        }

        cart.products.splice(productIndex, 1);

        await cartsManager.updateCart(cid, { products: cart.products })

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({
            message: `Producto con id ${pid} eliminado del carrito ${cid}.`,
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

cartsRouterMongo.put('/:cid/products/:pid', async (req, res) => { // Actualiza la cantidad de un producto en un carrito segun lo establecido en req.body
    let { cid, pid } = req.params;
    let { quantity } = req.body;

    if (!isValidObjectId(cid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `El id ${cid} de carrito es inválido` });
    }
    if (!isValidObjectId(pid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `El id ${pid} de producto es inválido` });
    }
    if (typeof quantity !== 'number' || quantity <= 0) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: 'La cantidad debe ser un número positivo' });
    }

    try {
        let cart = await cartsManager.getCartById(cid);
        if (!cart) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `No existe carrito con id ${cid}` });
        }
        console.log(cart.products)
        let cartProduct = cart.products.find(p => p.product._id.toString() === pid);

        if (!cartProduct) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `No existe el producto con id ${pid} en el carrito ${cid}` });
        }

        cartProduct.quantity = quantity;

        await cartsManager.updateCart(cid, { products: cart.products });

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({
            message: `Cantidad del producto con id ${pid} actualizada en el carrito ${cid}.`,
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

cartsRouterMongo.put('/:cid', async (req, res) => { // Actualiza TODOS los productos del carrito
    let { cid } = req.params;
    let products  = req.body;

    if (!isValidObjectId(cid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `El id ${cid} de carrito es inválido` });
    }

    if (!Array.isArray(products)|| products.length === 0) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: 'El cuerpo de la solicitud debe contener un array de productos' });
    }

    try {
        let cart = await cartsManager.getCartById(cid);
        if (!cart) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({ error: `No existe carrito con id ${cid}` });
        }

        for (let product of products) {
            if (!product.product || typeof product.product.quantity !== 'number' || product.product.quantity < 0) {
                return res.status(400).json({ error: 'Falta incorporar un product y la una cantidad no puede ser negativa' });
            }
        }

        // Actualiza los productos del carrito
        cart.products = products;

        await cartsManager.updateCart(cid, { products: cart.products });

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({
            message: `Productos del carrito con id ${cid} actualizados.`,
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

cartsRouterMongo.delete('/:cid', async (req, res) => { // Elimina todos los productos del carrito
    let { cid } = req.params;

    if (!isValidObjectId(cid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `El id ${cid} de carrito es inválido` });
    }

    try {
        let cart = await cartsManager.getCartById(cid);
        if (!cart) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({ error: `No existe carrito con id ${cid}` });
        }

        cart.products = [];

        await cartsManager.updateCart(cid, { products: cart.products });

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({
            message: `Todos los productos han sido eliminados del carrito ${cid}.`,
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

