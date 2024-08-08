const {Router} = require('express');
// Importo products
const {products} = require("../data/products.js")

const cartRouter= Router()

cartRouter.post('/', (req, res) => {
    
}) // VER LOS CAMPOS A INCORPORAR PARA NUEVO CARRO

cartRouter.get('/:cid', (req, res) => {
    res.send()
}) // RECORDAR CONDICIONES PARA FILTRAR. MIRAR CLASE 

cartRouter.post('/:cid/product/:pid', (req, res) => {
    
}) // VER LOS CAMPOS A INCORPORAR PARA NUEVO CARRO

cartRouter.put('/:pid', (req, res) => {
    
}) // VER LOS CAMPOS A INCORPORAR 

cartRouter.delete('/:pid', (req, res) => {
    
}) // VER COMO SE BORRA
module.exports = cartRouter;