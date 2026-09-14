const router = require('express').Router();
const CustomerController = require('../controllers/customer.controller');     
router.get('/', CustomerController.getAllCustomers);
module.exports = router;