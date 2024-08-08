// Importo router
const productsRouter = require('./routes/products.router.js')

// Importando express js

const express = require('express');


const app = express()

// Creando el servidor 
const PORT=8080

app.get("/", (req, res)=> {
    res.send("Hola" )
})

app.use("/api/products", productsRouter);

app.use("/api/carts", cartRouter);



app.listen(PORT, () =>  console.log(`Escuchando en puerto ${PORT}`))
