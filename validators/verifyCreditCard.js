function isValidCreditCardNumber(cardNumber) {
  cardNumber = cardNumber.replace(/\s/g, '');
  if (!/^\d+$/.test(cardNumber)) {
    return false;
  }
  const digits = cardNumber.split('').map(Number);
  digits.reverse();
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let digit = digits[i];
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

// Exemplo de uso:
const cardNumber = "1234 5678 9012 3456";
if (isValidCreditCardNumber(cardNumber)) {
  console.log("O número do cartão é válido.");
} else {
  console.log("O número do cartão não é válido.");
}
