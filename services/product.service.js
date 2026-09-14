const AppError = require('../middlewares/app.error');
const Product = require('../models/product');
class ProductService {
    static async getAllProducts() {
        try {
            const products = await Product.getAll();
            return products;
        } catch (error) {
            throw new AppError('Error al obtener los productos: ' + error.message, 500);
        }
    }
}
module.exports = ProductService;