## Developer Ecosystem workflow (read first)

This repo belongs to a Developer Ecosystem pod (DevEx: MCP, CLI, SDK, Starters including the SAP connector; Marketplace; Mkt Apps; Developer Hub).
New features and changes go through the deveco workflow before any code is written here:

1. Find the work's DSCDX idea and where it is in the flow. No idea yet: write one with the `brief` skill in `contentstack/product-wiki`.
2. The PRD, TRD, test cases, tickets and code come from your own routines (PM, Architect, QA agent, Dev), gate by gate. Do not plan, draft or build them in this session. No routine for a step yet: set it up with the `deveco-aisdlc-onboarding` skill in `contentstack/agent-skills`.
3. The order, gates and intake: https://github.com/contentstack/agent-skills/blob/main/skills/deveco-aisdlc-onboarding/references/run-protocol.md

Bug fixes and support cases keep this repo's usual path. Not sure which applies? Ask before building.

## This repo

Highlight: a Contentstack JSON RTE plugin (not an iframe app, no router, no manifest, no SDK init). A webpack bundle `dist/highlight.js` (v1.0.2, React 16) built with `@contentstack/app-sdk` `PluginBuilder`; it wraps selected text in `span.highlight` (pale yellow). Plugin id `highlight`, title "Highlight", element type `text`, shown in `toolbar` and `hoveringToolbar`. Wiki: `marketplace-apps/highlight/` in `contentstack/product-wiki` if present.

| Task      | Command (Node >=18; CI uses 24)                                                    |
| --------- | ---------------------------------------------------------------------------------- |
| Install   | `npm ci`                                                                           |
| Run local | `npm start` (https://localhost:1268/highlight.js; loads only inside Contentstack RTE) |
| Lint      | `npm run lint` (TSLint)                                                            |
| Unit test | `npm test` · `npm run test:coverage` (fails under 90%)                             |
| Build     | `npm run build` (output `dist/highlight.js`, git-ignored)                          |

- Tests are Vitest specs next to the code (`*.spec.tsx`). Only `registerRTEPlugins` is faked; `PluginBuilder` is real. Expected values come from the spec, not from running the code.
- The in-repo Playwright suite (`e2e/`) needs a Contentstack account and env vars; it is not part of CI.
- Branches `claude/<type>/<KEY>-<slug>`, conventional commits, PRs into `main`.
