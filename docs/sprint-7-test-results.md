# Sprint 7: integration testing and accessibility pass

Status: in progress. Prepared 19 Nov 2026 for review with Stanley Kibe Njonjo.
Target standard: WCAG 2.2 level AA (project plan, Section 7).

## Schedule note

The plan schedules Sprint 7 for 10 to 14 Nov. It is being delivered the week of
17 Nov. Per Section 8 of the plan, the slippage is logged here and re-agreed
with the supervisor, not absorbed silently. Sprint 8 (performance and UAT) is
planned for 17 to 21 Nov and will move accordingly.

## How the tests are run

Automated browser tests live in `tests/e2e` (Playwright and axe-core). They run
against a production build on port 3100 and never call the real Claude API
(assistant replies are mocked and a dummy key is injected).

    npm run test:e2e          # run everything
    npm run test:e2e -- --grep "API"        # server-side checks only
    npx playwright show-report              # open the HTML report

## Results

| Area | Check | Method | Result | Date / initials |
|------|-------|--------|--------|-----------------|
| Build | All 27 routes build, types and lint clean | `npm run build`, `tsc`, `eslint` | Pass | 19 Nov |
| Contrast | Every text and background pair, light and dark | Calculated against WCAG ratios | Pass after fix F1 | 19 Nov |
| Server | Contact API validation, honeypot, bad input (5 tests) | Playwright request tests | Pass (5/5) | 19 Nov |
| Server | Assistant API limits: 500-char message, alternation, 30-turn cap, POST only (6 tests) | Playwright request tests | Pass (6/6) | 19 Nov |
| Pages | All 11 routes and 10 service pages load, one h1, title, main landmark | Playwright | Run locally: ____ | |
| Navigation | Top-right nav opens each page, current page marked, mobile menu | Playwright | Run locally: ____ | |
| Navigation | Skip link is first tab stop | Playwright | Run locally: ____ | |
| Theme | Pure white and pure black, saved choice, system default | Playwright | Run locally: ____ | |
| Forms | Contact form errors, focus, keyboard-only completion | Playwright | Run locally: ____ | |
| Assistant | Notice first, mocked reply, error and limit messages, topic pre-seeding | Playwright | Run locally: ____ | |
| Accessibility | axe WCAG 2.2 A and AA, 11 routes x light and dark, plus form errors, chat and mobile menu | Playwright and axe | Run locally: ____ | |
| Accessibility | Visible focus on every tab stop | Playwright | Run locally: ____ | |
| Accessibility | No sideways scrolling at 320 px; 200 percent text; reduced motion | Playwright | Run locally: ____ | |

## Findings fixed in this sprint

| ID | Finding | Standard | Fix |
|----|---------|----------|-----|
| F1 | White text on the bright brand red is 4.25:1, below 4.5:1. Affected five buttons: assistant start and send, assistant launcher, contact submit, Book a call | 1.4.3 Contrast | Buttons now use the darker brand red (6.4:1) |
| F2 | No way to skip the header navigation | 2.4.1 Bypass blocks | Added a skip link and `id="main"` on every page |
| F3 | Hero statistics listed the value before its label inside a definition list, which is invalid | 1.3.1 Info and relationships | Label first in the markup, same look on screen |

## Open items (not defects, need Methods Consultancy)

| ID | Item | Effect on testing |
|----|------|-------------------|
| O1 | `BOOKING_URL` in `app/lib/contact.ts` is empty: no Cal.com or Calendly link yet | The end-to-end booking flow from Sprint 6 cannot be tested. One test is marked `fixme` until the link exists |
| O2 | Enquiry email delivery is not connected (mailboxes not supplied) | The form validates and shows the thank-you message, but nothing is sent |
| O3 | Content is held in TypeScript data files, not the headless CMS in the plan (Sanity) | "Against live CMS content" cannot be tested. Record as a decision-log entry |
| O4 | Assistant evaluation set (`docs/assistant-evaluation.md`) has not been run | Unblocked now the API key works. Required before the assistant is demoed |

## Manual checks (automation cannot cover these)

| Check | Pages | Result | Date / initials |
|-------|-------|--------|-----------------|
| Keyboard only: reach and operate everything, no traps | Home, Services, Contact, Assistant | | |
| Screen reader spot check (NVDA with Chrome): headings, landmarks, form errors, chat replies announced | Home, Contact, Assistant | | |
| 200 percent browser zoom looks right | Home, Services, Contact | | |
| Real phone: menu, thumb-reachable buttons, forms | Home, Contact | | |
| Dark and light mode look correct, nothing unreadable | All pages | | |
