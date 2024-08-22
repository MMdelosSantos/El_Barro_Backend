const { Router } = require('express');
const viewsRouter = Router()
const ProductsManager = require('../dao/ProductsManager.js');
ProductsManager.path = './src/data/products.json';


viewsRouter.get("/", async (req, res) => {
    const products = await ProductsManager.getProducts();
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render("home", {products})
})

viewsRouter.get("/realtimeproducts", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render("realtimeproducts")
})

module.exports = viewsRouter;
