// Importo router y managers
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js');
const ProductsManager = require('./dao/ProductsManager.js');
const CartsManager = require('./dao/CartsManager.js');
const viewsRouter = require('./routes/views.router.js')
const { Server } = require('socket.io');
const http = require('http');

// Importando express js

const express = require('express');

// Importo handlebars
const { engine } = require('express-handlebars');;

const app = express();

//Configurando para que interprete mensajes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Configuracion Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views","./src/views")

// Creando los manager de products y carts

//ProductsManager.path = "./src/data/products.json";
CartsManager.path = "./src/data/carts.json";

// Creando el puerto
const PORT = 8080

// Configurando el enrutamiento
app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

app.use("/", viewsRouter)

// Contenido estatico 
app.use(express.static("./src/public"))

// Definiendo el puerto en el cual escucha
const serverHTTP = app.listen(PORT, () => console.log(`Escuchando en puerto ${PORT}`));

// Configuración del servidor de WebSocket
const io = new Server(serverHTTP);

const productsManager = new ProductsManager(io);
// Pasar la instancia de ProductsManager al router
productsRouter.locals = { productsManager };
io.on('connection', (socket) => {
    console.log('Nuevo cliente WebSocket conectado');

    productsManager.getProducts().then(products => {
        socket.emit('updateProducts', products);
    });

    socket.on('addProduct', async (product) => {
        await productsManager.create(product);
        const products = await productsManager.getProducts();
        io.emit('updateProducts', products); // Emitir a todos los clientes
    });

    socket.on('deleteProduct', async (id) => {
        await productsManager.delete(id);
        const products = await productsManager.getProducts();
        io.emit('updateProducts', products); // Emitir a todos los clientes
    });

    socket.on('disconnect', () => {
        console.log('Cliente WebSocket desconectado');
    });
});
