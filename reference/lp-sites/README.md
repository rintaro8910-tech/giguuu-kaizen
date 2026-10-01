# LP reference snapshots

The `index.html` in each directory is a local-path copy of the selected page. `source.html` is the unmodified HTML response, `assets/` contains downloaded CSS, JavaScript, images, and fonts, and `manifest.json` records the source and download failures.

| Directory | Original page |
| --- | --- |
| `haagen-dazs` (live view) | https://www.haagen-dazs.co.jp/ |
| `sunshine-autumn/` | https://sunshinecity.jp/file/official/autumn/ |
| `many-people/` | https://www.manypeople-k.com/recruit/ |
| `misignal/` | https://misignal.jp/ |
| `financial-japan/` | https://financialjapan.jp/recruit/ |
| `elixir/` | https://www.shiseido.co.jp/elixir/promotion/brightening-lotion-emulsion/ |
| `stripe/` | https://stripe.com/jp |
| `zendesk/` | https://www.zendesk.co.jp/lp/nb-support/ |

Häagen-Dazs returns HTTP 403 to command-line downloads from this environment, so its tab displays the live source page. The other pages have local HTML and assets. A few URLs supplied by the MANY PEOPLE, Financial Japan, and Elixir source pages return HTTP 404 and remain as source references; see each `manifest.json`.

Run `python3 -m http.server 8000` from the workspace root, then open `http://localhost:8000/reference/lp-sites/`. The page switches between the eight sites with tabs; its URL hash selects a site directly, for example `#zendesk`. Recreate a local snapshot with `python3 reference/mirror_sites.py <directory>`. Stripe and Zendesk have separate `mirror.py` scripts in their directories.

These are single-page captures. They include assets referenced by the initial HTML and downloaded CSS. Runtime API responses, pages reached through navigation, and browser-only lazy loads are outside the capture.
