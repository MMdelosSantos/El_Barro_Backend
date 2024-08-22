const fs = require("fs")
const { products } = require("../data/products")


class CartsManager {
    static path

    static async getCarts() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(await fs.promises.readFile(this.path, { encoding: "utf-8" }))
        } else {
            return []
        }
    }

    static async create() { // Método para generar un carrito nuvo
        let carts = await this.getCarts();

        let id = 1;
        if (carts.length > 0) {
            id = Math.max(...carts.map(d => d.id)) + 1;
        }

        const newCart = {
            id: id,
            products: []
        };

        carts.push(newCart);

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 5));
        return newCart;
    }


    static async update(id, cart = {}) { // Método para incorporar un producto a un carrito 
        let carts = await this.get()
        let indexCart = carts.findIndex(c => c.d === id)
        if (indexCart === -1) {
            throw new Error(`No existe carrito con id${id}`)
        }
        carts[indexCart] = cart
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 5))
        return carts[indexCart]

    }

    static async getCartById(cartId) { // Método para filtrar un carrito por su id
        let carts = await this.getCarts();
        let cart = carts.find(c => c.id === cartId);

        if (!cart) {
            throw new Error(`Carrito con id ${cartId} no encontrado`);
        }

        return cart;
    }


}

module.exports = CartsManager;