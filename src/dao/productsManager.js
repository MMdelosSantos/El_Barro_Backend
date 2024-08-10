const fs=require("fs")

class productsManager {
    static path

    static async getproducts() {
    if(fs.existsSync(this.path)){
        return JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
    }else{
        return []
    }
}
}

module.exports={productsManager}