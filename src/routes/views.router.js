const { Router } = require('express');
const viewsRouter = Router();
const ProductsManagerMongo = require('../dao/ProductsManagerMongo');
const CartsManagerMongo = require('../dao/CartsManagerMongo');

const cartsManager = new CartsManagerMongo();

viewsRouter.get("/", async (req, res) => {
    const products = await req.ProductsManagerMongo.getProducts();
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render("home", { products });
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
    const products = await req.ProductsManagerMongo.getProducts();
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render("realtimeproducts", { products });
});

viewsRouter.get("/carts/:cid", async (req, res) => {
    const { cid } = req.params;  
    try {
        const cart = await cartsManager.getCartById(cid);
        if (!cart) {
            return res.status(404).send("Carrito no encontrado.");
        }
        res.setHeader('Content-Type', 'text/html');
        res.status(200).render("cartsid", { cart });
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.status(500).send("Error al obtener el carrito.");
    }
});

module.exports = viewsRouter;