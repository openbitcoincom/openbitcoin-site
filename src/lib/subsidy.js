export const EPOCH = 210_000;
export const MAX_BTC = 21_000_000;
export const DAY_BLOCKS = 144;

export const SUBSIDY_BTC = 3.125;              // current epoch (since block 840,000)
export const NEXT_HALVING_HEIGHT = 1_050_000;  // the fifth halving
export const SUBSIDY_DAY_BTC = SUBSIDY_BTC * DAY_BLOCKS; // 450

export function subsidyAt(h) {
  let sub = 50;
  for (let e = Math.floor(h / EPOCH); e > 0; e--) sub /= 2;
  return sub;
}

export function supplyAt(h) {
  let s = 0, sub = 50;
  for (let e = 0; ; e++) {
    const start = e * EPOCH;
    if (h <= start) break;
    s += Math.min(h - start, EPOCH) * sub;
    sub /= 2;
  }
  return s;
}
