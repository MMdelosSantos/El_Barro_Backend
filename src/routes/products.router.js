const { Router } = require('express');
const productsRouter = Router()

// Get en ruta raiz
productsRouter.get('/', async (req, res) => {
    try {
        let products = await req.productsManager.getProducts()

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
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            Error: `Error inesperado en el servidor. Por favor intente más tarde`,
            detalle: `${error.message}`
        })
    }
});

// Get en un producto con id especificO
productsRouter.get('/:pid', async (req, res) => {
    try {
        let { pid } = req.params
        pid = Number(pid)
        if (isNaN(pid)) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: `El id debe ser numérico` })
        }

        let products = await req.productsManager.getProducts()

        let product = products.find(p => p.id === pid)
        console.log(product)
        if (!product) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: `No se encontró producto con el id ${pid}` })
        }
        res.setHeader('Content-Type', 'application/json')
        return res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            Error: `Error inesperado en el servidor. Por favor intente más tarde`,
            detalle: `${error.message}`
        })
    }
});

// Método para crear un producto nuevo
productsRouter.post('/', async (req, res) => {
    let { title, description, code, price, status=true, stock, category, thumbnails } = req.body

    if (!title || !description || !code || !price || !stock || !category) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: `Valores incompletos` })
    }
    try {
        let newProduct = await req.productsManager.create({ title, description, code, price, status, stock, category, thumbnails })
        res.setHeader('Content-Type', 'application/json')
        return res.status(201).json({ Message: `Producto con code ${code} creado correctamente`, newProduct })
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            Error: `Error inesperado en el servidor. Por favor intente más tarde`,
            detalle: `${error.message}`
        })
    }
})

// Método para modificar un producto
productsRouter.put('/:pid', async (req, res) => {
    try {
        let { pid } = req.params
        pid = Number(pid)
        if (isNaN(pid)) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: 'El id debe ser numérico' })
        }

        let updates = req.body
        if (Object.keys(updates).length === 0) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: 'No se han proporcionado datos para actualizar' })
        }

        if ('id' in updates) {
            return res.status(400).json({ error: 'El campo id no puede ser modificado' })
        }

        let updatedProduct = await req.productsManager.update(pid, updates)

        res.setHeader('Content-Type', 'application/json')
        return res.status(200).json({ message: `Producto con id ${pid} modificado correctamente`, product: updatedProduct })
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            Error: 'Error inesperado en el servidor. Por favor intente más tarde',
            detalle: error.message
        })
    }
})

// Método para borrar un producto 
productsRouter.delete('/:pid', async (req, res) => {
    try {
        let { pid } = req.params;
        pid = Number(pid);

        if (isNaN(pid)) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: 'El id debe ser numérico' });
        }

        let resultado = await req.productsManager.delete(pid);
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(resultado);
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({
            Error: 'Error inesperado en el servidor. Por favor intente más tarde',
            detalle: `${error.message}`
        });
    }
});

module.exports = productsRouter;


