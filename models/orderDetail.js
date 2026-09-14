const db = require('../config/db');
class OrderDetail{
  constructor({id, orderId, productId, quantity, unitPrice, discount}) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.discount = discount;   
  }
  async save(client=db) {
    const query = 'INSERT INTO order_details (order_id, product_id, quantity, unit_price, discount) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [this.orderId, this.productId, this.quantity, this.unitPrice, this.discount];
    const result = await client.query(query, values);
    this.id = result.rows[0].id;
  }
}
module.exports = OrderDetail;   
