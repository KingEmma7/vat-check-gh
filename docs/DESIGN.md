# VAT Check GH: single-purpose instrument

The interface follows a single centered column, at most 480px wide including its 24px inner padding. Only the product name appears above the primary input. Navigation and language controls follow the working area.

Use Instrument Sans at weights 400 and 600. Monetary figures use tabular numerals; the answer is 56px. Spacing follows an 8px scale. The answer is followed by a plain receipt showing the rate, base, component tax amounts and total.

The page background is `#F7F5F0`, text is `#1A1A1A`, and the only accent is `#B42318` for the confirmed “VAT applies” eligibility outcome. Registration status stays neutral. The requested muted `#75716A` is used for a placeholder on a white input, where it meets AA contrast. Small text on the paper background uses the primary ink because the requested muted color there has a 4.455:1 contrast ratio, below AA.

No eyebrow labels, decorative numbered steps, arrow calls to action, green or teal accents, gradients, glass effects, glow, blobs, pill badges, decorative feature cards, logo rows, testimonials, emoji, sparkle icons, stock illustrations or invented statistics. There are no shadows. Functional radio controls and a neutral progress indicator remain accessible.

Loading and error boundaries cover navigation. Search, calculation, comparison, clipboard and image-sharing flows provide relevant empty, pending and failure feedback. Synchronous calculations do not use an artificial loading delay.

Before release, capture every route and the important input/result states at desktop and 360px, review the images against these restrictions, then run the accessibility and functional browser checks. Include the generated share image in that review.

## Keyboard walkthrough: eligibility and calculator

Checked in local Playwright Chromium (`Desktop Chrome` at 1280×720 and `mobile-360` at 360×800) against `/apply/` and `/calculator/`. These steps record observed browser keyboard behavior only and do not claim native screen-reader certification.

### Eligibility questions (`/apply/`)

1. Press `Tab` to focus `Skip to content` and press `Enter` to move focus to `#main` (or press `Tab` past the `VAT Check GH` header link).
2. Press `Tab` to enter the current question’s radio group (`Yes`, `No`, `I’m not sure`). When no option is selected yet, focus lands on `Yes`; use `ArrowDown`/`ArrowRight` or `ArrowUp`/`ArrowLeft` to move between choices (which also selects the focused radio in Chromium) or press `Space` to select the focused option.
3. Press `Tab` to leave the fieldset. On step 1 (`Back` disabled), focus lands directly on `Next`. On steps 2 and 3, `Tab` focuses `Back` first and a second `Tab` focuses `Next` (or `See my result` on step 3). Press `Enter` or `Space` to advance; focus moves to the polite live region (`div[tabindex="-1"][aria-live="polite"]`), so the next `Tab` enters the new question’s radio group.
4. **Returning to an earlier question:** From the radio group, press `Tab` to focus `Back` (or from `Next` / `See my result`, press `Shift+Tab` to move back to `Back`, or `Shift+Tab` again to re-enter the current radio group) and press `Enter` or `Space`. Focus resets to the live container with the previous answer preserved; pressing `Tab` focuses the previously selected radio option so it can be changed with the arrow keys.
5. On the result view, pressing `Tab` moves through the `GRA FAQ` source link, `Start again` (`Enter` or `Space` resets to step 1 and focuses the live container), and the `Estimate the tax` link to `/calculator/`.

### Inclusive and exclusive calculator (`/calculator/`)

1. Press `Tab` to focus `Skip to content`, press `Enter`, then press `Tab` to focus `Amount in Ghana cedis` (`#amount`), which defaults to a synthetic `100` (`GH₵100.00`).
2. With `100` entered in the default `Tax added on top` (`exclusive`) mode, the live receipt (`aria-live="polite"`) immediately shows a `GH₵100.00` price before tax, `GH₵15.00` VAT (15%), `GH₵2.50` NHIL (2.5%), `GH₵2.50` GETFund (2.5%), `GH₵20.00` total tax (20%), and `GH₵120.00` total.
3. Press `Tab` to move into the `How tax is included` toggle group (`role="radiogroup"`), landing on the active `Tax added on top` radio button. Use `ArrowRight`/`ArrowDown` or `ArrowLeft`/`ArrowUp` to move focus to `Price already includes tax`, then press `Space` or `Enter` to activate it (entering `120` in inclusive mode reconciles back to the `GH₵100.00` before-tax base, or keeping `100` shows a `GH₵83.33` base and `GH₵16.67` combined tax).
4. **Returning to an earlier field:** From the `How tax is included` toggle group, press `Shift+Tab` once to return focus directly to `Amount in Ghana cedis` and type a new figure. From `Copy result`, press `Shift+Tab` once to return to the active mode toggle item, or `Shift+Tab` twice to return to `Amount in Ghana cedis`.
5. From the mode toggle group, press `Tab` to focus `Copy result` and press `Enter` or `Space` to copy the plain-text breakdown (`Copied` is announced in the status region).

