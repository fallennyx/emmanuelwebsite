# emmanuelakanmu — akanmutech.com

Personal website for Emmanuel Akanmu. Space / multiverse theme with a live WebGL
"wormhole nebula" background. Built with [Astro](https://astro.build) + Markdown,
deployed on Netlify.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # serve the production build
```

## Adding content

Everything lives in one collection. Create `src/content/archive/my-thing.md`:

```md
---
title: "My thing"
date: 2026-06-23
summary: "One-line description."
category: writing       # writing | project | research
status: shipped         # shipped | building | archived
# repo: https://github.com/you/thing   # projects link out to GitHub
# file: /archive/files/thing.pdf       # uploads open the document
tags: ["tag"]
draft: false
---

Body in Markdown (used for writing/research that render their own page).
```

How the card links, by what you provide:

- `repo:` set → card links out to GitHub (use for **projects**)
- `file:` set → card opens the document (drop the file in `public/archive/files/`)
- neither → card links to a rendered page at `/archive/<slug>` (use for **writing**/**research** with a written body)

The filter on `/archive` narrows by `category` (Writing / Projects / Research).

## Structure

```
src/
  components/   Cosmos (WebGL shader), Nav, EntryCard
  layouts/      Base — backdrop + nav + footer
  content/      archive/*.md   (one collection)
  pages/        index, about, archive/ (index + [slug])
  styles/       global.css
public/         favicon, archive/files/ (uploaded docs)
```

## Deploy (Netlify)

Connect the GitHub repo to Netlify. Build settings are in `netlify.toml`
(`npm run build` → publish `dist`). Point the `akanmutech.com` domain at the site.
