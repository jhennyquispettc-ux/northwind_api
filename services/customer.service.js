const AppError = require("../middlewares/app.error");
const Customer = require("../models/customer");

class CustomerService{
    static async getAllCustomers(){
        try {
            const customers = await Customer.getAll();
            return customers;
        } catch (error) {
            throw new AppError('Error al obtener los clientes: ' + error.message, 500);
        }
    }
}
module.exports = CustomerService;