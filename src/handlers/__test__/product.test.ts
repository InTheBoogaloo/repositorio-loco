import request from 'supertest'
import server from '../../server'

describe('POST /api/products', () => {
    it('debería mostrar errores de validación', async () => {
        const response=await request(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)
        
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('debe de validar si el precio es mas a 0', async () => {
        const response=await request(server).post('/api/products').send({
            name: "Mouse - Testing",
            price: 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('debe de validar si el precio es un numero y mayor a 0', async () => {
        const response=await request(server).post('/api/products').send({
            name: "Mouse - Testing",
            price: "hola"
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)
        
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)
    })

    it('deberia crear un nuevo producto', async ()=>{
      const response = await request(server).post('/api/products').send(
        {
            name : "Mouse - Testing",
            price : 300
        })
        
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products', () => {
    it('revisa si la url api/products existe', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })

    it('Obtenga una respuesta json con productos',async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products/:id', () => {
    it('debera regresar 404 si el producto no existe', async () => {
        const productId=2000
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto No Encontrado')
    })

    it('revisa si la url api/products/id existe', async () => {
        const response = await request(server).get('/api/products/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    it('revisa si se optiene un producto', async () => {
        const response = await request(server).get('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', () => {
    it('revisa si la url api/products/id existe', async () => {
        const response = await request(server)
                                             .put('/api/products/not-valid-url')
                                             .send({
                                                name:"monitor curvo",
                                                availability: true,
                                                price:300})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    it('Debería mostrarse un mensaje de error de validación al actualizar un producto', async () => {
        const response = await request(server).put('/api/products/1').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('Debera validar si el precio sea mayor a 0', async () => {
        const response = await request(server)
                                              .put('/api/products/1')
                                              .send({
                                                name:"monitor curvo",
                                                availability: true,
                                                price:-300})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Precio no válido')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('Debería devolver una respuesta 404 para un producto inexistente', async () => {
        const productId = 2000
        const response = await request(server)
                                              .put(`/api/products/${productId}`)
                                              .send({
                                                name:"monitor curvo",
                                                availability: true,
                                                price: 300})
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto No Encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('debe actualizar un producto existente con datos válidos', async () => {
        const response = await request(server)
                                              .put(`/api/products/1`)
                                              .send({
                                                name:"monitor curvo",
                                                availability: true,
                                                price: 300})
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('PATCH /api/products/:id', () => {
    it('Debería devolver una respuesta 404 para un producto inexistente', async () => {
        const productId = 2000
        const response = await request(server).patch(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto No Encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('Debería actualizar la disponibilidad del producto', async () => {
        const response = await request(server).patch('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(false)

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })
})

describe('DELETE /api/products/:id', () => {
    it('Debe comprobar un ID válido', async () => {
        const response = await request(server).delete('/api/products/not-valid')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    it('Debería devolver una respuesta 404 para un producto inexistente', async () => {
        const productId = 2000
        const response = await request(server).delete(`/api/products/${productId}`) 
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto No Encontrado')
        
        expect(response.status).not.toBe(200)
    })

    it('debería eliminar un producto', async () => {
        const response = await request(server).delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('Producto Eliminado')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
    })
})