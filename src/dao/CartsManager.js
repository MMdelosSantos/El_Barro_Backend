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

    static async create() {
        let carts=await this.getCarts()
        let id=1;
        if(carts.length>0){
            id=Math.max(...carts.map(d=>d.id))+1;
        }
        carts.push({
            id,
            products
        })

await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 5))
return {id,products}
    }
}
    module.exports = CartsManager;