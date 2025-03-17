export const formatTimeRemaining = (hours: number) => {
  if (hours < 1) {
    return `${Math.round(hours * 60)} minutes`;
  }
  if (hours < 24) {
    return `${Math.floor(hours)} hours`;
  }
  return `${Math.floor(hours / 24)} days`;
};
