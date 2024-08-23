const { Router } = require('express');
const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
    const products = await req.productsManager.getProducts();
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render("home", { products });
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
    const products = await req.productsManager.getProducts();
    console.log(products)
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render("realtimeproducts", { products });
});

module.exports = viewsRouter;