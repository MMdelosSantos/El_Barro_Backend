const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2')

const productSchema = new mongoose.Schema(
    {
        code: String,
        title: String,
        description: String,
        category: String,
        price: Number,
        status: Boolean,
        stock: Number,
        thumbnails: [String] 
    },
    {
        timestamps: true,
    }
);


productSchema.plugin(paginate);


const ProductsModel = mongoose.model('products', productSchema);


/*
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

ProductsModel.plugin(paginate)
*/

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
