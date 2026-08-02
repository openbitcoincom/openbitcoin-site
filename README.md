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
the rich list) expect a data service on the loopback that this repository
does not include; without it they render their honest empty states.

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
