const db = require('../config/db');
const OrderDetail = require('../models/orderDetail');
const OrderDto = require('../dto/order.dto');
const Order = require('../models/order');
const Customer = require('../models/customer');
const Product = require('../models/product');
const AppError = require('../middlewares/app.error');
const Employee = require('../models/employee');
class OrderService {
    static async getAllOrders() {
        try {
            const orders = await Order.getAll();
            return orders.map(order => new OrderDto(order));
        } catch (error) {
            throw new AppError('Error al obtener los pedidos: ' + error.message, 500);
        }
    }
    static async getOrderById(orderId) {
        try {
            const order = await Order.getById(orderId);
            if (!order) {
                throw new AppError('Pedido no encontrado', 404);
            }
            return new OrderDto(order);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError('Error al obtener el pedido: ' + error.message, 500);
        }
    }
    static async createOrder(orderData) {
        const client = await db.connect();
        try {
            await client.query('BEGIN');
            const newOrder = new Order(orderData);
            const employee = await Employee.getById(newOrder.employeeId);
            if (!employee) {
                throw new AppError('Empleado no encontrado', 404);
            } 
            const customer = await Customer.getById(newOrder.customerId);
            if (!customer) {
                throw new AppError('Cliente no encontrado', 404);
            }
            await newOrder.save(client);
            for (const detail of orderData.orderDetails) {
                const product = await Product.getById(detail.productId);
                if (!product) {
                    throw new AppError(`Producto con ID ${detail.productId} no encontrado`, 404);
                }
                const orderDetail = new OrderDetail({
                    orderId: newOrder.orderId,
                    productId: detail.productId,
                    quantity: detail.quantity,
                    unitPrice: detail.unitPrice,
                    discount: detail.discount
                });
                await orderDetail.save(client);
            }
            await client.query('COMMIT');
            return newOrder.orderId;
        } catch (error) {
            await client.query('ROLLBACK');
            if (error instanceof AppError) {
                throw error;
            }   
            throw new AppError('Error al crear el pedido: ' + error.message, 500);
        }
    }   


}
module.exports = OrderService;