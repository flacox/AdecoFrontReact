export function formatCurrency(amount, currency) {
  const formatted = new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
  return formatted.replace(/(\D)(\d)/, "$1 $2"); // añade espacio
}

export function formatNumber(num) {
  if (!num) return "0";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
}

export function formatFecha(fecha) {
  if (!fecha) return "Sin Fecha";
  return new Date(fecha).toLocaleDateString("es-DO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
