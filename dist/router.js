"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const products_1 = require("./handlers/products");
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
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
router.get('/', products_1.getProducts);
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
router.get('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no válido'), middleware_1.handleInputErrors, products_1.getProductById);
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
(0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre de Producto no puede ir vacio'), (0, express_validator_1.body)('price')
    .isNumeric().withMessage('Valor no válido')
    .notEmpty().withMessage('El precio de Producto no puede ir vacio')
    .custom(value => value > 0).withMessage('Precio no válido'), middleware_1.handleInputErrors, products_1.createProduct);
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
router.put('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no válido'), (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre de Producto no puede ir vacio'), (0, express_validator_1.body)('price')
    .isNumeric().withMessage('Valor no válido')
    .notEmpty().withMessage('El precio de Producto no puede ir vacio')
    .custom(value => value > 0).withMessage('Precio no válido'), (0, express_validator_1.body)('availability')
    .isBoolean().withMessage('Valor para disponibilidad no válido'), middleware_1.handleInputErrors, products_1.updateProduct);
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
router.patch('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no válido'), middleware_1.handleInputErrors, products_1.updateAvailability);
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
router.delete('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no válido'), middleware_1.handleInputErrors, products_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=router.js.map