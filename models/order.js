const db = require('../config/db');
class Order{
  constructor({orderId, customerId, employeeId, orderDate, requiredDate, shippedDate, shipVia, freight, shipName, shipAddress, shipCity, shipRegion, shipPostalCode, shipCountry}) {
    this.orderId = orderId;
    this.customerId = customerId;
    this.employeeId = employeeId;
    this.orderDate = orderDate;
    this.requiredDate = requiredDate;
    this.shippedDate = shippedDate;
    this.shipVia = shipVia;
    this.freight = freight;
    this.shipName = shipName;
    this.shipAddress = shipAddress;
    this.shipCity = shipCity;
    this.shipRegion = shipRegion;
    this.shipPostalCode = shipPostalCode;
    this.shipCountry = shipCountry;
  }
  static async getAll() {
    const query = 'SELECT * FROM orders';
    const result = await db.query(query);
    const rows = result.rows.map(row => ({
      orderId: row.order_id,
      customerId: row.customer_id,
      employeeId: row.employee_id,
      orderDate: row.order_date,
      requiredDate: row.required_date,
      shippedDate: row.shipped_date,
      shipVia: row.ship_via,
      freight: row.freight,
      shipName: row.ship_name,
      shipAddress: row.ship_address,
      shipCity: row.ship_city,
      shipRegion: row.ship_region,
      shipPostalCode: row.ship_postal_code,
      shipCountry: row.ship_country
    }));
    return rows;
  }
  static async getById(orderId) {
    const query = 'SELECT * FROM orders WHERE order_id = $1';
    const result = await db.query(query, [orderId]);

    if (result.rows.length === 0) {
      return null;
    }
    const detailsQuery = 'SELECT order_details.*, products.product_name FROM order_details INNER JOIN products ON order_details.product_id = products.product_id WHERE order_id = $1';
    const detailsResult = await db.query(detailsQuery, [orderId]);
    const orderDetails = detailsResult.rows.map(row =>({ 
        productId: row.product_id,
        quantity: row.quantity,
        unitPrice: row.unit_price,
        productName: row.product_name
    }));
    return ({
      orderId: result.rows[0].order_id,
      customerId: result.rows[0].customer_id,
      employeeId: result.rows[0].employee_id,
      orderDate: result.rows[0].order_date,
      requiredDate: result.rows[0].required_date,
      shippedDate: result.rows[0].shipped_date,
      shipVia: result.rows[0].ship_via,
      freight: result.rows[0].freight,
      shipName: result.rows[0].ship_name,
      shipAddress: result.rows[0].ship_address,
      shipCity: result.rows[0].ship_city,
      shipRegion: result.rows[0].ship_region,
      shipPostalCode: result.rows[0].ship_postal_code,
      shipCountry: result.rows[0].ship_country,
      orderDetails: orderDetails
    }) ;
  }
  async save(client=db) {
    const query = `INSERT INTO orders (customer_id, employee_id, order_date, required_date, shipped_date, ship_via, freight, ship_name, ship_address, ship_city, ship_region, ship_postal_code, ship_country) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING order_id`;
    const values = [this.customerId, this.employeeId, this.orderDate, this.requiredDate, this.shippedDate,
                    this.shipVia, this.freight, this.shipName, this.shipAddress,
                    this.shipCity, this.shipRegion, this.shipPostalCode,
                    this.shipCountry];
    const result = await client.query(query, values);
    this.orderId = result.rows[0].order_id; 

  }
}

module.exports = Order; 
