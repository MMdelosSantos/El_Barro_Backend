const mongoose = require('mongoose');

const cartsColl = "carts"
const cartsSchema = new mongoose.Schema(
    {
        products: []
    },
    {
        timestamps: true,
    }

)

const CartsModel = mongoose.model(
    cartsColl,
    cartsSchema
)

module.exports = CartsModel;
