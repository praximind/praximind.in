# praximind.in

Website of **Praximind Labs (OPC) Private Limited**, live at https://praximind.in.

Hugo site (theme `bigspring-light-hugo`, modules vendored in `_vendor/`), deployed to GitHub Pages by `.github/workflows/hugo.yml` on every push to `main`.

## Run locally

```sh
npm ci
npm run dev      # theme CSS watcher + hugo server on http://localhost:1313
```

## Production build

```sh
node scripts/themeGenerator.js
hugo --gc --minify
```

Brand name, legal name and CIN live in `config/_default/params.toml`.
