const router = require('express').Router();
const customer = require ('./customer');
const product = require ('./product');
const order = require ('./order');

router.use('/customers', customer);
router.use('/products', product);
router.use('/orders', order);

module.exports = router;