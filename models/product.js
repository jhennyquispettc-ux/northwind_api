const db = require('../config/db');
class Product {
  constructor({productId, productName, supplierId, categoryId, quantityPerUnit, unitPrice, unitsInStock, unitsOnOrder, reorderLevel, discontinued}) {
    this.productId = productId;
    this.productName = productName;
    this.supplierId = supplierId;
    this.categoryId = categoryId;
    this.quantityPerUnit = quantityPerUnit;
    this.unitPrice = unitPrice;
    this.unitsInStock = unitsInStock;
    this.unitsOnOrder = unitsOnOrder;
    this.reorderLevel = reorderLevel;
    this.discontinued = discontinued;
  }
  static async getAll() {
    const query = 'SELECT * FROM products';
    const result = await db.query(query); 
    const rows = result.rows.map(row => new Product({
      productId: row.product_id,
      productName: row.product_name,
      supplierId: row.supplier_id,
      categoryId: row.category_id,
      quantityPerUnit: row.quantity_per_unit,
      unitPrice: row.unit_price,
      unitsInStock: row.units_in_stock,
      unitsOnOrder: row.units_on_order,
      reorderLevel: row.reorder_level,
      discontinued: row.discontinued
    }));
    return rows;
  }
  static async getById(productId) {
    const query = 'SELECT * FROM products WHERE product_id = $1';
    const result = await db.query(query, [productId]);
    if (result.rows.length === 0) {
      return null;
    }
    const row = result.rows[0];
    return new Product({
      productId: row.product_id,
      productName: row.product_name,
      supplierId: row.supplier_id,
      categoryId: row.category_id,
      quantityPerUnit: row.quantity_per_unit,
      unitPrice: row.unit_price,
      unitsInStock: row.units_in_stock,
      unitsOnOrder: row.units_on_order,
      reorderLevel: row.reorder_level,
      discontinued: row.discontinued
    });
  }
}
module.exports = Product;   