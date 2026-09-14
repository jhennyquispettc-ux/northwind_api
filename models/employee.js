const db = require('../config/db');
class Employee{
    constructor({employeeId, firstName, lastName, birthDate, hireDate}) {
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.hireDate = hireDate;
    }
    static async getById(employeeId) {
        const query = 'SELECT * FROM employees WHERE employee_id = $1';
        const result = await db.query(query, [employeeId]);
        if (result.rows.length === 0) {
            return null;
        }
        return new Employee({
            employeeId: result.rows[0].employee_id,
            firstName: result.rows[0].first_name,
            lastName: result.rows[0].last_name,
            birthDate: result.rows[0].birth_date,
            hireDate: result.rows[0].hire_date
        });
    }
}
module.exports = Employee;