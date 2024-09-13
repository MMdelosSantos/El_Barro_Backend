
const CartsModel = require('./models/CartsModel.js')
const mongoose = require('mongoose');

class CartsManagerMongo {

    async getCarts() {  // Método para mostrar carritos
        return await CartsModel.find().lean()
    }

    async getCartBy(filtro = {}) { // Método para mostrar un carrito por algún filtro
        return await CartsModel.findOne(filtro).lean()
    }

    async getCartById(id) { // Método para mostrar un carrito con un id especifico
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('ID inválido');
        }
        return await CartsModel.findById(id)
            .populate('products.product')
    }

    async createCart(cart) {  // Método para generar un carrito nuevo
        let newCart = await CartsModel.create(cart)
        return newCart.toJSON()
    }

    async updateCart(id, update) { // Método para actualizar parcialmente un carrito
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('ID inválido');
        }
        return await CartsModel.findByIdAndUpdate(id, update, { new: true, runValidators: true })
    }
}

module.exports = CartsManagerMongo;