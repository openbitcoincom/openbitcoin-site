const BACKEND = process.env.OB_BACKEND || 'http://127.0.0.1:8090/v1';

async function get(path) {
  const res = await fetch(BACKEND + path, { signal: AbortSignal.timeout(15_000) });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`backend ${res.status} for ${path}`);
  return res.json();
}

export const getBlock = (id, page = 1) => get(`/block/${id}?page=${page}`);
export const getTx = (txid) => get(`/tx/${txid}`);
export const getAddress = (addr) => get(`/address/${addr}`);
export const getAddressTxs = (addr, page = 1, dir = null) =>
  get(`/address/${addr}/txs?page=${page}${dir ? `&dir=${dir}` : ''}`);
export const getSummary = () => get('/summary');

export function classify(seg) {
  if (/^\d{1,9}$/.test(seg)) return 'height';
  if (/^[0-9a-fA-F]{64}$/.test(seg)) return /^0{8}/.test(seg) ? 'blockhash' : 'txid';
  if (/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{20,87}$/.test(seg)) return 'address';
  return null;
}

export const fmtInt = (n) => Number(n).toLocaleString('en-US');
export const fmtBtc = (sat) => (sat / 1e8).toLocaleString('en-US', {
  minimumFractionDigits: 8, maximumFractionDigits: 8,
});
export function utcStamp(unix) {
  const d = new Date(unix * 1000);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const pad = (x) => String(x).padStart(2, '0');
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()} · ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`;
}
export function utcFull(unix) {
  const d = new Date(unix * 1000);
  const pad = (x) => String(x).padStart(2, '0');
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`;
}
export function agoText(unix) {
  const s = Math.max(0, Math.floor(Date.now() / 1000) - unix);
  if (s < 90) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 90) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 36) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 550) return `${d}d ago`;
  return `${(d / 365).toFixed(1)}y ago`;
}
