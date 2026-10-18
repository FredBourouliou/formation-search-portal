# Frontend

React 18 + TypeScript + Vite 8 client for the formation search API. Uses TanStack Query, Tailwind CSS 4 and React Leaflet.

```bash
npm ci
npm run dev       # http://localhost:5173
npm run build     # type check (tsc) + production build in dist/
npm run preview
```

Set `VITE_API_BASE_URL` to point at the API (default `http://localhost:8080`, see `.env.example`).

See the [root README](../README.md) for the full setup.
