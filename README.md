# Time Pass

A tiny internet playground: browse 50 random photos, each linking to a different website worth exploring.

## Features

- 50 shuffled destinations from a curated list of fun, creative, educational, and interactive websites
- Responsive masonry-style photo wall
- Random Picsum photos with graceful image-load fallback
- Shuffle button and `R` keyboard shortcut
- Respects the system light/dark theme and reduced-motion preference
- External destinations open in a new tab with safe `rel` attributes

## Development

```bash
pnpm install
pnpm dev
```

## Production build

```bash
pnpm build
pnpm preview
```

Photos are provided by [Picsum Photos](https://picsum.photos/). Destination websites are third-party services and may change or become unavailable.
