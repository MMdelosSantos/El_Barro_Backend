
// Importaciones
const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const connDB = require('./connDB.js')
const configuraciones = require('./config/configuraciones.js')
const cartsRouterMongo = require('./routes/carts.routerMongo.js');
const viewsRouter = require('./routes/views.router.js');
const productsRouterMongo = require('./routes/products.routerMongo.js');
const ProductsManagerMongo = require('./dao/ProductsManagerMongo.js');
const exphbs = require('express-handlebars');

// Configurando app

const app = express();
const PORT = configuraciones.PORT;
app.use(express.json());  // Para manejar datos en formato JSON
app.use(express.urlencoded({ extended: true }));


// Conexion con MongoDB
connDB()


// Configuración de Handlebars
const { engine } = require('express-handlebars');
const { config } = require('process');

app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Configuración del servidor HTTP y WebSocket
const serverHTTP = app.listen(PORT, () => console.log(`Escuchando en puerto ${PORT}`));
const io = new Server(serverHTTP);

// Creación de la instancia de ProductsManager
const productsManager = new ProductsManagerMongo(io);

// Middleware global para asignar productsManager a req
app.use((req, res, next) => {
    req.ProductsManagerMongo = new ProductsManagerMongo();
    next();
});

// Configuración de rutas
// con MongoDB
app.use("/api/products", productsRouterMongo)
// Anterior ruta con FS
//app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouterMongo);
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
        await productsManager.createProduct(product);
        const products = await productsManager.getProducts();
        io.emit('updateProducts', products);
    });

    socket.on('deleteProduct', async (id) => {
        await productsManager.deleteProduct(id);
        const products = await productsManager.getProducts();
        io.emit('updateProducts', products);
    });

    socket.on('disconnect', () => {
        console.log('Cliente WebSocket desconectado');
    });
});


