class OrderDto{
  constructor({orderId, customerId, employeeId, orderDate, requiredDate, shippedDate, shipVia, freight, shipName, shipAddress, shipCity, shipRegion, shipPostalCode, shipCountry, orderDetails}) {
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
    this.orderDetails = orderDetails;
  }
}
class OrderDetailDto{
  constructor({productId, quantity, unitPrice, productName}) {
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.productName = productName;
  }
}
module.exports = OrderDto;