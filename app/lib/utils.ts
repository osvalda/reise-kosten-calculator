export const formatCurrency = (amount: number) => {
  return (amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (dateStr: string, locale: string = 'en-US') => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatTime = (time: string) => {
  const remove_after = time.lastIndexOf(':');
  return time.substring(0, remove_after);
};

export const cutMeters = (dist: string) => {
  if (dist === '' || isNumber(dist) === false) {
    return '0';
  }
  const remove_after = dist.lastIndexOf('.');
  if (remove_after === -1) {
    return dist;
  }
  let result = dist.substring(0, remove_after);
  if (result === '') {
    result = '0';
  }
  return result;
};

export const formatDuration = (duration: number) => {
  if (duration < 1) {
    duration = 0;
  }
  return Math.trunc(duration / 60) + ":" + duration % 60;
};

export const isNumber = (val: string): boolean => {
  const num = Number(val);
  return !isNaN(num) && val.trim() !== "";
};
