import  express  from "express"
import router from './router'
import db from './config/db'
import colors from 'colors'
import SwaggerUi from "swagger-ui-express"
import swaggerSpec,{SwaggerUiOptions}from "./config/swagger"

//conectar a bd
export async function connectDB(){
    try{
        await db.authenticate()
    db.sync()
    //console.log(colors.green('Conexion exitosa a la base de datos'))
    } catch (error){
        console.error()
        console.log(colors.red('Hubo un error al conectar a la BD'))
    }
}

connectDB()
const server = express()
server.use(express.json())
server.use('/api/products', router)
server.use('/docs', SwaggerUi.serve,SwaggerUi.setup(swaggerSpec, SwaggerUiOptions))

export default server