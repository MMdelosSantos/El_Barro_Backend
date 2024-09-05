const mongoose = require('mongoose');

const productsColl = "products"
const productsSchema = new mongoose.Schema(
    {
        code: String,
        title: String,
        description: String,
        category: String,
        price: Number,
        status: Boolean,
        stock: Number,
        thumbnails: []
    },
    {
        timestamps: true,
    }

)

const ProductsModel = mongoose.model(
    productsColl,
    productsSchema
)

module.exports = ProductsModel;
