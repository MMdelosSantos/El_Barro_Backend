const { Router } = require('express');
const ProductsManagerMongo = require('../dao/ProductsManagerMongo');
const { isValidObjectId } = require('mongoose');
const productsRouterMongo = Router();


const productsManager = new ProductsManagerMongo();

// Get en ruta raiz
productsRouterMongo.get('/', async (req, res) => {
    try {
        let { limit = 10, skip = 0, query, sort, page = 1 } = req.query;
        limit = Number(limit);
        skip = Number(skip);
        page = Number(page);

        if (isNaN(limit) || limit <= 0) {
            return res.status(400).json({ error: 'El argumento limit debe ser un número positivo' });
        }

        if (isNaN(skip) || skip < 0) {
            return res.status(400).json({ error: 'El argumento skip debe ser un número no negativo' });
        }

        if (isNaN(page) || page <= 0) {
            return res.status(400).json({ error: 'El argumento page debe ser un número positivo' });
        }

        let products;
        if (skip > 0) {
            products = await productsManager.getProducts();
            products = products.slice(skip, skip + limit);
        } else {
            let productsPage = await productsManager.getProductsPaginate(page, limit);
            products = productsPage.docs;
        }

        if (query) {
            try {
                const queryObj = JSON.parse(query);
                products = products.filter(product => {
                    return Object.keys(queryObj).every(key => {
                        return String(product[key]).toLowerCase().includes(String(queryObj[key]).toLowerCase());
                    });
                });
            } catch (error) {
                return res.status(400).json({ error: 'El argumento query debe ser una cadena JSON válida' });
            }
        }
  
        if (sort) {
            if (sort !== 'asc' && sort !== 'desc') {
                return res.status(400).json({ error: "El argumento sort debe ser 'asc' o 'desc'" });
            }
            products.sort((a, b) => {
                return sort === 'asc' ? a.price - b.price : b.price - a.price;
            });
        }

        const productsPage = await productsManager.getProductsPaginate(page, limit);
        
        const totalPages = productsPage.totalPages;
        const currentPage = productsPage.page;
        const hasPrevPage = productsPage.prevPage !== null;
        const hasNextPage = productsPage.nextPage !== null;
        
        const response = {
            status: 'success',
            payload: products,
            totalPages: totalPages,
            prevPage: productsPage.prevPage || null,
            nextPage: productsPage.nextPage || null,
            page: currentPage,
            hasPrevPage: hasPrevPage,
            hasNextPage: hasNextPage,
            prevLink: hasPrevPage ? `http://localhost:8080/api/products?page=${productsPage.prevPage}&limit=${limit}` : null,
            nextLink: hasNextPage ? `http://localhost:8080/api/products?page=${productsPage.nextPage}&limit=${limit}` : null
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error inesperado en el servidor. Por favor intente más tarde',
            detalle: error.message
        });
    }
});
/*
productsRouterMongo.get('/', async (req, res) => {
    try {
        let products = await productsManager.getProductsPaginate()

        let { limit, skip, query, sort, page } = req.query
        if (limit) {
            limit = Number(limit)
            if (isNaN(limit)) {
                res.setHeader('Content-Type', 'application/json')
                return res.status(400).json({ error: `El argumento limit debe ser de tipo número` })
            }
        } else {
            limit = 10
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
        if (query) {
            const queryObj = JSON.parse(query);
            products = products.filter(product => {
                return Object.keys(queryObj).every(key => {
                    return String(product[key]).toLowerCase().includes(String(queryObj[key]).toLowerCase());
                });
            });
        }

        if (sort) {
            if (sort !== 'asc' && sort !== 'desc') {
                return res.status(400).json({ error: `El argumento sort debe ser 'asc' o 'desc'` });
            }
            products.sort((a, b) => {
                if (sort === 'asc') {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            });
        }

        if (page) {
            page = Number(page)
            if (!page || isNaN(Number(page))) {
                res.setHeader('Content-Type', 'application/json')
                return res.status(400).json({ error: `El argumento page debe ser de tipo número` })
            }
        } else {
            page = 1
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
*/

// Get en un producto con id especificO
productsRouterMongo.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        if (!isValidObjectId(pid)) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: `El id ${pid} es inválido` })
        }

        let products = await productsManager.getProducts()

        let product = await productsManager.getProductById(pid)
        if (!product) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(404).json({ error: `No se encontró producto con el id ${pid}` })
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
productsRouterMongo.post('/', async (req, res) => {
    let { title, description, code, price, status = true, stock, category, thumbnails } = req.body

    if (!title || !description || !code || !price || !stock || !category) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: "Los campos title, description, code, category,stock y price son obligatorios" })
    }

    if (typeof title !== "string" || typeof description !== "string" || typeof code !== "string" || typeof category !== "string") {
        throw new Error("El title, description, category y code deben estar en formato string")
    }
    if (typeof price !== "number" || typeof stock !== "number") {
        throw new Error("El price y el stock deben estar en formato number")
    }
    if (price < 0 || stock <= 0) {
        throw new Error("El price debe ser mayor a 0 y el stock debe ser igual o mayor a 0")
    }

    try {
        let existe = await productsManager.getProductBy({ code });
        if (existe) {
            throw new Error(`El producto con code: ${code} ya existe en la base de datos`)
        }
        let newProduct = await productsManager.createProduct({ title, description, code, price, status, stock, category, thumbnails })
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

// Método para modificar un producto ya existente
productsRouterMongo.put('/:pid', async (req, res) => {
    try {
        let { pid } = req.params
        if (!isValidObjectId(pid)) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: `El id ${pid} es inválido` })
        }

        let updates = req.body
        if (Object.keys(updates).length === 0) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: 'No se han proporcionado datos para actualizar' })
        }

        if ('id' in updates) {
            return res.status(400).json({ error: 'El campo id no puede ser modificado' })
        }

        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined) {
                switch (key) {
                    case 'title':
                    case 'description':
                    case 'code':
                    case 'category':
                        if (typeof value !== 'string') {
                            return res.status(400).json({ error: `${key} debe ser de tipo string` });
                        }
                        updates[key] = value.trim();
                        break;
                    case 'price':
                    case 'stock':
                        if (typeof value !== 'number') {
                            return res.status(400).json({ error: `${key} debe ser de tipo number` });
                        }
                        break;
                    case 'status':
                        if (typeof value !== 'boolean') {
                            return res.status(400).json({ error: 'status debe ser de tipo boolean' });
                        }
                        break;
                    case 'thumbnails':
                        if (!Array.isArray(value)) {
                            return res.status(400).json({ error: 'thumbnails debe ser un array' });
                        }
                        break;
                    default:
                        return res.status(400).json({ error: `Campo ${key} no reconocido` });
                }
            }
        }

        let updatedProduct = await productsManager.updateProduct(pid, updates)
        if (!updatedProduct) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: 'No se ha podido modificar el product' })
        }

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
productsRouterMongo.delete('/:pid', async (req, res) => {
    try {
        let { pid } = req.params;

        if (!isValidObjectId(pid)) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `El id ${pid} es inválido` });
        }
        let resultado = await productsManager.deleteProduct(pid);

        if (!resultado) {
            return res.status(404).json({ error: `No se encontró un producto con el id ${pid}` });
        }

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ message: `Producto con id ${pid} eliminado correctamente` })
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({
            Error: 'Error inesperado en el servidor. Por favor intente más tarde',
            detalle: `${error.message}`
        });
    }
});

module.exports = productsRouterMongo;


