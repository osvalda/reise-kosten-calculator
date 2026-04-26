export const formatCurrency = (amount: number) => {
  return (amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatTime = (
  time: string
) => {
  const remove_after = time.lastIndexOf(':');
  return time.substring(0, remove_after);
};

export const cutMeters = (
  dist: string
) => {
  const remove_after = dist.lastIndexOf('.');
  return dist.substring(0, remove_after);
};

export const formatDuration = (
  duration: number
) => {
  return Math.trunc(duration / 60) + ":" + duration % 60;
};
