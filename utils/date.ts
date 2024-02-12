export const toLocaleDate = (prevDate: Date | undefined) => {
  const today = new Date();
  const milliseconds = (prevDate ?? today).getTime();
  // 9시간 27분 정도 차이나는 듯.
  const newDate = new Date(milliseconds + (9 * 60 + 27) * 60 * 1000);
  const localeDate = newDate.toISOString().split("T")[0];
  return localeDate;
};
