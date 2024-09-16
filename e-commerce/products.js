const Product = require('./classes/Poduct.js');

const products = [
  new Product('P001', 'Laptop', 1000, 'Electronics'),
  new Product('P002', 'Phone', 500, 'Electronics'),
  new Product('P003', 'T-Shirt', 20, 'Fashion')
];

module.exports = products;
