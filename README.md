<div align="center">

# 🎬 Cinescope

### Discover movies the way they deserve to be discovered.

A fast, modern movie discovery platform powered by the TMDB API — featuring curated browsing, advanced search with multi-dimensional filters, rich detail pages, and a cinema-grade dark UI.

<br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=flat-square&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![TMDB API](https://img.shields.io/badge/Powered_by-TMDB-01D277?style=flat-square&logo=themoviedatabase&logoColor=white)](https://www.themoviedb.org/documentation/api)

<br/>

![Cinescope Hero](https://placehold.co/1200x600/0a0a0a/FFB800?text=Cinescope+—+Movie+Discovery+Platform)

</div>

---

## Overview

Cinescope is a production-grade movie discovery SPA that connects directly to The Movie Database (TMDB) API, giving users access to a library of hundreds of thousands of films — browsable by popularity, recency, and critical acclaim, and searchable with precise multi-dimensional filters.

The goal was to build something that feels like a polished streaming platform's discovery section: visually rich, responsive across every device, and fast enough that it never gets in the way of the experience.

**Who is it for?**
- Movie enthusiasts who want to explore films beyond algorithmic recommendations
- Developers looking for a reference implementation of a well-structured React + TanStack Query application
- Portfolio showcases demonstrating real-world API integration and modern frontend architecture

---

## Features

### Core Browsing
- **Curated Home Feed** — Four live movie categories side-by-side: Now Playing, Popular, Top Rated, and Upcoming, each backed by a real-time TMDB feed
- **Hero Banner** — Prominent featured movie at the top of the home page with backdrop, metadata, and navigation CTAs
- **Horizontal Carousels** — Smooth, scrollable movie rows per category with consistent card design

### Search & Discovery
- **Full-Text Movie Search** — Debounced (400ms) search against the TMDB search endpoint as-you-type
- **Genre Filter** — Filter by any of TMDB's official genre classifications
- **Release Year Filter** — Narrow results to a specific production year
- **Rating Filter** — Set a minimum audience score threshold
- **Sort Control** — Sort by popularity, release date, vote average, or vote count — ascending or descending
- **Filter Composition** — All filters compose together; switching from search to browse mode swaps endpoints automatically

### Movie Detail Pages
- **Full Backdrop Presentation** — Cinematic backdrop with gradient overlay
- **Comprehensive Metadata** — Title, tagline, rating, genres, release date, runtime, spoken language, original language, director, budget, and revenue
- **Dynamic Rating Badge** — Color-coded score display (green / yellow / red) based on audience rating
- **Full Cast Carousel** — Top 10 cast members with profile photos and character names
- **Similar Movies** — Contextual recommendations pulled from TMDB's similarity engine
- **External Links** — Direct link to the movie's official website when available

### UI & Experience
- **Dark Mode by Default** — System-preference-aware theme with localStorage persistence and manual toggle
- **Fully Responsive Layout** — Sidebar navigation on desktop; slide-out drawer on mobile
- **Skeleton Loading States** — Animated skeletons on every loading surface — no layout shift
- **Error States with Retry** — Network failures surface actionable error cards
- **Empty States** — Contextual zero-result messaging per screen
- **Code-Split Routes** — Each page loads lazily via React `Suspense` for faster initial paint

### Developer Experience
- **Strict TypeScript** — Full strict mode with no `any` escapes; all TMDB response shapes are typed
- **Centralized Query Keys** — Factory pattern for all TanStack Query cache keys prevents key collisions
- **URL-Synced Filters** — Search filters are stored in and read from URL search params — shareable and browser-history-aware
- **Path Aliases** — `@/` maps to `src/` throughout the codebase

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **UI Framework** | React | 18.3 |
| **Language** | TypeScript | 6.0 |
| **Build Tool** | Vite | 8.0 |
| **Routing** | React Router DOM | 6.30 |
| **Server State** | TanStack React Query | 5.101 |
| **HTTP Client** | Axios | 1.17 |
| **Styling** | Tailwind CSS | 3.4 |
| **UI Primitives** | Radix UI (Select, Slot, Separator) | 2.x |
| **Icons** | Lucide React | 1.18 |
| **CSS Utilities** | clsx · tailwind-merge · class-variance-authority | latest |
| **External API** | TMDB (The Movie Database) | v3 |

---

## Project Structure

```
cinescope/
├── index.html                        # App entry point (dark class applied at root)
├── vite.config.ts                    # Vite + path alias configuration
├── tailwind.config.js                # Design tokens and dark mode config
├── tsconfig.json                     # Strict TypeScript configuration
│
└── src/
    ├── main.tsx                      # ReactDOM root mount
    ├── App.tsx                       # Router setup + lazy-loaded routes + Suspense
    ├── index.css                     # Global styles, CSS custom properties, utilities
    │
    ├── api/
    │   ├── axiosClient.ts            # Axios instance — base URL + API key injection
    │   └── movies.ts                 # All TMDB endpoint functions
    │
    ├── components/
    │   ├── layout/
    │   │   ├── AppShell.tsx          # Top-level flex layout wrapper
    │   │   ├── Sidebar.tsx           # Desktop navigation
    │   │   └── Header.tsx            # Mobile header + drawer toggle
    │   │
    │   ├── movie/
    │   │   ├── HeroBanner.tsx        # Featured movie hero section
    │   │   ├── MovieCard.tsx         # Individual movie card (lazy image load)
    │   │   ├── MovieCardSkeleton.tsx # Card loading placeholder
    │   │   ├── MovieGrid.tsx         # Responsive grid with loading/error states
    │   │   ├── MovieRow.tsx          # Horizontal scrollable carousel
    │   │   ├── RatingBadge.tsx       # Color-coded rating display
    │   │   └── GenreBadge.tsx        # Genre tag chip
    │   │
    │   ├── shared/
    │   │   ├── EmptyState.tsx        # Zero-results UI
    │   │   └── ErrorState.tsx        # Error UI with optional retry
    │   │
    │   └── ui/                       # Headless-first primitives (shadcn/ui style)
    │       ├── button.tsx
    │       ├── input.tsx
    │       ├── select.tsx
    │       ├── badge.tsx
    │       └── skeleton.tsx
    │
    ├── hooks/                        # One hook per data concern
    │   ├── useNowPlaying.ts
    │   ├── usePopularMovies.ts
    │   ├── useTopRated.ts
    │   ├── useUpcoming.ts
    │   ├── useSearchMovies.ts        # Switches between /search and /discover based on filters
    │   ├── useMovieDetail.ts
    │   ├── useMovieCredits.ts
    │   ├── useSimilarMovies.ts
    │   ├── useGenres.ts              # Infinite staleTime — never refetches genres
    │   ├── useMovieFilters.ts        # URL search-param–backed filter state
    │   └── useDebounce.ts            # 400ms debounce for search input
    │
    ├── lib/
    │   ├── constants.ts              # Query key factory, image URL builders, filter options
    │   └── utils.ts                  # cn(), formatDate(), formatCurrency(), getRatingBg()
    │
    ├── pages/
    │   ├── HomePage.tsx              # Hero + four movie-row categories
    │   ├── SearchPage.tsx            # Search bar + filter bar + paginated grid
    │   ├── MovieDetailPage.tsx       # Full detail view with cast and similar movies
    │   └── NotFoundPage.tsx          # 404 fallback
    │
    ├── providers/
    │   ├── QueryProvider.tsx         # TanStack Query client config (staleTime, retries, GC)
    │   └── ThemeProvider.tsx         # Theme context + localStorage + system preference
    │
    └── types/
        └── index.ts                  # TypeScript interfaces for all TMDB response shapes
```

**Key architectural boundaries:**

- `api/` — raw TMDB calls only; no business logic
- `hooks/` — TanStack Query wrappers; data fetching lives here, not in components
- `components/` — purely presentational; consume hooks via props or direct calls
- `pages/` — composition layer; assembles components and hooks into full views
- `lib/` — pure utility functions and constants; zero side-effects

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cinescope.git
cd cinescope
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and add your TMDB API key:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

### 4. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### 5. Production build

```bash
npm run build       # TypeScript compile + Vite bundle
npm run preview     # Preview the production build locally
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_TMDB_API_KEY` | Yes | Your TMDB v3 API key — obtain from [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api) |
| `VITE_TMDB_BASE_URL` | No | TMDB API base URL. Defaults to `https://api.themoviedb.org/3` |
| `VITE_TMDB_IMAGE_BASE_URL` | No | TMDB image CDN base URL. Defaults to `https://image.tmdb.org/t/p` |

> All Vite environment variables must be prefixed with `VITE_` to be accessible in the browser bundle.

---

## API Integration

Cinescope integrates exclusively with the [TMDB API v3](https://developer.themoviedb.org/docs).

### Endpoints Used

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/movie/now_playing` | Currently in-theater movies |
| `GET` | `/movie/popular` | Trending movies by popularity score |
| `GET` | `/movie/top_rated` | Highest-rated movies of all time |
| `GET` | `/movie/upcoming` | Movies with upcoming release dates |
| `GET` | `/search/movie` | Full-text title search |
| `GET` | `/discover/movie` | Filter-driven discovery (genre, year, rating, sort) |
| `GET` | `/movie/:id` | Full movie detail |
| `GET` | `/movie/:id/credits` | Cast and crew for a movie |
| `GET` | `/movie/:id/similar` | Contextual similar-movie recommendations |
| `GET` | `/genre/movie/list` | Complete genre taxonomy |

### Smart Endpoint Switching

The `useSearchMovies` hook automatically switches between `/search/movie` and `/discover/movie` based on whether the user has typed a title query. This allows filters to work in both search and browse contexts without any manual mode management.

### Image URL Construction

```typescript
// Poster images (poster_path)
posterUrl(path, 'w500')   // → https://image.tmdb.org/t/p/w500/path.jpg

// Backdrop images (backdrop_path)
backdropUrl(path, 'w1280') // → https://image.tmdb.org/t/p/w1280/path.jpg

// Actor profile photos (profile_path)
profileUrl(path, 'w185')  // → https://image.tmdb.org/t/p/w185/path.jpg
```

Available sizes: `w92`, `w154`, `w185`, `w342`, `w500`, `w780`, `original` for posters; `w300`, `w780`, `w1280`, `original` for backdrops.

---

## Performance

### Caching Strategy

TanStack Query is configured with aggressive caching that suits read-heavy, slowly-changing API data:

```typescript
{
  staleTime: 5 * 60 * 1000,   // Data stays fresh for 5 minutes
  gcTime:   10 * 60 * 1000,   // Unused cache entries purged after 10 minutes
  retry: 2,                    // Retry failed requests twice before surfacing error
}
```

Genres are special-cased with `staleTime: Infinity` — the genre list almost never changes, so it's fetched once per session.

### Code Splitting

Every page component is lazy-loaded via React's `lazy()` + `Suspense`. The initial bundle only contains the router, providers, and layout shell — each route's code is fetched on demand.

```typescript
const HomePage        = lazy(() => import('@/pages/HomePage'))
const SearchPage      = lazy(() => import('@/pages/SearchPage'))
const MovieDetailPage = lazy(() => import('@/pages/MovieDetailPage'))
```

### Image Loading

`MovieCard` uses native `loading="lazy"` on poster images, deferring off-screen image fetches until the user scrolls near them. Combined with TMDB's global CDN, images load fast without any extra infrastructure.

### Debounced Search

The search input is debounced at 400ms via `useDebounce`. This prevents a new API request on every keystroke while keeping the search feel responsive.

### URL-Synced Filter State

Filters are stored in URL search parameters via `useMovieFilters`, which means browser back/forward navigation works naturally — no extra state hydration required.

---

## Screenshots

> Replace these placeholders with actual screenshots from the running application.

**Home Page**
![Home Page](https://placehold.co/1200x700/111827/FFB800?text=Home+—+Hero+Banner+%2B+Movie+Rows)

**Search & Filter**
![Search Page](https://placehold.co/1200x700/111827/FFB800?text=Search+%2F+Discover+with+Filters)

**Movie Detail**
![Movie Detail](https://placehold.co/1200x700/111827/FFB800?text=Movie+Detail+—+Cast+%2B+Metadata)

**Mobile View**
![Mobile](https://placehold.co/390x844/111827/FFB800?text=Mobile+Responsive+Layout)

---

## Developer Notes

### Component Conventions

UI primitives in `components/ui/` follow the [shadcn/ui](https://ui.shadcn.com/) pattern: Radix UI handles behavior and accessibility, Tailwind + CVA (class-variance-authority) handles visual variants. This makes it trivial to add new variants without forking the primitive.

### Query Key Factory

All cache keys are defined in `lib/constants.ts` using a factory pattern:

```typescript
export const queryKeys = {
  movies: {
    all:       () => ['movies'] as const,
    lists:     () => [...queryKeys.movies.all(), 'list'] as const,
    popular:   (page: number) => [...queryKeys.movies.lists(), 'popular', page] as const,
    detail:    (id: number)   => [...queryKeys.movies.all(), 'detail', id] as const,
    credits:   (id: number)   => [...queryKeys.movies.all(), 'credits', id] as const,
    similar:   (id: number)   => [...queryKeys.movies.all(), 'similar', id] as const,
  },
  genres: () => ['genres'] as const,
}
```

This prevents cache key collisions and makes invalidation predictable.

### Type Safety

Every TMDB response shape is defined in `src/types/index.ts`. Axios calls are typed with generics (`axios.get<PaginatedMovies>(...)`) so TypeScript catches shape mismatches at compile time rather than runtime.

### Theme Implementation

The `ThemeProvider` writes a `dark` or `light` class to `document.documentElement` which gates Tailwind's `dark:` variants. The app defaults to `dark` in `index.html` to avoid a flash-of-light-theme on load.

---

## Roadmap

Ideas for meaningful next additions, grounded in what the codebase already supports:

- **Watchlist / Favorites** — Client-side persistence via `localStorage` or a lightweight backend; the `MovieCard` UI already has an "Add to Favorites" affordance
- **TV Show Support** — TMDB's `/tv` endpoints mirror `/movie` exactly; the type system and hooks would extend cleanly
- **Infinite Scroll** — Replace page-based pagination on `SearchPage` with TanStack Query's `useInfiniteQuery`
- **Trailers & Media** — TMDB exposes `/movie/:id/videos` for YouTube trailers; embed in the detail page
- **Person Pages** — Director and cast member profile pages using `/person/:id`
- **Multi-language Support** — TMDB supports `language=` on every endpoint; add an `i18n` layer
- **PWA Support** — Add a service worker and web manifest to support offline browsing of cached movies

---

## Contributing

Contributions are welcome. To keep the codebase consistent, please follow these conventions:

1. **Fork** the repo and create a feature branch from `main`
2. **Install** dependencies with `npm install`
3. **Develop** against `npm run dev`
4. **Type-check** before committing: `npx tsc --noEmit`
5. **Keep PRs focused** — one concern per pull request
6. **Follow the existing patterns**: new data concerns → new hook; new API call → `api/movies.ts`; new UI primitive → `components/ui/`

```bash
git checkout -b feature/your-feature-name
# make your changes
git commit -m "feat: describe the change"
git push origin feature/your-feature-name
# open a pull request
```

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Built with [React](https://react.dev/) · [Vite](https://vitejs.dev/) · [TanStack Query](https://tanstack.com/query) · [Tailwind CSS](https://tailwindcss.com/)

Data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/) · This product uses the TMDB API but is not endorsed or certified by TMDB.

</div>
