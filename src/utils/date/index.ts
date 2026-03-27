export function getUTCDayRange(date = new Date()) {
 const y = date.getUTCFullYear();
 const m = date.getUTCMonth();
 const d = date.getUTCDate();

 const gte = new Date(Date.UTC(y, m, d, 0, 0, 0, 0));
 const lt = new Date(Date.UTC(y, m, d + 1, 0, 0, 0, 0));

  return { gte, lt };
}
