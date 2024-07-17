export const formatDate = (timestamp: string): string => {
  const today = new Date(timestamp);
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  return `${year}.${month > 10 ? month : month + 1}.${date}`;
};

export const formatTime = (value: number) => {
  const totalSeconds = value / 1000;
  const totalMinutes = totalSeconds / 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours > 0 ? `${hours}시간` : ''} ${minutes}분`;
};
