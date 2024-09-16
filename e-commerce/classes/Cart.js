class Cart {
    constructor() {
      this.items = [];
    }
  
    addToCart(product, quantity = 1) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ product, quantity });
      }
    }
  
    removeFromCart(productId, quantity = 1) {
      const existingItem = this.items.find(item => item.product.id === productId);
      if (existingItem) {
        existingItem.quantity -= quantity;
        if (existingItem.quantity <= 0) {
          this.items = this.items.filter(item => item.product.id !== productId);
        }
      }
    }
  
    viewCart() {
      console.log('Your Cart:');
      this.items.forEach(item => {
        console.log(
          `${item.product.name} - Quantity: ${item.quantity}, Price: ${item.product.price} USD, Total: ${item.product.price * item.quantity} USD`
        );
      });
    }
  
    getTotalBeforeDiscounts() {
      return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
  }
  
  module.exports = Cart;
  