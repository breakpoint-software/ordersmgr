export const formatDate = date => {
  if (!date) return;

  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "2-digit"
  }).format(new Date(date));
};

export const formatNumber = (number, precision) => {
  if (!number) return;

  return number.toFixed(precision);
};
