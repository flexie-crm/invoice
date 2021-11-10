export function addCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function invoicesMessage(num, filter) {
  if (num === 0 && !filter) {
    return "Nuk ka fatura.";
  } else if (num === 0 && filter) {
    return `Nuk ka fatura ${filter}.`;
  } else if (num === 1 && !filter) {
    return "Eshte vetem 1 fature.";
  } else if (num === 1 && filter) {
    return `Eshte vetem 1 fature ${filter}.`;
  } else if (!filter) {
    return `${num} ne fatura total.`;
  } else {
    return `${num} fatura ${filter} ne total.`;
  }
}
