const validation = require('../middlewares/validation');
const createOrderValidator = require('../validators/order.validator').createOrderValidator;
const router = require('express').Router();
const OrderController = require('../controllers/order.controller');

router.get('/', OrderController.getAllOrders);  
router.get('/:id', OrderController.getOrderById);
router.post('/', createOrderValidator, validation, OrderController.createOrder);

module.exports = router;