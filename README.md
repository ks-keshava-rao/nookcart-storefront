# NookCart Storefront

Static React + TypeScript ecommerce design built with Vite. Ready for Netlify.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Vite writes the deployable site to `dist/`.

## Netlify

Import this folder as the project root. `netlify.toml` already configures:

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: `22`
