const { body, validationResult } = require('express-validator');
const createOrderValidator =[
    body('customerId').notEmpty().withMessage('El ID del cliente es requerido'),
    body('orderDate').notEmpty().withMessage('La fecha del pedido es requerida'),
    body('requiredDate').notEmpty().withMessage('La fecha requerida es requerida'),
    body('shippedDate').notEmpty().withMessage('La fecha de envío es requerida'),
    body('shipVia').notEmpty().withMessage('El método de envío es requerido'),
    body('freight').notEmpty().withMessage('El flete es requerido'),
    body('shipName').notEmpty().withMessage('El nombre del envío es requerido'),
    body('shipAddress').notEmpty().withMessage('La dirección del envío es requerida'),
    body('shipCity').notEmpty().withMessage('La ciudad del envío es requerida'),
    body('shipRegion').notEmpty().withMessage('La región del envío es requerida'),
    body('shipPostalCode').notEmpty().withMessage('El código postal del envío es requerido'),
    body('shipCountry').notEmpty().withMessage('El país del envío es requerido'),
    body('orderDetails').isArray({ min: 1 }).withMessage('Se requiere al menos un detalle de pedido'),
    body('orderDetails.*.productId').notEmpty().withMessage('El ID del producto es requerido'),
    body('orderDetails.*.quantity').notEmpty().withMessage('La cantidad es requerida'),
    body('orderDetails.*.unitPrice').notEmpty().withMessage('El precio unitario es requerido'),
    body('orderDetails.*.discount').notEmpty().withMessage('El descuento es requerido')
]
module.exports = {
    createOrderValidator
};