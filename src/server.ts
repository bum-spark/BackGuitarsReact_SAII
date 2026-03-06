import express from 'express'
import router from './router'
import db from './config/db'

async function connectDB() {
    try {
        await db.authenticate//conexion
        db.sync()//sincronizar el modelo
        console.log("Conexion Exitosa");
    } catch (error) {
        console.log(error);
        console.log("Hubo un error al conectar");  
    }
}
connectDB()

const server = express()
server.use('/Api', router)

export default server

