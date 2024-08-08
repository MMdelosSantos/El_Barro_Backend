const {Router} = require('express');
// Importo products
const {products} = require("../data/products.js")

const productsRouter= Router()

productsRouter.get('/', (req, res) => {
    res.send(products) // RECORDAR EL LIMIT
})

productsRouter.get('/:pid', (req, res) => {
    res.send(products)
}) // RECORDAR CONDICIONES PARA FILTRAR. MIRAR CLASE 

productsRouter.post('/', (req, res) => {
    
}) // VER LOS CAMPOS A INCORPORAR 

productsRouter.put('/:pid', (req, res) => {
    
}) // VER LOS CAMPOS A INCORPORAR 

productsRouter.delete('/:pid', (req, res) => {
    
}) // VER COMO SE BORRA
module.exports = productsRouter;