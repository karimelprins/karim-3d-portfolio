# Karim Ehab — React Three Fiber Best Mix Portfolio

This is a real React / Three.js / React Three Fiber portfolio project inspired by the GitHub `3d-portfolio` topic examples.

## What is different in this version

- Uses real `@react-three/fiber` Canvas, not CSS-only 3D
- Procedural floating island / laptop scene
- 3D avatar placeholder
- Project planets with labels
- Stars, particles, lights, fog and shadows
- Framer Motion + GSAP scroll animation
- Separate project panels for FlowBoard AI, Egypt Trip & Ride and FreshCart

## Run locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Push to GitHub and import into Vercel. Vercel will run `npm run build` and publish `dist`.

## Note

The 3D scene is procedural, so it does not require external GLB files. If you want Karim's real photo as a 3D avatar, add an image/model asset and replace the `Avatar` component in `src/components/Experience.jsx`.
