# Solenya's Hub
Static Torn City tools directory. HTML/CSS/vanilla JS, no build step, no backend, free on GitHub Pages. All data lives in `data/tools.json` (categories, tools, links).

## 1. Run locally
Browsers block `fetch` on `file://`, so serve it: `python3 -m http.server 8000` in this folder, then open http://localhost:8000 (admin: /admin/).

## 2. Create the repo
Create a new GitHub repo (e.g. `solenya-hub`), then push this folder: `git init && git add . && git commit -m "Initial" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`.

## 3. Enable GitHub Pages
Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)` → Save. The site appears at `https://<user>.github.io/<repo>/`. All paths are relative, so the repo subpath works.

## 4. Add / edit tools
Open `/admin/`, edit, click **Save tool**. Fill in forum URLs, access (Free/Premium), versions and dates; blank values show as "TBC" and are never invented. Featured order follows the list order (↑↓ buttons). Set Torn/Discord/GitHub links directly in the `links` block of `data/tools.json`.

## 5. Publish changes
Admin → **Export JSON** → replace `data/tools.json` with the downloaded file → commit and push. The site updates within a minute or two.

## 6. Future updates
Repeat step 4–5. Your browser draft persists locally; the admin banner shows whether it differs from the published file. **Reset to published** discards the draft.

## Security notes
The admin page is public and has **no authentication** — it only edits a draft in your browser (localStorage) and cannot change the live site. No tokens or secrets exist anywhere in the code. To hide it, delete the `admin/` folder from the deployed repo and keep a local copy.
