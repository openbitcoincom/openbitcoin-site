# openbitcoin.com

Source for [openbitcoin.com](https://openbitcoin.com): a bitcoin-only block
explorer, price reference, and tool collection. Built with
[Astro](https://astro.build) using the Node adapter: most pages prerender to
static HTML, and the explorer routes render server-side. The data services
behind them (the node, the address index, the price feeds) are not part of
this repository.

## What is open and what is not

The site is this repository, and the backend pieces that produce its measured
numbers are published too:
[node-crawler](https://github.com/openbitcoincom/node-crawler) is the
reachable-node census behind /nodes, and
[address-index](https://github.com/openbitcoincom/address-index) builds the
address statistics, rich list and chain totals behind the explorer's address
pages, /rich-list and /stats. So the methodology behind every figure on the
site can be read, run and checked on your own node. What stays private is the
hosted service's operational layer: server configuration, rate limiting,
caching and abuse defenses. That is deliberate, since the site is a free
public instance with no accounts, and publishing the exact limits and how
they are enforced would be a manual for getting around them. Nothing in that
private layer changes any number; it only keeps the instance standing.

## Verify the numbers on your own node

Every measured figure on the site can be reproduced independently:

1. Run Bitcoin Core. The address index needs `getblock` verbosity 3
   (recent Core versions); the rich list needs `coinstatsindex=1` and a
   Core new enough for the version 2 `dumptxoutset` format. The crawler
   needs no special flags at all.
2. Build the address statistics and the rich list with
   [address-index](https://github.com/openbitcoincom/address-index): a full
   lifetime index of every address over RPC, and the top balances plus the
   balance distribution from a UTXO snapshot, integrity-gated against your
   own node's `coinstatsindex`.
3. Count reachable nodes with
   [node-crawler](https://github.com/openbitcoincom/node-crawler): P2P
   handshakes from your own machine, an offline IP-to-country database, and
   the same honesty rules the /nodes page states.

Each repository carries a complete standalone setup guide. If your node and
this site disagree on a number, that is worth a bug report to either side.

## Build

```
npm ci
npm run build      # dist/client (static pages) + dist/server (SSR entry)
npm run preview    # serve the build locally
```

A local build runs, but the live-data pages (the explorer, the blocks list,
the rich list, the node census) expect a data service on the loopback that
this repository does not include; without it they render their honest empty
states.

## How the numbers stay honest

Two habits run through the codebase and are worth knowing before changing
anything:

**Nothing is seeded with a made-up figure.** A page that needs live data ships
an ellipsis and paints when the real value arrives. If a fetch fails, the
placeholder stands and the page says so; it never falls back to a number that
looks current but is not.

**Facts that repeat live in one module.** The all-time high
(`src/lib/ath.js`), the issuance schedule (`src/lib/subsidy.js`) and the
fiat fallback rates (`src/lib/fx.js`) are each defined once and passed into
inline scripts with `define:vars`. Each has a companion check under
`scripts/` that the deploy runs, so the build fails if reality outruns the
constant: a new all-time high, or a halving that has already happened. Prose
that states a number in words cannot import a module, so those modules carry
a checklist of the copy to update by hand.

The five pages under `prototype/` (the homepage, the chart page, and the
block, transaction, and address views) are served verbatim by
`src/lib/proto.js`; everything else lives in `src/pages`.

## Key tools

The pages under `public/tools/offline/` are single-file, dependency-free
HTML tools meant to be downloaded and run offline. They carry their own test
vectors and a content security policy that forbids all network access. The
only vendored third-party code is
`public/js/vendor/noble-secp256k1.mjs` (MIT); the self-hosted webfonts
under `public/fonts/` (Cascadia Mono and Selawik, SIL OFL 1.1) ship with
their licences beside the files. See THIRD-PARTY-NOTICES.md.

## License

Code is [MIT](LICENSE). The OpenBitcoin name and logo, and the third-party
brand assets and images listed in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md),
are not covered by the MIT grant.
