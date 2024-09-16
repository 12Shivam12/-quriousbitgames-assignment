const readline = require('readline');
const Product = require('./classes/Poduct.js');
const Cart = require('./classes/Cart.js');
const Discount = require('./classes/Discount.js');
const CurrencyConverter = require('./classes/CurrencyConverter.js');
const products = require('./products.js');

const cart = new Cart();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log(`
    1. Add Item to Cart
    2. Remove Item from Cart
    3. View Cart
    4. List Discounts
    5. Checkout
    6. Exit
  `);
}

function handleUserInput() {
  rl.question('Choose an option: ', option => {
    switch (option) {
      case '1':
        addItemToCart();
        break;
      case '2':
        removeItemFromCart();
        break;
      case '3':
        cart.viewCart();
        showMenu();
        handleUserInput();
        break;
      case '4':
        console.log('Available Discounts:');
        Discount.getDiscounts().forEach(discount => {
          console.log(`${discount.type} on ${discount.category} items`);
        });
        showMenu();
        handleUserInput();
        break;
      case '5':
        checkout();
        break;
      case '6':
        rl.close();
        break;
      default:
        console.log('Invalid option');
        showMenu();
        handleUserInput();
    }
  });
}

function addItemToCart() {
  rl.question('Enter product ID and quantity: ', input => {
    const [productId, quantity] = input.split(' ');
    const product = products.find(p => p.id === productId);
    if (product) {
      cart.addToCart(product, parseInt(quantity, 10));
      console.log(`${product.name} added to cart`);
    } else {
      console.log('Invalid product ID');
    }
    showMenu();
    handleUserInput();
  });
}

function removeItemFromCart() {
  rl.question('Enter product ID and quantity to remove: ', input => {
    const [productId, quantity] = input.split(' ');
    cart.removeFromCart(productId, parseInt(quantity, 10));
    console.log(`Removed ${quantity} of ${productId} from cart`);
    showMenu();
    handleUserInput();
  });
}

function checkout() {
  const totalBeforeDiscounts = cart.getTotalBeforeDiscounts();
  const discount = Discount.applyDiscount(cart);
  const totalAfterDiscounts = totalBeforeDiscounts - discount;

  console.log(`Total before discounts: ${totalBeforeDiscounts} USD`);
  console.log(`Total discount applied: ${discount} USD`);
  console.log(`Final Total: ${totalAfterDiscounts} USD`);

  rl.question('Would you like to view it in a different currency? (yes/no): ', answer => {
    if (answer.toLowerCase() === 'yes') {
      rl.question('Enter currency (EUR, GBP): ', currency => {
        const convertedTotal = CurrencyConverter.convert(totalAfterDiscounts, currency);
        console.log(`Final Total in ${currency}: ${convertedTotal}`);
        rl.close();
      });
    } else {
      rl.close();
    }
  });
}

showMenu();
handleUserInput();
