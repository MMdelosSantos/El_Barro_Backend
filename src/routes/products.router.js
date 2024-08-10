const { Router } = require('express');
// Importo products
let { products } = require("../data/products.js")
const productsManager = require("../dao/productsManager.js")

const productsRouter = Router()

// Get en ruta raiz
productsRouter.get('/', async (req, res) => {

    // let products=await productsManager.getProducts()

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

// Get en un producto con id especifica
productsRouter.get('/:pid', async (req, res) => {
    let { pid } = req.params
    pid = Number(pid)
    if (isNaN(pid)) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: `El id debe ser numérico` })
    }

    // let products=await productsManager.getProducts()

    let product = products.find(p => p.id === pid)
    console.log(product)
    if (!product) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: `No se encontró producto con el id ${pid}` })
    }

    res.send(product)
})

productsRouter.post('/', async(req, res) => {
    // let newProduct= "Crea un nuevo producto"
    let product = req.body;
    if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: `Valores incompletos` })
    }
    if (typeof product.title !== "string" || typeof product.description !== "string" || typeof product.code !== "string" || typeof product.category !== "string") {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: `El title, description, category y code deben estar en formato string` })
    }
    if (typeof product.price !== "number" || typeof product.stock !== "number") {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: `El price y el stock deben estar en formato number` })
    }
    if (typeof product.status !== "boolean" || product.status == false) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: `El status debe ser un booleano true` })
    }
    if (product.price < 0 || product.stock <= 0) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: `El price debe ser mayor a 0 y el stock debe ser igual o mayor a 0` })
        }
    products.push(product)
    res.setHeader('Content-Type', 'application/json')
            return res.status(201).json({product})
}) // VER COMO HACER EL ID INCREMENTAL

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
    return res.status(200).json({Message: `Producto con id: ${pid} modificado`})
    

}) // VER LOS CAMPOS A INCORPORAR 

productsRouter.delete('/:pid', (req, res) => {
    id: ""

}) // VER COMO SE BORRA


module.exports = productsRouter;

// MIN 30 DE CLASE 8