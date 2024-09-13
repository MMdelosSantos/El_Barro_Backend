const mongoose = require('mongoose');

const CartsSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products', // Referencia al modelo de productos
                },
                quantity: Number,

            },
        ],
    },
    {
        timestamps: true,
    }
);

const CartsModel = mongoose.model('carts', CartsSchema);
module.exports = CartsModel;

/*const cartsSchema = new mongoose.Schema(
    {products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number
    }]
    },
    {
        timestamps: true,
    }
)

const CartsModel = mongoose.model('Cart',
    cartsSchema
)*/

