export const NSRC = {
  'Reuters': ['REUTERS', '#FA6400'],
  'The Block': ['THE BLOCK', '#1A1A1A'],
  'CoinDesk': ['COINDESK', '#E9A400'],
  'Bitcoin Magazine': ['BITCOIN MAG', '#C8352C'],
  'GitHub': ['GITHUB', '#24292E'],
  'BITCOIN MAG': ['BITCOIN MAG', '#C8352C'],
  'COINDESK': ['COINDESK', '#E9A400'],
  'COINTELEGRAPH': ['COINTELEGRAPH', '#FABF2D'],
  'DECRYPT': ['DECRYPT', '#0F1013'],
  'BLOCKWORKS': ['BLOCKWORKS', '#5637CD'],
};

export const inkFor = (hex) => {
  const v = parseInt(hex.slice(1), 16);
  const lum = (0.299 * ((v >> 16) & 255) + 0.587 * ((v >> 8) & 255) + 0.114 * (v & 255)) / 255;
  return lum > 0.45 ? '#161310' : '#FFFFFF';
};

export const NSRC_INK = Object.fromEntries(
  Object.entries(NSRC).map(([k, [label, bg]]) => [k, [label, bg, inkFor(bg)]]));
