class CurrencyConverter {
    static convert(amount, currency) {
      const rates = {
        EUR: 0.85,
        GBP: 0.75
      };
  
      return amount * (rates[currency] || 1); // Fallback to USD if currency is not supported
    }
  }
  
  module.exports = CurrencyConverter;
  