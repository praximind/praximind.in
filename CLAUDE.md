# praximind.in

Company website for Praximind Labs, live at https://praximind.in. Static Hugo site deployed to GitHub Pages by
GitHub Actions on every push to `main`.

Tracker: none. This repo has no Redmine project and no dev-playbook standards project; don't set them up or ask for them.

## Commands

```sh
npm ci                                  # install Tailwind CLI and plugins (build-time only)
npm run dev                             # theme CSS watcher + hugo server on http://localhost:1313
node scripts/themeGenerator.js          # regenerate theme CSS from data/theme.json (CI runs this before hugo)
HUGO_ENVIRONMENT=production hugo --gc --minify   # production build into public/
```

There are no tests. To check a change, run the production build and confirm it prints no `WARN` or `ERROR` lines.
Ignore the `Template ... is unused` warnings that appear only with `--printUnusedTemplates`. For visual changes,
compare headless Chrome screenshots of the local build and the live site:

```sh
hugo --gc --minify -b http://localhost:8815/ -d /tmp/site && (cd /tmp/site && python3 -m http.server 8815)
google-chrome --headless=new --hide-scrollbars --window-size=1280,3000 --screenshot=home.png http://localhost:8815/
```

## Layout

| Path | What lives there |
|---|---|
| `hugo.toml` | Site title, baseURL, outputs, `security.exec`, JS plugin list |
| `config/_default/params.toml` | Brand name (`logo_text`), legal name, CIN, contact email, SEO metadata, nav button |
| `config/_default/module.toml` | Hugo module imports and the minimum Hugo version |
| `content/english/_index.md` | All home page copy (hero, services, "why", contact) as front matter |
| `content/english/our-vision-in-action.md` | The Vision page |
| `themes/bigspring-light-hugo/layouts/` | Page templates; `index.html` renders the home page from front matter |
| `assets/css/custom.css` | The site's design system (navy/paper tokens, Open Sans) and all custom styling |
| `layouts/partials/basic-seo.html` | Project override of the vendored SEO partial (adds canonical links, controls `twitter:creator`) |
| `layouts/robots.txt` | robots.txt template |
| `static/images/` | `favicon.png` and the 1200×630 `og-image.png` share image |
| `_vendor/` | Vendored Hugo modules; no Go toolchain is needed |

The theme is a heavily customised copy of bigspring-light. Edit it in place. There is no upstream to sync with.

## Writing copy

- Write for people, not search engines. Use plain sentences and no buzzwords ("leverage", "cutting-edge",
  "transform", "solutions", "harness the power").
- The company's stance is that it uses AI where it genuinely helps and plain good engineering where it doesn't. Keep the
  copy consistent with that, and don't overclaim.
- The company has no products of its own yet. Services are product development (building software for clients) and
  AI consulting. Don't describe products that don't exist.
- Don't make up client names, results, numbers or testimonials.
- Use sentence case for buttons and labels ("Get in touch", not "Get In Touch").
- The footer shows the legal name and CIN from `params.toml`. Never add the registered office address, PAN, TAN or any
  personal details of the founder.

## Deployment

- `.github/workflows/hugo.yml` installs the pinned Hugo extended `.deb`, runs `npm ci` and the theme generator, builds
  with Hugo, and deploys with `actions/deploy-pages`.
- The build takes its baseURL from `hugo.toml`, not from the Pages action. The action's `base_url` switches to `http://`
  whenever "Enforce HTTPS" is off.
- The custom domain is set in the repo's Pages settings. `static/CNAME` is kept for reference.
- Pushing changes under `.github/workflows/` needs a token with the `workflow` scope.

## Gotchas

- Hugo 0.167+ blocks external binaries unless they are listed in `[security.exec]` in `hugo.toml`. `css.TailwindCSS`
  needs `tailwindcss` in that list, or the build fails with "not whitelisted in policy".
- The minimum Hugo version is 0.158 because the language config uses `locale` and `label`. When bumping `HUGO_VERSION`
  in the workflow, build locally with that version first.
- `@tailwindcss/typography` is required. The theme's `components.css` uses `prose` classes through `@apply`, and the
  build fails without the plugin.
- `package.json` has an `overrides` entry that forces a patched `postcss-selector-parser` for the typography plugin.
  Keep it until the plugin itself depends on 7.1.6 or newer.
- `baseof.html` caches the footer and script partials in production with `partialCached`. Anything in those partials
  that depends on the current page renders the same way on every page.
- Removing and re-adding the custom domain in Pages settings turns "Enforce HTTPS" off until GitHub issues a new
  certificate.
- Dependabot opens monthly PRs for npm and GitHub Actions. `tailwindcss` and `@tailwindcss/cli` must be upgraded
  together, or the lockfile ends up with two Tailwind versions.
