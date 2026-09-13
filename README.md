# S. S. Fatimi — Author Website

A responsive static website for Professor Syed Shams-un-Nazar Fatimi (Chitral, Pakistan).

## Sections

- **Hero** — name, self-description, portrait
- **Guiding prayer** — the motto, in its extended form
- **Four pillars** — Knowledge / Thought / Character / Change
- **Forthcoming works** — the twelve-volume series, as one carousel
- **Themes in progress** — the research threads beneath the series
- **A working lexicon** — terms carried across Arabic, Persian, Urdu, Greek
- **From the notebook** — fragments from work in progress
- **A life in one pursuit** — Chitral, the Teachers' Manual, the Thinkers' Forum

## Preview locally

Open `index.html` in a browser. No installation or build step is required.

## Publish free with GitHub Pages

1. Create a new public GitHub repository.
2. Upload everything **inside this folder** to the repository root. `index.html` must remain at the root.
3. Open the repository’s **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. GitHub will display the public website URL after deployment finishes.

## Editing

- Page content: `index.html`
- Colors and layout: `styles.css`
- Book carousel content: `script.js` (the `books` array — order and text come from the author's own list)
- Images: `assets/` (book covers in `assets/books/`)

Volumes without finished cover art render a typographic cover automatically: set
`image: null` and fill in `arabic` + `tagline`.

Source material (WhatsApp exports, personal photographs, unpublished drafts) is kept
**outside** this repository and is deliberately not committed.
