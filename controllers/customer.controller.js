const AppError = require('../middlewares/app.error');
const CustomerService = require('../services/customer.service');
class CustomerController {
  static async getAllCustomers(req, res) {
    try {
      const customers = await CustomerService.getAllCustomers();
      res.json(customers);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}
module.exports = CustomerController;
