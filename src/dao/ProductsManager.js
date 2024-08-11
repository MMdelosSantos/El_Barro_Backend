const fs = require("fs")

class ProductsManager {
    static path

    static async getProducts() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(await fs.promises.readFile(this.path, { encoding: "utf-8" }))
        } else {
            return []
        }
    }

    static async create(product = {}) {

        const {title, description, code, price, status, stock, category } = product;
        if (!title || !description || !code || !price || !status || !stock || !category) {
            throw new Error("Los campos title, description, code,status, category,stock y price son obligatorios")
        }

        if (typeof title !== "string" || typeof description !== "string" || typeof code !== "string" || typeof category !== "string") {
            throw new Error("El title, description, category y code deben estar en formato string")
        }
        if (typeof price !== "number" || typeof stock !== "number") {
            throw new Error("El price y el stock deben estar en formato number")
        }
        if (typeof status !== "boolean" || status == false) {
            throw new Error("El status debe ser un booleano true")
        }
        if (price < 0 || stock <= 0) {
            throw new Error("El price debe ser mayor a 0 y el stock debe ser igual o mayor a 0")
        }

        let products = await this.getProducts()
        let existe = products.find(p => p.code === code)
        if (existe) {
            throw new Error(`El producto con code: ${code} ya existe en la base de datos`)
        }
        let id = 1
        if (products.length > 0) {
            id = Math.max(...products.map(d => d.id)) + 1
        }
        let newProduct = {
            id, ...product
        }
        products.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 5))
        return newProduct
    }
}

module.exports = ProductsManager;
