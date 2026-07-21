# AGENTS.md

## Purpose

A joke "rice purity test" style quiz that scores how much of a CS student stereotype you are. Client-side only, no backend, no persistence (leaderboards are a README TODO).

## Stack

React 18, TypeScript 5, Vite 5, Chakra UI 2, Framer Motion. npm with package-lock.json (not bun/pnpm).

## Key files

- `src/App.tsx`: the entire app. Questions array, scoring, dark mode toggle, all UI live here.
- `src/main.tsx`, `index.html`: standard Vite entry.
- `vite.config.ts`: just the React plugin.
- `.github/workflows/ci.yml`: Node 20, `npm install`, `npm run build`, `npm test --if-present`.
- `vite-project/`: leftover directory holding only a stray package-lock.json. Ignore it, do not build on it.

## Commands

```
npm install       # install deps
npm run dev       # dev server at http://localhost:5173
npm run build     # tsc then vite build
npm run preview   # serve the production build
npm run lint      # eslint ts,tsx with --max-warnings 0
```

There is no test script or test framework. CI's `npm test --if-present` is a no-op.

## Conventions and gotchas

- Everything belongs in `src/App.tsx` unless it genuinely needs its own file. Questions are a plain `Question[]` array (`id`, `text`, `weight`); add questions there.
- The dark mode toggle intentionally changes the score: switching to dark adds +1, back to light subtracts 1 (`scoreBonus`). It is an easter egg, not a bug.
- Colors are hand-picked hex values per mode inside `App()`, not a Chakra theme. Keep both modes readable if you touch them.
- Lint is strict (`--max-warnings 0`), so warnings fail `npm run lint`.
- `.markdownlint.json` exists; keep markdown tidy.
