 /* const { Router } = require('express');
const fs = require("fs")
// Importo products
const CartsManager = require("../dao/CartsManager.js");
const ProductsManager = require('../dao/ProductsManager.js');

const cartsRouter = Router()

cartsRouter.post('/', async (req, res) => { // Método para generar un carrito nuevo
    try {
        let newCart = await CartsManager.create();
        res.status(201).json({ message: 'Carrito creado correctamente', cart: newCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Error: 'Error inesperado en el servidor. Por favor intente más tarde',
            detalle: `${error.message}`
        });
    }
});


cartsRouter.get('/:cid', async (req, res) => { // Método para mostrar un carrito de id específico
    try {
        let { cid } = req.params;
        cid = Number(cid);

        if (isNaN(cid)) {
            return res.status(400).json({ error: 'El ID del carrito debe ser numérico' });
        }

        let cart = await CartsManager.getCartById(cid);
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Error: 'Error inesperado en el servidor. Por favor intente más tarde',
            detalle: error.message
        });
    }
})

cartsRouter.post('/:cid/product/:pid', async (req, res) => { // Agrega un producto a un carrito ya existente
    let { cid, pid } = req.params
    cid = Number(cid)
    pid = Number(pid)

    if (isNaN(cid) || isNaN(pid)) {
        res.setHeader('Content-Type', 'application/json')
        res.status(400).json({
            error: `Los id de carts y products deben ser numericos`
        });
    }
    try {
        let carts = await CartsManager.getCarts()
        let cart = carts.find(c => c.id === cid)
        if (!cart) {
            res.setHeader('Content-Type', 'application/json')
            res.status(400).json({
                error: `No existe carrito con id ${cid}`
            });
        }
        let products = await req.productsManager.getProducts()
        let existe = products.find(p => p.id === pid)
        if (!existe) {
            res.setHeader('Content-Type', 'application/json')
            res.status(400).json({
                error: `No existe producto con id ${pid}`
            });
        }

        let cartProduct = cart.products.find(p => p.id === pid);

        if (cartProduct) {
            cartProduct.quantity += 1;
        } else {
            cart.products.push({ id: pid, quantity: 1 });
        }

        await fs.promises.writeFile(CartsManager.path, JSON.stringify(carts, null, 5));

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

})


module.exports = cartsRouter;

*/