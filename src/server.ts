import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'

// Conectar a base de datos
export async function connectDB() {
  try {
    db.authenticate()
    db.sync()
    console.log(colors.magenta('Conexion exitosa a la BD'))
  } catch (error) {
    console.log(error)
    console.log(colors.red.bold('Hubo un error al conectar a la BD'))
  }
}
connectDB()

// Instancia de express
const server = express()

// Permitir conexiones (CORS)
const whiteList = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'https://repositorio-loco-frontend.vercel.app',
  'https://repositorio-loco-frontend-git-master-emmmaends-projects.vercel.app'
]

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whiteList.includes(origin)) {
      callback(null, true)
    } else {
      console.log(`CORS bloqueado para origen: ${origin}`)
      callback(new Error('Error de CORS'))
    }
  }
}
//
server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))
server.use('/api/products', router)

// Documentación Swagger
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions))

export default server
