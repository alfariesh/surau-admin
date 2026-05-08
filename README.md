# HeroUI Pro - Dashboard Template

A multi-page dashboard starter built with **Next.js 16** and **HeroUI Pro** components. Includes a full admin shell (sidebar + top navbar), a populated home page (KPIs, charts, data table), and scaffolded routes for Orders, Tracker, Analytics, Settings, and Help.

## Quick start

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3003`.

## Firebase auth setup

This dashboard is configured for Firebase project `surau-87160`. Copy
`.env.local.example` to `.env.local`, then fill the public web app config and
Firebase Admin service account values.

Useful Firebase CLI checks:

```bash
npx -y firebase-tools@latest login
npx -y firebase-tools@latest use surau-87160
npx -y firebase-tools@latest apps:list --project surau-87160
```

Enable Email/Password, Google, and Apple providers in Firebase Authentication.
Apple Sign In also requires Apple Developer configuration with this Firebase
return URL:

```text
https://surau-87160.firebaseapp.com/__/auth/handler
```

Admin access is controlled by `ADMIN_EMAIL_ALLOWLIST`; the initial allowlisted
email is `alfarieshsalman@gmail.com`.

## Pages

| Route        | What's in it                                                                               |
| ------------ | ------------------------------------------------------------------------------------------ |
| `/`          | Dashboard home: KPI row, Sales Performance bar chart, Traffic Source line chart, Employees |
| `/orders`    | Orders table scaffold (DataGrid + status chips)                                            |
| `/tracker`   | Task tracker scaffold (KPIs + Kanban)                                                      |
| `/analytics` | Analytics scaffold (KPIs + multiple charts)                                                |
| `/settings`  | Settings scaffold (Tabs + form)                                                            |
| `/help`      | Help & Information scaffold (link cards + FAQ)                                             |

Each scaffolded page has a `TODO` comment pointing to the file where you'd wire in your real data.

## Project structure

```
app/
  layout.tsx                 # root html/body
  (app)/
    layout.tsx               # shared shell
    page.tsx                 # home
    orders/page.tsx
    tracker/page.tsx
    analytics/page.tsx
    settings/page.tsx
    help/page.tsx
  globals.css
src/
  nav-items.ts               # sidebar nav config
  components/                # shell, sidebar, navbar, icon-button helper
  views/                     # one file per route (named `*-page.tsx`)
  widgets/                   # sub-components used by the home view
  data/                      # mock data (swap for your store)
```

## Components used

Components are imported directly from `@heroui-pro/react` and `@heroui/react`. No barrel imports, no custom wrappers.

## Prerequisites

- Node 20+
- pnpm 9+ (or swap `pnpm` for `npm`/`yarn` in the scripts)
- `@heroui-pro/react` needs to be resolvable from your package registry. If you see an install error for this package, make sure you have access to the HeroUI Pro npm registry.
