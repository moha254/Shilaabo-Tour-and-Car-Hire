export function calculateTotalPrice(pricePerDay: number, startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Calculate the difference in days
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Minimum of 1 day
  const days = Math.max(1, diffDays);
  
  return pricePerDay * days;
}
