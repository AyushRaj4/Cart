export const getTotals = (cart) => {
//   console.log(cart);
  let totalAmount = 0;
  let totalCost = 0;

  for (let {price, amount} of cart.values()) {
    totalAmount += amount;
    totalCost += parseFloat(price) * amount;
  }
  return { totalAmount, totalCost: totalCost.toFixed(2) };
};
