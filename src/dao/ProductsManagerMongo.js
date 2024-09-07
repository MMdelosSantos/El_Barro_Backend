const ProductsModel = require('./models/ProductsModel.js')
const mongoose = require('mongoose');

class ProductsManagerMongo {
    constructor(io) {
        this.io = io;
    }

    async getProducts() {  // Método para mostrar productos
        return await ProductsModel.find().lean()
    }

    async getProductBy(filtro = {}) {  // Método para mostrar un producto por un filtro específico
        return await ProductsModel.findOne(filtro).lean()
    }

    async getProductById(id) { // Método para mostrar un producto por id específico
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('ID inválido');
        }
        return await ProductsModel.findById(id).lean(); 
    }

    async createProduct(product) {  // Método para crear un producto
        let newProduct = await ProductsModel.create(product)
        return newProduct.toJSON()
    }

    async updateProduct(id, product) {  // Método para modificar un producto
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('ID inválido');
        }
        return await ProductsModel.findByIdAndUpdate(id, product, { new: true }).lean()
    }

    async deleteProduct(id) { // Mñetodo para borrar un producto
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("Producto no encontrado")
            return null;
        }
        const deletedProduct = await ProductsModel.findByIdAndDelete(id, { new: true }).lean();
        return deletedProduct;
    }
}

module.exports = ProductsManagerMongo;
