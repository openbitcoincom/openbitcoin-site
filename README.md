# openbitcoin.com

Source for [openbitcoin.com](https://openbitcoin.com): a bitcoin-only block
explorer, price reference, and tool collection. Static pages are built with
[Astro](https://astro.build); the explorer data services run server-side and
are not part of this repository.

## Build

```
npm ci
npm run build      # static site into dist/
npm run preview    # serve dist/ locally
```

The five pages under `prototype/` (homepage and the explorer views) are
served verbatim by `src/lib/proto.js`; everything else lives in
`src/pages`.

## Key tools

The pages under `public/tools/offline/` are single-file, dependency-free
HTML tools meant to be downloaded and run offline. They carry their own test
vectors and a content security policy that forbids all network access. The
only vendored third-party code in the project is
`public/js/vendor/noble-secp256k1.mjs` (MIT, see THIRD-PARTY-NOTICES.md).

## License

Code is [MIT](LICENSE). The OpenBitcoin name and logo, and the third-party
brand assets and images listed in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md),
are not covered by the MIT grant.
