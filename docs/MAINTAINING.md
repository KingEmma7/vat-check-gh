# Maintaining VAT Check GH

A free, open-source guide to Ghana’s real-time VAT collection on foreign digital services. Search the published merchant list, check whether the collection framework fits a purchase, estimate tax in Ghana cedis, and prepare a message about a possible incorrect charge. Everything runs in the browser. There are no accounts, databases, trackers, or bank integrations.

The committed snapshot contains **92 merchant records**, from the GRA list dated **25 September 2026**, retrieved and rechecked on 24 October 2026. Its SHA-256 is recorded in `data/source-meta.json`.

> Not affiliated with GRA. Not tax or legal advice. Check official GRA guidance.

## What the sources say

The [GRA approved RTVAT FAQ](https://gra.gov.gh/wp-content/uploads/2026/10/RTVAT-Approved-FAQ.pdf) is the primary reference for the eligibility and complaint flow. Questions 14–15 include registered and unregistered suppliers and say registered providers should display VAT-exclusive prices, with VAT charged at payment. **Being on the list does not prove tax is already included in a merchant’s quoted price.** This corrects an assumption in the original product brief.

The [GRA VAT page](https://gra.gov.gh/domestic-tax/tax-types/vat/) sets out the same-base 15% VAT, 2.5% NHIL and 2.5% GETFund rates effective 1 January 2026. The app estimates those three components without compounding. Integer pesewas and rational arithmetic avoid floating-point money calculations. Rounding conventions, ambiguous cases and source conflicts are recorded in [docs/ASSUMPTIONS.md](ASSUMPTIONS.md).

Registration is a dated list lookup, not a legal determination. A missing search result may reflect an alias or a different legal entity. A 20% difference between a receipt and statement can be a normal first collection; it does not establish duplicate taxation.

## Run locally

Use Node 22.19 or later in the supported even-numbered releases (Node 24 recommended), and pnpm 9.15.9. Current PDF.js and Vitest releases require Node 22 rather than Node 20. Install the package-manager version declared in `package.json` with Corepack or your preferred installer.

```sh
pnpm install --frozen-lockfile
pnpm data:build
pnpm dev
```

The development site opens at `http://localhost:3000`. `data:build` needs internet access to the official PDF, validates the extracted rows and aliases, then writes the committed data and checksum. It fails on an unexpected layout instead of silently replacing data with an incomplete list. See [docs/DATA.md](DATA.md) for the extraction contract and refresh procedure.

| Command                          | Expected result                                                                                                                         |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install --frozen-lockfile` | Installs exactly the dependency graph in the committed lockfile.                                                                        |
| `pnpm data:build`                | Downloads and validates the official merchant PDF, regenerates merchant data and source metadata.                                       |
| `pnpm dev`                       | Serves the development app on localhost:3000.                                                                                           |
| `pnpm lint`                      | Finishes without ESLint errors or warnings.                                                                                             |
| `pnpm typecheck`                 | Finishes without TypeScript errors.                                                                                                     |
| `pnpm test`                      | Runs domain, data, alias and property tests.                                                                                            |
| `pnpm build`                     | Validates data and creates a fully static site in `out/`.                                                                               |
| `pnpm test:e2e`                  | Starts a local static server and runs browser, keyboard, accessibility and network checks. Build first and install Playwright Chromium. |
| `pnpm lighthouse`                | Runs mobile Lighthouse checks against the static export and applies the configured score thresholds.                                    |
| `pnpm data:check`                | Checks the official PDF URL and checksum. A change or retrieval failure exits unsuccessfully for review.                                |
| `pnpm start`                     | Serves the exported `out/` directory locally on port 3000.                                                                              |

For browser checks:

```sh
pnpm exec playwright install chromium
pnpm build
pnpm test:e2e
pnpm lighthouse
```

A passing CI run is evidence only for that revision and the environments it tested. Do not infer a passing Lighthouse score or native-language review from the presence of these configurations. Verification results and remaining gaps belong in the release report.

## Features

- Fuzzy, keyboard-accessible search of extracted legal names, trading names and reviewed aliases.
- A static page for every extracted merchant, with dated source links and conservative tax guidance.
- A three-question eligibility flow based on FAQ question 13.
- Inclusive and exclusive price estimates, with component totals that reconcile to the entered amount.
- A possible double-charge check and a copyable message. Messages are never submitted by the app.
- A client-generated result image that can be downloaded or shared through the device’s share sheet.
- Complete English and draft Twi for key controls and outcomes. Language changes preserve local form state.
- Self-hosted assets, static SEO metadata, sitemap and FAQ structured data.

**Twi remains a labelled draft until native-speaker review is documented.** Draft translations are identified in code. English source citations remain available in both languages. Review tax terms, ordinary Ghanaian usage and every result message with a native speaker.

Screenshots are in `docs/screenshots/`. The design contract and accessibility choices are recorded in [docs/DESIGN.md](DESIGN.md).

## Architecture and privacy

Next.js 15 App Router, React 19, TypeScript strict mode with `noUncheckedIndexedAccess`, Tailwind CSS 4, Radix primitives, Fuse.js and Zod. The build exports static HTML and assets. Scripts use `tsx` and PDF extraction; Vitest/fast-check cover domain properties, Playwright/axe cover the browser, and Lighthouse CI records mobile quality checks.

The browser does not retrieve GRA documents automatically. Links open official sources when the visitor chooses them. Source downloads happen only during maintainer data-refresh scripts. Form amounts stay in browser memory; the preferred language and offline site assets may be stored locally. The app never asks for account credentials, card details or statement uploads. See [docs/adr/001-static.md](adr/001-static.md).

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md). Propose aliases through the new-alias issue template, attach evidence connecting each brand to an exact legal entity already on the official list, and include a regression test. Multiple legal entities must remain visible as separate choices. Do not infer an alias from a similar name or treat list absence as an exemption.

Source and issue templates: [github.com/KingEmma7/vat-check-gh](https://github.com/KingEmma7/vat-check-gh). The repository and merchant issue URLs live in `lib/seo.ts`.

## Deploy

The public demo is [vat-check-gh.etagbor.workers.dev](https://vat-check-gh.etagbor.workers.dev). `wrangler.jsonc` publishes only the static `out/` export through Cloudflare Workers Static Assets. There is no Worker script, runtime secret or data binding. Directory routes retain trailing slashes; unknown routes return the exported 404 page. Version preview URLs are disabled.

After the release checks below, an authenticated maintainer can publish with the pinned CLI:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm test:worker
pnpm dlx wrangler@4.148.0 deploy
```

Use `pnpm dlx wrangler@4.148.0 dev --local` to inspect the same routing and headers locally before publication. The build generates `out/_headers` with per-page CSP hashes and common security headers. Keep that file with the export. Do not enable injected analytics, script rewriting or an SPA fallback. The host serves public assets; entered amounts remain in browser memory. Ordinary hosting access logs are separate from application data collection.

The production origin is set once in `lib/seo.ts` and drives canonical URLs, sitemap and Open Graph images. Change it before rebuilding for another host. Confirm the live home and nested merchant routes, redirects, 404 status, image MIME types, security headers and offline reload after every deployment. The generated `vercel.json` remains available for an alternative static Vercel deployment with `pnpm build` and output directory `out`.

### Release checklist

- [ ] Re-run `data:build` and update the data date before each release.
- [ ] Review the PDF checksum and diff, aliases, row count and ten randomly sampled source rows.
- [ ] Review the current GRA FAQ and rate page for changes; update assumptions and citations.
- [ ] Obtain native-speaker review of Twi strings or clearly retain the draft label.
- [ ] From a clean checkout, install the locked dependencies, regenerate data, lint, typecheck, run unit tests, build, run e2e and Lighthouse.
- [ ] Confirm mobile Performance at least 90, Accessibility 100 and SEO 100 from the produced reports.
- [ ] Walk each screen at 360px and desktop, using only the keyboard, in English and Twi.
- [ ] Check zero, half-pesewa and awkward inclusive amounts, and recompute three examples independently.
- [ ] Inspect the exported merchant pages with JavaScript disabled and verify sitemap coverage.
- [ ] Verify the production origin and public contribution links; inspect canonical and Open Graph URLs.
- [ ] Verify CSP, security headers, local-only asset requests and offline behavior on the chosen host.
- [ ] Publish a release report with merchant count, source date, checksum, test results and known gaps.

## Non-goals

No accounts, backend or database; reading SMS or bank statements; scraping banks; GRA or bank API integration; submitting complaints; analytics or third-party trackers; business VAT filing; or advice presented as official, tax or legal advice.

## Source references

- [GRA RTVAT overview](https://gra.gov.gh/rtvat/)
- [GRA approved FAQ](https://gra.gov.gh/wp-content/uploads/2026/10/RTVAT-Approved-FAQ.pdf)
- [Official merchant list dated 25 September 2026](https://gra.gov.gh/wp-content/uploads/2026/10/REGISTERED_NON-RESIDENT_MERCHANTS_UPDATED_25.9.2026.pdf)
- [GRA VAT rates and 2026 reform](https://gra.gov.gh/domestic-tax/tax-types/vat/)
- [KPMG summary, 21 October 2026](https://kpmg.com/us/en/taxnewsflash/news/2026/10/tnf-ghana-real-time-vat-collection-on-cross-border-digital-services.html)

Application code is MIT licensed. Instrument Sans is distributed under the SIL Open Font License in `public/fonts/INSTRUMENT-SANS-LICENSE.txt`. The GRA source documents are referenced as source material; the application’s MIT license does not relicense government or third-party documents.

### Distribution notices and offline updates

`pnpm build` regenerates third-party notices and a versioned offline cache. The worker saves the complete static app (HTML, route payloads, scripts, styles and fonts). An update installs and saves the new revision in the background, waits until all existing app tabs close, then activates. Source dates remain visible in saved pages. Images and external source links require a network connection. Run `pnpm test:worker` after a build to check cache isolation and update policy. See [third-party notices](THIRD_PARTY.md).

## Automatic deployment after merge

Maintainers review and merge pull requests into protected `main`. After the exact merged commit passes every required CI verification job, the separate deployment job publishes that run's static artifact. No application build or dependency lifecycle script runs with Cloudflare credentials.

The `production` GitHub environment permits only the `main` branch. Its `CLOUDFLARE_API_TOKEN` secret has Editor access to this existing Worker; `CLOUDFLARE_ACCOUNT_ID` is an environment variable. Pull-request verification has no access to that environment or token. Main protection applies to administrators; the solo maintainer can merge their own reviewed PR, so this does not promise an independent second approver.

Before publishing, the job verifies the artifact's commit, run identity and file hashes, then checks that the commit is still current `main` and belongs to a merged PR. Deployments run one at a time, with [up to 100 pending jobs retained](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency#example-queueing-multiple-pending-runs). An older CI run finishing later cannot replace a pending newer release. Older successful runs are skipped if main has advanced. The deployment is not cancelled midway by a newer CI run. A main change during the final publish can briefly leave the preceding verified revision live until the newer revision passes and deploys.

The public `/__deployment.json` marker identifies the deployed commit and CI run. After publishing, CI checks that marker, the generated home-page security headers and a real 404 response. A failed live check marks the deployment job unsuccessful; it does not silently roll back or claim the previous site is still active. The artifact is retained for seven days. To retry a failed deployment, choose **Re-run all jobs** for the eligible main commit. **Re-run failed jobs** alone cannot reuse an artifact from an earlier run attempt. Expired artifacts also require a complete rerun.

## Rollback

For a routine rollback, merge a revert PR and let its successful CI publish normally. For an emergency manual rollback, pause this repository's CI workflow in GitHub Actions and wait for all active deployment jobs to finish. An authorized maintainer can inspect `wrangler deployments list` and run `pnpm dlx wrangler@4.148.0 rollback <VERSION_ID>` from this repository, or select the verified version in the Cloudflare dashboard. Only the 100 most recent published versions are eligible. Record the chosen version and check the live marker, security headers and routes. Re-enable CI and merge the corrective PR when ready; the next successful main deployment replaces the rollback.

See [Cloudflare's rollback guide](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/) and [Worker token scopes](https://developers.cloudflare.com/workers/authorization/workers/). Hosting credentials belong in the protected environment, never in source files, browser variables or build output.
