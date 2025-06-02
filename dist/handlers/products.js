"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateAvailability = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const Product_model_1 = __importDefault(require("../models/Product.model"));
const getProducts = async (req, res, next) => {
    try {
        const products = await Product_model_1.default.findAll({
            order: [['price', 'DESC']]
        });
        res.json({ data: products }); // Sin return
    }
    catch (error) {
        next(error);
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product_model_1.default.findByPk(id);
        if (!product) {
            res.status(404).json({ error: 'Producto No Encontrado' }); // Sin return
            return; // Corta la ejecución
        }
        res.json({ data: product }); // Sin return
    }
    catch (error) {
        next(error);
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res, next) => {
    try {
        const product = await Product_model_1.default.create(req.body);
        res.status(201).json({ data: product }); // Sin return
    }
    catch (error) {
        next(error);
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product_model_1.default.findByPk(id);
        if (!product) {
            res.status(404).json({ error: 'Producto No Encontrado' }); // Sin return
            return;
        }
        await product.update(req.body);
        await product.save();
        res.json({ data: product }); // Sin return
    }
    catch (error) {
        next(error);
    }
};
exports.updateProduct = updateProduct;
const updateAvailability = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product_model_1.default.findByPk(id);
        if (!product) {
            res.status(404).json({ error: 'Producto No Encontrado' }); // Sin return
            return;
        }
        product.availability = !product.dataValues.availability;
        await product.save();
        res.json({ data: product }); // Sin return
    }
    catch (error) {
        next(error);
    }
};
exports.updateAvailability = updateAvailability;
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product_model_1.default.findByPk(id);
        if (!product) {
            res.status(404).json({ error: 'Producto No Encontrado' }); // Sin return
            return;
        }
        await product.destroy();
        res.json({ data: 'Producto Eliminado' }); // Sin return
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=products.js.map