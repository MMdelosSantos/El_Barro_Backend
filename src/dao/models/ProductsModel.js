const mongoose = require('mongoose');
const CartsModel = require('./CartsModel.js')

const ProductsModel= mongoose.model(
    "products",
    new mongoose.Schema(
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
)


const CartsSchema= new mongoose.Schema(
    {products: {
        type: [
            { product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"products"
            }}
        ]
    }
}
)


/*const productsSchema = new mongoose.Schema(
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

const ProductsModel = mongoose.model('Product',
    productsSchema
) */

module.exports = ProductsModel;
