# VAT Check GH

Search Ghana’s published digital-services merchant list, estimate VAT in cedis, and check the guidance for a possible incorrect charge. This free static app runs in your browser, with no accounts, trackers or bank integration.

**[Open the live demo](https://vat-check-gh.etagbor.workers.dev)**

**Independent and unofficial. Not tax or legal advice.** Registration does not prove that tax is included in a quoted price. Confirm your payment against the [official GRA guidance](https://gra.gov.gh/rtvat/).

![VAT Check GH search screen](docs/screenshots/home-desktop.png)

## Run locally

Use Node 22.19+ (Node 22 LTS is tested) and pnpm 9.15.9.

```sh
git clone https://github.com/KingEmma7/vat-check-gh.git
cd vat-check-gh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. The repository includes a dated merchant snapshot, so a data refresh is optional for local use. To serve a production build, run `pnpm build` followed by `pnpm start`.

## Use the checker

- Search a service or legal name, then check the listed entity and source date.
- Use the eligibility questions for a purchase or the calculator for an inclusive/exclusive estimate.
- Compare a possible duplicate charge and prepare a message to your payment provider. The app does not submit it.
- Download a result image or use the device share sheet where supported.

Amounts stay in browser memory. Language preference and offline app assets may be saved on your device. English is complete; Twi is a labelled draft awaiting native-speaker review.

## Data and limits

The snapshot contains **92 merchants** from the GRA list dated **25 September 2026**, checked on **24 October 2026**, with primary evidence for **32 aliases**. The reviewed rates are 15% VAT, 2.5% NHIL and 2.5% GETFund on the same taxable base. Search results and estimates cannot determine your account’s contracting entity, refund entitlement or bank charges.

Read the [source and rounding assumptions](docs/ASSUMPTIONS.md), [alias evidence](docs/ALIASES.md) and [verification record](docs/VERIFICATION.md). Offline pages retain their source date and may become stale.

## Report a problem or contribute

Use an [issue template](https://github.com/KingEmma7/vat-check-gh/issues/new/choose) for bugs, feature requests, merchant corrections or aliases. Include public source evidence for tax or merchant claims. Never attach real statements, account details or payment credentials.

Start with a [good first issue](https://github.com/KingEmma7/vat-check-gh/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22), then follow [CONTRIBUTING.md](CONTRIBUTING.md). Focused documentation, accessibility and tested data improvements are welcome. Report vulnerabilities [privately](https://github.com/KingEmma7/vat-check-gh/security/advisories/new); see [SECURITY.md](SECURITY.md) and the [code of conduct](CODE_OF_CONDUCT.md).

## Development and maintenance

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:worker
pnpm exec playwright install chromium
pnpm test:e2e
pnpm lighthouse
```

[Maintenance and hosting](docs/MAINTAINING.md) covers all commands, release checks, architecture and static hosting. [Data maintenance](docs/DATA.md) explains `pnpm data:build` and `pnpm data:check`. A data build downloads the official PDF and fails on an unexpected layout.

Code is [MIT licensed](LICENSE). Font and dependency terms are retained in [third-party notices](docs/THIRD_PARTY.md). The code licence does not relicense GRA documents.
