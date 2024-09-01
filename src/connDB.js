const mongoose= require ('mongoose')

const connDB= async()=>{
    try{
        await mongoose.connect("mongodb+srv://comis70140:CoderCoder@cluster0.wjzuo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            {dbName:"ElBarroCeramicas"}
        )
        console.log(`Base de datos conectada`)
    }
    catch(error) {
        console.log(`Error al conectarse a la base de datos: ${error.message}`)
    }
}

module.exports = connDB;