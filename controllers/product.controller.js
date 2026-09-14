const AppError = require('../middlewares/app.error');
const ProductService = require('../services/product.service');
class ProductController {
    static async getAllProducts(req, res) {
        try {
            const products = await ProductService.getAllProducts();
            res.json(products);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}
module.exports = ProductController;