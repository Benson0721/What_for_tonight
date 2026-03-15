# Tonight Activity Prototype

Week 5 demo-ready state for the "今晚做什麼" prototype.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4

## Local Development

```bash
npm install
npm run dev
```

## Verification Commands

```bash
npm run lint
npm run typecheck
npm run build
npm run test:unit
npm run test:e2e
```

## Current Scope

- Core routes: `/`, `/plan`, `/recommendations`, `/done`
- `/plan` supports filter selection and navigation to recommendations
- `/recommendations` renders 3 mock-data-driven results with regenerate and favorite interactions
- `/done` closes the happy path with demo-only confirmation
- Favorites stay demo-only in `localStorage`
- No real auth, backend, API, map, payment, or detail page

## Demo Script

1. Happy path: `/` -> `/plan` -> choose a few conditions -> `/recommendations` -> `今晚就做這個` -> `/done`
2. No-filter path: `/plan` -> submit directly -> generic recommendations still render
3. Regenerate path: `/recommendations` -> `換一組推薦` -> list updates without re-entering conditions
4. Invalid activity path: open `/done?activityId=missing-activity` -> global 404

## Branch / Delivery Notes

- `main` is the intended production branch
- Feature work should land by pull request
- Vercel preview / production wiring is expected outside the local codebase
- Week 5 demo mode: only blocker fixes should land on `main`
