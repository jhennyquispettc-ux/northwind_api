const AppError = require('../middlewares/app.error');
const OrderService = require('../services/order.service');
class OrderController {
    static async getAllOrders(req, res) {
        try {
            const orders = await OrderService.getAllOrders();
            res.json(orders);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
    static async getOrderById(req, res) {
        const orderId = req.params.id;
        try {
            const order = await OrderService.getOrderById(orderId);
            if (!order) {
                return res.status(404).json({ error: 'Pedido no encontrado' });
            }
            res.json(order);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
    static async createOrder(req, res) {
        const orderData = req.body;
        try {
            const newOrderId = await OrderService.createOrder(orderData);
            res.status(201).json({ id: newOrderId });
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }   
        }
    }
}
module.exports = OrderController;