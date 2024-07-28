const timezoneOffset = new Date().getTimezoneOffset() * 60000;
export const getHTMLFormattedTime = (date: Date) => {
  return new Date(date.getTime() - timezoneOffset).toISOString().split("T")[0];
};
