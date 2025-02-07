function dateComparator(dateA, dateB) {
  // Function to convert date string to Date object
  const parseDate = (dateString) => {
    if (!dateString || typeof dateString !== "string") return null;
    return new Date(dateString);
  };

  // Convert strings to Date objects
  const parsedDateA = parseDate(dateA);
  const parsedDateB = parseDate(dateB);

  // If one of the dates is invalid, consider it "less"
  if (!parsedDateA) return -1;
  if (!parsedDateB) return 1;

  // Compare timestamps
  return parsedDateA.getTime() - parsedDateB.getTime();
}

function priceComparator(priceA, priceB) {
  // Get numeric value from price object
  const extractPrice = (priceObj) => {
    if (!priceObj || typeof priceObj.price !== "string") return 0;
    return parseFloat(priceObj.price.replace(/[$,]/g, ""));
  };

  // Get numeric values from price objects
  const numericPriceA = extractPrice(priceA);
  const numericPriceB = extractPrice(priceB);

  // Compare numeric values
  if (numericPriceA === numericPriceB) {
    return 0;
  }
  return numericPriceA > numericPriceB ? 1 : -1;
}

export { dateComparator, priceComparator };