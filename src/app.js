// Importo router y otros
const productsRouter = require('./routes/products.router.js');
const cartRouter = require('./routes/cart.router.js');
const ProductsManager = require('./dao/ProductsManager.js');

// Importando express js

const express = require('express');


const app = express();

//Configurando para que interprete mensajes JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

ProductsManager.path="./src/data/products.json"

// Creando el servidor 
const PORT=8080

app.get("/", (req, res)=> {
    res.setHeader('Content-Type','text/plain');
    res.status(200).send("Home Page" )
})

app.use("/api/products", productsRouter);

app.use("/api/carts", cartRouter);



app.listen(PORT, () =>  console.log(`Escuchando en puerto ${PORT}`));
