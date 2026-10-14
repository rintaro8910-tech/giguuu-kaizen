# Founder editorial implementation — 2026-10-14

Scope: `index.html#founder` and `founder.css`. This report covers the selected founder concept only. The prior accompaniment-section report is preserved in `output/founder-editorial/prior-design-qa.md`; its earlier limitations have not been re-audited.

## Visual evidence

- Source visual truth: `output/founder-editorial/reference.png`, 1604 × 980 pixels, first displayed Image Gen option selected by the user.
- Browser-rendered implementation: `output/founder-editorial/desktop-final.jpg`, 1604 × 1100 pixels. In-app browser, viewport 1604 × 1100 CSS pixels, devicePixelRatio 1.
- Full-view combined comparison: `output/founder-editorial/comparison.png`.
- Focused headline, biography and records comparison: `output/founder-editorial/comparison-detail.png`.
- Mobile captures: `output/founder-editorial/mobile-top.jpg`, `mobile-metrics.jpg` and `mobile-body.jpg`, 390 × 900 pixels/CSS pixels, devicePixelRatio 1.
- State: main navigation closed, founder section scrolled into view, four records present, source portrait loaded at natural width 1191px.
- Normalization: both desktop captures use the same viewport width. Crop out the existing sticky navigation and section padding; scale source/implementation content regions to the same 670px comparison width. Preserve the established 1240px content container rather than extending this section to the approximately 1400px mock container. The narrower real-site container is intentional integration with adjoining sections, not a density mismatch.
- Capture limitation: direct DOM screenshots return a blank image on this localhost surface. Native browser captures successfully show the page but are compressed and visibly softer than the source PNG. Layout and hierarchy were visually compared, and actual text, font sizes, colors, intrinsic image size and overflow were additionally inspected through the rendered DOM. Exact antialiasing is not asserted.

## Comparison history

1. First combined comparison (`comparison-first.png`): [P2] heading/metric/origin typography was less prominent than the chosen concept. Increased desktop title 48→56px, lead 21→24px, record heading 16→18px, labels 14→15px, number maximum 42→46px and origin heading maximum 34→38px. Kept mobile-specific readable sizes.
2. Re-captured at the same viewport/state and inspected the full-view and focused comparison together. Added the source biography paragraph break on wide desktop while allowing natural wrapping below 1200px. Final combined captures show the intended photo-left, text-right hierarchy, four borderless metrics, teal current-work rule and two-column origin message. No actionable P0/P1/P2 findings remain.

## Required fidelity surfaces

- Fonts/typography: existing local Noto Sans JP headings/body and Space Grotesk numbers/English. Rendered desktop title 56px/900, lead 24px/700, metrics 46px/700. Source hierarchy retained; paragraph and heading breaks adapt to the real container. Mobile title stays on one line at 390px; body remains 15px with 1.9 line height.
- Spacing/layout rhythm: portrait 360px, 56px desktop column gap; aligned four-record strip; origin separated by a thin top rule and divided into two columns. The surrounding site's shared section padding and 1240px width are retained. At narrow widths the portrait/copy stack, metrics become 2 × 2 and origin stacks.
- Colors/tokens: shared --rf-heading #0a2a44, --rf-accent #007d8c, --rf-text #34424e, --rf-border #d8e8ec on white. No dark filled boxes, card shadows or decorative icon surfaces in the redesigned section.
- Image quality/assets: reuse the existing original portrait `assets/founder/founder-portrait-ai.png`; natural ratio 1191/1320, no new raster approximation. Face, pose, hands and identity match the source. Photo remains square-cornered.
- Copy/content: retained the name/role, biography, all four exact activity/product/count associations, current operating statement and complete origin message as selectable HTML. Decorative handwritten note and explanatory record-note removed to match the selected mock. Record group has a real h3 and aria-labelledby list; portrait retains descriptive alt text.

## Verification

- Browser rendered DOM inspected at 1604, 1024, 768, 390 and 320 CSS pixels: no document horizontal overflow. The 1604/1024/320 checks also found no founder elements outside the viewport; record numbers fit their allotted widths.
- Visually inspected desktop and mobile photo, record and origin views. Mobile adaptations are inferred from the selected desktop concept; no mobile mock was supplied.
- Desktop “私たちについて” navigation tested. Mobile menu open, founder navigation and automatic menu close tested.
- In-app browser console error log: empty after the final capture.
- `git diff --check` passes. Existing unrelated workspace changes retained.
- No new runtime/dependencies or behavioral test suite needed for this static section redesign.

## Follow-up polish

P3: generated reference typography and the site's actual font rendering differ slightly; native capture compression prevents a pixel-level antialiasing verdict. The selected composition, hierarchy, palette and content are implemented. Unrelated page sections are outside this report.

final result: passed
