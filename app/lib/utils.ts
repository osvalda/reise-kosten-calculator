export const formatCurrency = (amount: number, locale: string = 'en-US', currency: string = 'USD') => {
  return (amount).toLocaleString(locale, {
    style: 'currency',
    currency: currency,
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
  const minutes = duration % 60;
  const hours = Math.trunc(duration / 60);
  return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;
};

export function calculateDurationFromTimeStamp(duration: string): number {
  duration = duration.trim();
  if (duration === "" || duration === "0") {
    return 0;
  }
  const [hours, minutes] = duration.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error("Invalid duration format");
  }
  if (minutes < 0 || minutes > 59) {
    throw new Error("Invalid minutes value");
  }
  if (hours < 0 || hours > 24) {
    throw new Error("Invalid hours value");
  }
  return hours * 60 + minutes;
};

export function calculateElapsedTime(start: number, end: number): number {
  if (start > end) {
    throw new Error("Start time cannot be later than end time");
  }
  if (start < 0 || end < 0) {
    throw new Error("Time values cannot be negative");
  }
  return end - start;
}

export const isNumber = (val: string): boolean => {
  const num = Number(val);
  return !isNaN(num) && val.trim() !== "";
};
