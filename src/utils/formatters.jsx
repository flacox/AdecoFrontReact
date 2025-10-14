  export function formatCurrency (amount, currency) {
    const formatted = new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
    return formatted.replace(/(\D)(\d)/, "$1 $2"); // añade espacio
  };