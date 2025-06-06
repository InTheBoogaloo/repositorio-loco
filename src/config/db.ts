 import dotenv from 'dotenv'
import { Sequelize } from "sequelize-typescript";

dotenv.config()

console.log()
const db = new Sequelize(process.env.DATABASE_URL!, {
    models:[__dirname + '/../models/**/*.ts']
})


export default db
