import request from 'supertest'
import server, {connectDB} from '../server'
import db from '../config/db'

describe('GET /api', () => {
    it('enviarnos una respiesta JSON',async () => {
        const res= await request(server).get('/api')
        
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('Desde API')

        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde api')
    })
})

jest.mock('../config/db')

describe('connectDB', () => {
    it('debería manejar el error de conexión a la base de datos', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValue(new Error('Hubo un error al conectar a la BD'))
        const consoleSpy=jest.spyOn(console,'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Hubo un error al conectar a la BD')
    )
    })
})