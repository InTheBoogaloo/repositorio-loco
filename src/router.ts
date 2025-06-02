import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/products'
import { handleInputErrors } from './middleware'

const router = Router()
/** 
* @swagger
* components:
*    schemas:
*       Product:
*           type: object
*           properties: 
*               id:
*                   type: integer
*                   description: The Product ID
*                   example: 1
*               name:
*                   type: string
*                   description: The Product name
*                   example: Monito curvo 50 pulgadas
*               price: 
*                   type: number
*                   description: The Product price
*                   example: 300
*               availability:
*                   type: boolean
*                   description: The Product availability
*                   example: true
*
*/

// Routing


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                              $ref: '#/components/schemas/Product'
 */

router.get('/', getProducts)

/**
* @swagger
* /api/products/{id}:
*  get:
*       summary: get a product by ID
*       tags:
*           - Products
*       description: Return a product by its unique ID
*       parameters:
*         - in: path
*           name: id
*           description: The ID of the product to retrive
*           requiere: true
*           schema:
*               type: integer
*       responses:
*           200:
*               description: successful response
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Product'
*           404:
*               description: Product no found
*           400: 
*               description: invalid ID
*               
*
 */
router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductById
)


/**
* @swagger
* /api/products:
*  post:
*       summary: Create a new product
*       tags:
*           - Products
*       description: Returns a new record in the database
*       requestBody:
*           requiere: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                           name:
*                               type: string
*                               example: "Monito Curvo de 49 pulgadas"
*                           price:
*                               type: number
*                               example: 399
*       responses:
*           201:
 *               description: successful response
 *               content:
 *                   application/json:
 *                      schema:  
 *                           $ref: '#/components/schemas/Product'
*           400:
*               description: Bad Request - invalid input data
*               
*
 */
router.post('/', 
    // Validación
    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Update a product with user input
 *      tags: 
 *          - Products
 *      description: Return the update product
 *      parameters: 
 *         - in: path
 *           name: id
 *           description: The ID of the product to retrive
 *           requiere: true
 *           schema:
 *               type: integer
 *      requestBody:
 *           requiere: true
 *           content:
 *               application/json:
 *                      schema:
 *                       type: object
 *                       properties:
 *                           name:
 *                               type: string
 *                               example: "Monito Curvo de 49 pulgadas"
 *                           price:
 *                               type: number
 *                               example: 399
 *                           availability:
 *                              type: boolean
 *                              example: true
 *      responses:   
 *           200:
 *               description: successful response
 *               content:
 *                   application/json:
 *                      schema:  
 *                           $ref: '#/components/schemas/Product'
 *           400:
 *               description: Bad request - invalid ID or invalid input data
 *           404:         
 *               description: Product not found
 * 
 */

router.put('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    updateProduct
)


/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update product availability
 *      tags: 
 *          - Products
 *      description: Return the update product availability
 *      parameters: 
 *         - in: path
 *           name: id
 *           description: The ID of the product to retrive
 *           requiere: true
 *           schema:
 *               type: integer
 *      responses:   
 *           200:
 *               description: successful response
 *               content:
 *                   application/json:
 *                      schema:  
 *                           $ref: '#/components/schemas/Product'
 *           400:
 *               description: Bad request - invalid ID 
 *           404:         
 *               description: Product not found
 * 
 */

router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability
)



/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: delete a product by a given ID
 *      tags: 
 *          - Products
 *      description: return a confirmation message
 *      parameters: 
 *         - in: path
 *           name: id
 *           description: The ID of the product to delete
 *           requiere: true
 *           schema:
 *               type: integer
 *      responses:   
 *           200:
 *               description: successful response
 *               content:
 *                   application/json:
 *                      schema:  
 *                           type: string
 *                           value: 'Producto eliminado'
 *           400:
 *               description: Bad request - invalid ID 
 *           404:         
 *               description: Product not found
 * 
 */

router.delete('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
)

export default router