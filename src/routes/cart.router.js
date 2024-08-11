const {Router} = require('express');
// Importo products
const {products} = require("../data/products.js")

const cartRouter= Router()

cartRouter.post('/', async(req, res) => {
    
}) // VER LOS CAMPOS A INCORPORAR PARA NUEVO CARRO

cartRouter.get('/:cid', async(req, res) => {
    res.send()
}) // RECORDAR CONDICIONES PARA FILTRAR. MIRAR CLASE 

cartRouter.post('/:cid/product/:pid', (req, res) => {
    
}) // VER LOS CAMPOS A INCORPORAR PARA NUEVO CARRO

cartRouter.put('/:pid', async(req, res) => {
    
}) // VER LOS CAMPOS A INCORPORAR 

cartRouter.delete('/:pid', async(req, res) => {
    
}) // VER COMO SE BORRA
module.exports = cartRouter;

// MIN 35 DWE CLASE REPASO