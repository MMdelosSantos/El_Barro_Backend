/* class ProductsManager {
    constructor(io) {
        this.io = io;
        this.path = './src/data/products.json';
    }

    async getProducts() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(await fs.promises.readFile(this.path, { encoding: "utf-8" }))
        } else {
            return []
        }
    }

    async create(product = {}) { // Método para crear un nuevo producto


        const { title, description, code, price, status = true, stock, category } = product;
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error("Los campos title, description, code, category,stock y price son obligatorios")
        }

        if (typeof title !== "string" || typeof description !== "string" || typeof code !== "string" || typeof category !== "string") {
            throw new Error("El title, description, category y code deben estar en formato string")
        }
        if (typeof price !== "number" || typeof stock !== "number") {
            throw new Error("El price y el stock deben estar en formato number")
        }
        if (price < 0 || stock <= 0) {
            throw new Error("El price debe ser mayor a 0 y el stock debe ser igual o mayor a 0")
        }

        let products = await this.getProducts()
        let existe = products.find(p => p.code === code)
        if (existe) {
            throw new Error(`El producto con code: ${code} ya existe en la base de datos`)
        }


        // Generando el id para el producto nuevo
        let id = 1;

        if (products.length > 0) {
            id = Math.max(...products.map(d => d.id)) + 1
        }
        let newProduct = {
            id, ...product

        };


        products.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 5))

        // Emitir el evento de producto actualizado
        this.io.emit('updateProducts', products);


        return newProduct
    }


    async update(id, updates) { // Método para modificar un producto ya existente
        let products = await this.getProducts()
        let productIndex = products.findIndex(p => p.id === id)

        if (productIndex === -1) {
            throw new Error(`Producto con id ${id} no encontrado`)
        }


        const product = products[productIndex]

        for (const [key, value] of Object.entries(updates)) {
            if (key === 'id') {
                throw new Error('El campo id no puede ser modificado')
            }

            if (value !== undefined) {

                switch (key) {
                    case 'title':
                    case 'description':
                    case 'code':
                    case 'category':
                        if (typeof value !== 'string') {
                            throw new Error(`${key} debe ser de tipo string`)
                        }
                        product[key] = value.trim()
                        break
                    case 'price':
                    case 'stock':
                        if (typeof value !== 'number') {
                            throw new Error(`${key} debe ser de tipo number`)
                        }
                        product[key] = value
                        break
                    case 'status':
                        if (typeof value !== 'boolean') {
                            throw new Error('status debe ser de tipo boolean')
                        }
                        product[key] = value
                        break
                    case 'thumbnails':
                        if (!Array.isArray(value)) {
                            throw new Error('thumbnails debe ser un array')
                        }
                        product[key] = value
                        break
                    default:
                        throw new Error(`Campo ${key} no reconocido`)
                }
            }
        }

        products[productIndex] = product
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 5))

        // Emitir el evento de producto actualizado
        if (this.io) {
            this.io.emit('updateProducts', products);
        }

        return product
    }

    async delete(id) { //Método para borrar un producto
        let products = await this.getProducts();
        let productIndex = products.findIndex(p => p.id === id);

        if (productIndex === -1) {
            throw new Error(`Producto con id ${id} no encontrado`);
        }

        products.splice(productIndex, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 5));

        // Emitir el evento de producto actualizado
        if (this.io) {
            this.io.emit('updateProducts', products);
        }

        return { message: `Producto con id ${id} eliminado correctamente` };
    }

}

module.exports = ProductsManager;
*/