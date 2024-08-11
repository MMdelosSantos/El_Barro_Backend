const { Router } = require('express');
// Importo products
const ProductsManager = require("../dao/ProductsManager.js")

const productsRouter = Router()

// Get en ruta raiz RECORDAR PPONER ELL TRY CATCH
productsRouter.get('/', async (req, res) => {

    let products = await ProductsManager.getProducts()

    let { limit, skip } = req.query
    if (limit) {
        limit = Number(limit)
        if (isNaN(limit)) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: `El argumento limit debe ser de tipo número` })
        }
    } else {
        limit = products.length
    }

    if (skip) {
        skip = Number(skip)
        if (isNaN(skip)) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: `El argumento skip debe ser de tipo número` })
        }
    } else {
        skip = 0
    }

    let resultado = products.slice(skip, skip + limit)
    res.setHeader('Content-Type', 'application/json')
    return res.status(200).json(resultado)
})

// Get en un producto con id especificO
productsRouter.get('/:pid', async (req, res) => {
    let { pid } = req.params
    pid = Number(pid)
    if (isNaN(pid)) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: `El id debe ser numérico` })
    }

    let products = await ProductsManager.getProducts()

    let product = products.find(p => p.id === pid)
    console.log(product)
    if (!product) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: `No se encontró producto con el id ${pid}` })
    }

    res.send(product)
})

productsRouter.post('/', async (req, res) => {
    let { title, description, code, price, status, stock, category, thumbnails } = req.body

    if (!title || !description || !code || !price || !status || !stock || !category) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: `Valores incompletos` })
    }
    try {
        let newProduct = await ProductsManager.create({ title, description, code, price, status, stock, category, thumbnails })
        res.setHeader('Content-Type', 'application/json')
        return res.status(201).json(newProduct)
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            Error: `Error inesperado en el servidor. Por favor intente más tarde`,
            detalle: `${error.message}`
        })
    }
}) 

productsRouter.put('/:pid', (req, res) => {
    let { title: titleBody } = req.body;
    let { description: descriptionBody } = req.body;
    let { code: codeBody } = req.body;
    let { price: priceBody } = req.body;
    let { status: statusBody } = req.body;
    let { stock: stockBody } = req.body;
    let { category: categoryBody } = req.body;

    if (!titleBody) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Complete el title` })
    }
    title = `${titleBody}`.trim()

    if (!descriptionBody) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Complete el description` })
    }

    description = `${descriptionBody}`.trim()

    res.setHeader('Content-Type', 'application/json');

    res.setHeader('Content-Type', 'application/json')
    return res.status(200).json({ Message: `Producto con id: ${pid} modificado` })


}) // VER LOS CAMPOS A INCORPORAR 

productsRouter.delete('/:pid', (req, res) => {
    id: ""

}) // VER COMO SE BORRA


module.exports = productsRouter;

