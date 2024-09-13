const mongoose = require('mongoose')
const config = require('./config/configuraciones')


const connDB = async () => {

    try {
        await mongoose.connect(config.MONGO_URL,
            { dbName: config.DB_NAME }
        )
        console.log(`Base de datos conectada`)
    }
    catch (error) {
        console.log(`Error al conectarse a la base de datos: ${error.message}`)
    }
}

module.exports = connDB;