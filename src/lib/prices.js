import data from '../data/btc-daily.json';

export const META = data.meta;
export const LAST_BAKED = data.days[data.days.length - 1][0];
export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

export function makeSeries(extraDays = []) {
  const days = extraDays.length ? [...data.days, ...extraDays] : data.days;
  const rows = days.map((d, i) => ({
    date: d[0], o: d[1], h: d[2], l: d[3], c: d[4],
    prevC: i > 0 ? days[i - 1][4] : null,
    closeOnly: d[1] === null,
  }));

  const yearsMap = new Map();
  for (const r of rows) {
    const y = r.date.slice(0, 4);
    const m = r.date.slice(5, 7);
    if (!yearsMap.has(y)) yearsMap.set(y, new Map());
    const mm = yearsMap.get(y);
    if (!mm.has(m)) mm.set(m, []);
    mm.get(m).push(r);
  }

  function summarize(list) {
    const o = list[0].o ?? list[0].c, c = list[list.length - 1].c;
    let h = -Infinity, l = Infinity;
    for (const r of list) {
      const hh = r.h ?? r.c, ll = r.l ?? r.c;
      if (hh > h) h = hh; if (ll < l) l = ll;
    }
    const base = list[0].prevC ?? o;
    return {
      open: o, close: c, high: h, low: l,
      changePct: base ? ((c - base) / base) * 100 : null, days: list.length,
      closeOnly: list.some((r) => r.closeOnly),
    };
  }

  return {
    lastDate: rows[rows.length - 1].date,
    years: () => [...yearsMap.keys()].sort(),
    yearSummary: (y) => summarize([...yearsMap.get(y).values()].flat()),
    monthsOf: (y) => [...yearsMap.get(y).keys()].sort(),
    monthRows: (y, m) => yearsMap.get(y).get(m),
    monthSummary: (y, m) => summarize(yearsMap.get(y).get(m)),
    has: (y, m) => yearsMap.has(y) && (m === undefined || yearsMap.get(y).has(m)),
  };
}

const baked = makeSeries();
export const years = baked.years;
export const yearSummary = baked.yearSummary;
export const monthsOf = baked.monthsOf;
export const monthRows = baked.monthRows;
export const monthSummary = baked.monthSummary;

export function fmtUsd(v) {
  if (v >= 1000) return v.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (v >= 1) return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return v.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
}
export function fmtPct(p) {
  if (p === null) return '';
  const s = p >= 0 ? '+' : '';
  return s + p.toFixed(Math.abs(p) >= 100 ? 0 : 1) + '%';
}
export function ordinal(n) {
  if (n % 100 >= 11 && n % 100 <= 13) return n + 'th';
  return n + (['th', 'st', 'nd', 'rd'][n % 10] || 'th');
}
export function fullDate(dateStr) {
  const y = dateStr.slice(0, 4), m = parseInt(dateStr.slice(5, 7), 10), d = parseInt(dateStr.slice(8, 10), 10);
  return `${MONTH_NAMES[m - 1]} ${ordinal(d)}, ${y}`;
}
