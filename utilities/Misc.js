export function addCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function invoicesMessage(num, filter) {
  if (num === -1) {
    return "# fatura total";
  } else if (num === 0 && !filter) {
    return "Nuk ka fatura.";
  } else if (num === 0 && filter) {
    return `Nuk ka fatura ${filter}.`;
  } else if (num === 1 && !filter) {
    return "Eshte vetem 1 fature.";
  } else if (num === 1 && filter) {
    return `Eshte vetem 1 fature ${filter}.`;
  } else if (!filter) {
    return `${num > 99 ? "+99" : num} fatura total.`;
  } else {
    return `${num > 99 ? "+99" : num} fatura ${filter} ne total.`;
  }
}

export function getJson(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}
