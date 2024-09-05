const ProductsModel = require('./models/ProductsModel.js')

class ProductsManagerMongo {
    constructor(io) {
        this.io = io;
    }

    async getProducts() {
        return await ProductsModel.find().lean()
    }

    async getProductBy(filtro = {}) {
        return await ProductsModel.findOne(filtro).lean()
    }

    async createProduct(product) {
        let newProduct=  await ProductsModel.create(product)
        return newProduct.toJSON()
    }

    async updateProduct(id, product) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('ID inválido');
        }
        return await ProductsModel.updateOne({ _id: id }, product)
    }

    async deleteProduct(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('ID inválido');
        }
        return await ProductsModel.findByIdAndDelete(id, { new: true }).lean()
    }
}

module.exports = ProductsManagerMongo;
