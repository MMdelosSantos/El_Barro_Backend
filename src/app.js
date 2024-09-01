const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const connDB= require('./connDB.js')

const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js');
const viewsRouter = require('./routes/views.router.js');

const ProductsManager = require('./dao/ProductsManager.js');
const CartsManager = require('./dao/CartsManager.js');
CartsManager.path = "./src/data/carts.json";

const app = express();
const PORT = 8080;
app.use(express.json());  // Para manejar datos en formato JSON
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
const { engine } = require('express-handlebars');
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views","./src/views");

// Configuración del servidor HTTP y WebSocket
const serverHTTP = app.listen(PORT, () => console.log(`Escuchando en puerto ${PORT}`));
const io = new Server(serverHTTP);

// Creación de la instancia de ProductsManager
const productsManager = new ProductsManager(io);

// Middleware global para asignar productsManager a req
app.use((req, res, next) => {
    req.productsManager = productsManager;
    next();
});

// Configuración de rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// Contenido estático
app.use(express.static("./src/public"));

// Configuración de WebSocket
io.on('connection', (socket) => {
    console.log('Nuevo cliente WebSocket conectado');

    productsManager.getProducts().then(products => {
        socket.emit('updateProducts', products);
    });

    socket.on('addProduct', async (product) => {
        await productsManager.create(product);
        const products = await productsManager.getProducts();
        io.emit('updateProducts', products);
    });

    socket.on('deleteProduct', async (id) => {
        await productsManager.delete(id);
        const products = await productsManager.getProducts();
        io.emit('updateProducts', products);
    });

    socket.on('disconnect', () => {
        console.log('Cliente WebSocket desconectado');
    });
});

// Conexion con MongoDB
connDB()