# openbitcoin.com

Source for [openbitcoin.com](https://openbitcoin.com): a bitcoin-only block
explorer, price reference, and tool collection. Built with
[Astro](https://astro.build) using the Node adapter: most pages prerender to
static HTML, and the explorer routes render server-side. The data services
behind them (the node, the address index, the price feeds) are not part of
this repository.

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
