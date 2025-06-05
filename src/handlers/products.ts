// handlers/products.ts
import { Request, Response, NextFunction } from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.findAll({
            order: [['price', 'DESC']]
        })
        res.json({data: products}) // Sin return
    } catch (error) {
        next(error)
    }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            res.status(404).json({ error: 'Producto No Encontrado' }) // Sin return
            return // Corta la ejecución
        }

        res.json({data: product}) // Sin return
    } catch (error) {
        next(error)
    }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, price, image_url } = req.body

        const product = await Product.create({
            name,
            price,
            image_url: image_url?.trim() === "" ? null : image_url
        })

        res.status(201).json({data: product}) // Sin return
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            res.status(404).json({ error: 'Producto No Encontrado' }) // Sin return
            return
        }
        
        await product.update(req.body)
        await product.save()
        res.json({data: product}) // Sin return
    } catch (error) {
        next(error)
    }
}

export const updateAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            res.status(404).json({ error: 'Producto No Encontrado' }) // Sin return
            return
        }
        
        product.availability = !product.dataValues.availability
        await product.save()
        res.json({data: product}) // Sin return
    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            res.status(404).json({ error: 'Producto No Encontrado' }) // Sin return
            return
        }
        
        await product.destroy()
        res.json({data: 'Producto Eliminado'}) // Sin return
    } catch (error) {
        next(error)
    }
}