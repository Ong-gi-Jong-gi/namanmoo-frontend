export const formatDate = (timestamp: string): string => {
  const today = new Date(timestamp);
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  return `${year}.${month > 10 ? month : month + 1}.${date}`;
};
