const db = require('../config/db');
class Customer{
  constructor({customerId, companyName, contactName, contactTitle, address, city, region, postalCode, country, phone, fax}) {
    this.customerId = customerId;
    this.companyName = companyName;
    this.contactName = contactName;
    this.contactTitle = contactTitle;
    this.address = address;
    this.city = city;
    this.region = region;
    this.postalCode = postalCode;
    this.country = country;
    this.phone = phone;
    this.fax = fax;
  }
  static async getAll() {
    const query = 'SELECT * FROM customers';
    const result = await db.query(query);
    const rows = result.rows.map(row => new Customer({
      customerId: row.customer_id,
      companyName: row.company_name,
      contactName: row.contact_name,
      contactTitle: row.contact_title,
      address: row.address,
      city: row.city,
      region: row.region,
      postalCode: row.postal_code,
      country: row.country,
      phone: row.phone,
      fax: row.fax
    }));
    return rows;
  }
    static async getById(customerId) {
    const query = 'SELECT * FROM customers WHERE customer_id = $1';
    const result = await db.query(query, [customerId]);
    if (result.rows.length === 0) {
      return null;
    }
    const row = result.rows[0];
    return new Customer({
      customerId: row.customer_id,
      companyName: row.company_name,
      contactName: row.contact_name,
      contactTitle: row.contact_title,
      address: row.address,
      city: row.city,
      region: row.region,
      postalCode: row.postal_code,
      country: row.country,
      phone: row.phone,
      fax: row.fax
    });
  }
}
module.exports = Customer;  
