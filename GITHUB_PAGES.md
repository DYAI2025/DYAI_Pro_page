# GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages.

## ElevenLabs ConvAI Widget Compatibility

✅ **The ElevenLabs ConvAI widget is fully compatible with GitHub Pages**

The widget is integrated as a client-side JavaScript component that:
- Loads from the ElevenLabs CDN (`unpkg.com/@elevenlabs/convai-widget-embed`)
- Makes API calls directly from the browser to ElevenLabs services
- Requires no server-side processing
- Works perfectly with static hosting

## Deployment Configuration

### Automatic Deployment

The site deploys automatically via GitHub Actions when you push to:
- `main` branch
- Any `claude/deploy-github-pages-*` branch

### Workflow

The deployment workflow (`.github/workflows/deploy-gh-pages.yml`) performs these steps:
1. Checks out the repository
2. Runs `npm run build` to generate the `public/` directory
3. Copies additional assets (images, CNAME, .nojekyll)
4. Deploys to GitHub Pages

### Build Process

The build script (`npm run build`) does:
1. Creates `public/` directory
2. Copies all HTML, CSS, and JS files from `DYAI_Pro_page/`
3. Copies `instafile_images/` directory
4. Creates `.nojekyll` file (prevents Jekyll processing)
5. Copies `CNAME` file for custom domain configuration

## Custom Domain

The site is configured with the custom domain: `dyai-pro-page.app`

To configure DNS:
1. Add an A record pointing to GitHub Pages IPs:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
2. Or add a CNAME record pointing to: `DYAI2025.github.io`

## GitHub Pages Settings

To enable GitHub Pages in your repository:
1. Go to Settings → Pages
2. Source: GitHub Actions
3. The workflow will handle deployment automatically

## Local Testing

To test the site locally:

```bash
npm run build
npm start
```

Then open: http://localhost:8080

## Features

- ✅ Static HTML/CSS/JavaScript
- ✅ ElevenLabs ConvAI widget integration
- ✅ Custom AI agent with OpenAI integration
- ✅ Responsive design
- ✅ Dark mode toggle
- ✅ Custom domain support
- ✅ Automatic deployment

## Technical Stack

- **Hosting**: GitHub Pages (static hosting)
- **AI Voice**: ElevenLabs ConvAI Widget
- **AI Chat**: OpenAI API (client-side)
- **Deployment**: GitHub Actions
- **Build**: npm scripts
