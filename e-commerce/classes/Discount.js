class Discount {
    static getDiscounts() {
      return [
        { type: 'Buy 1 Get 1 Free', category: 'Fashion' },
        { type: '10% Off', category: 'Electronics' }
      ];
    }
  
    static applyDiscount(cart) {
      let totalDiscount = 0;
  
      cart.items.forEach(item => {
        if (item.product.category === 'Fashion' && item.quantity >= 2) {
          totalDiscount += item.product.price * Math.floor(item.quantity / 2); // Buy 1 Get 1 Free
        } else if (item.product.category === 'Electronics') {
          totalDiscount += (item.product.price * item.quantity) * 0.1; // 10% Off on Electronics
        }
      });
  
      return totalDiscount;
    }
  }
  
  module.exports = Discount;
  