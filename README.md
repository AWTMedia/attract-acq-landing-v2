# Attract Acquisition – Landing Page & Lead Capture

**Attract Acquisition** builds **Attraction Engines** for physical, local businesses — turning Instagram (posts, Reels, Stories, DMs) into qualified leads, bookings, and paying clients.

This repository contains the **frontend codebase** for https://attractacq.com — a high-conversion landing page offering a **free Missed Jobs Report** audit. Businesses submit details → get a personalized analysis of lost revenue opportunities in their local market → receive it via WhatsApp/email within 24 hours.

## Key Features

- Dark/teal modern UI with glow effects, noise overlay, and smooth animations
- Responsive hero layout: compelling copy on left, lead-capture form on right
- Interactive form with:
  - Business name & location
  - Google reviews selector
  - WhatsApp / Email contact toggle
  - Simulated submission → redirect to confirmation page
- Confirmation page with animated checkmark, timeline ("What happens next"), referral/share buttons
- SPA routing support for GitHub Pages (via `public/404.html` fallback)
- Custom domain: attractacq.com

## Tech Stack

- **Frontend Framework**: React (with TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router DOM
- **State & Data**: TanStack Query (React Query), React Hook Form (optional in future)
- **UI/UX Extras**: Sonner (toasts), Lucide icons (assumed via shadcn)
- **Deployment**: GitHub Pages (via GitHub Actions workflow)

## Project Structure

```
Attract-Acquisition/
├── public/                # Static assets copied to dist root
│   ├── 404.html           # SPA routing fallback for GitHub Pages
│   └── favicon.ico, etc.
├── src/
│   ├── components/        # shadcn/ui + custom (Toaster, Tooltip, etc.)
│   ├── pages/             # Index, Audit, AuditConfirmation, NotFound
│   ├── App.tsx            # Root with routing & providers
│   └── main.tsx
├── .github/workflows/     # deploy.yml – Vite build → GitHub Pages
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or pnpm

### Installation

```bash
# Clone the repo
git clone https://github.com/AWTMedia/Attract-Acquisition.git
cd Attract-Acquisition

# Install dependencies
npm install
# or pnpm install
```

### Development

```bash
# Start dev server (http://localhost:5173)
npm run dev
```

Open http://localhost:5173/audit to see the form.

### Build & Preview

```bash
# Build for production
npm run build

# Preview locally
npm run preview
```

### Deployment (GitHub Pages)

1. Ensure **GitHub Pages** is enabled in repo Settings → Pages → Source: **GitHub Actions**
2. Push to `main` → workflow `.github/workflows/deploy.yml` auto-builds & deploys
3. Custom domain (attractacq.com) already configured via `CNAME` file + DNS

**Note**: Direct sub-path access (`/audit`, `/audit-confirmation`) works thanks to `public/404.html` redirecting to `index.html` with preserved path.

## Scripts in package.json

- `dev` → local dev server
- `build` → production build (copies to `dist/`)
- `preview` → serve built files locally
- (Optional) Add to build: `&& cp dist/index.html dist/404.html` for auto-fallback

## Contributing

Contributions welcome! Especially:
- Form validation / real API submission
- Better mobile tweaks
- Analytics integration
- Dark mode toggle (if needed)

Open issues or PRs.

## License

MIT License (or add your preferred one).

Built with ❤️ in Cape Town by [AWTMedia](https://github.com/AWTMedia) for **Attract Acquisition**.

Visit the live site: https://attractacq.com  
Instagram: [@attractacq](https://instagram.com/attractacq)

