import daily from '../data/btc-daily.json';

export function monthlyAverages() {
  const acc = new Map(); // ym -> { sum, n }
  for (const row of daily.days) {
    const close = row[4];
    if (close == null) continue;
    const ym = row[0].slice(0, 7);
    const e = acc.get(ym) || { sum: 0, n: 0 };
    e.sum += close;
    e.n += 1;
    acc.set(ym, e);
  }
  const yms = [...acc.keys()].sort();
  if (yms.length && acc.get(yms[yms.length - 1]).n < 15) yms.pop();
  return yms.map((ym) => {
    const { sum, n } = acc.get(ym);
    const avg = sum / n;
    return { ym, avg: Number(avg.toFixed(avg < 1 ? 4 : 2)) };
  });
}

export function recentCloses(n) {
  const days = daily.days, out = [];
  for (let i = days.length - 1; i >= 0 && out.length < n; i--) {
    const c = days[i][4];
    if (typeof c === 'number' && c > 0) out.push({ date: days[i][0], usd: c });
  }
  return out.reverse();
}

export function lastClose() {
  const days = daily.days;
  for (let i = days.length - 1; i >= 0; i--) {
    const c = days[i][4];
    if (typeof c === 'number' && c > 0) return { usd: c, date: days[i][0] };
  }
  return null;
}
