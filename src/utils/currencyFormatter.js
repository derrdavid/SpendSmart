export default function currencyFormatter(amount, locale = 'de-DE', currency = 'EUR') {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    });
  
    return formatter.format(amount);
  }