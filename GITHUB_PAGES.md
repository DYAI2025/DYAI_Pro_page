# GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages with comprehensive diagnostics and error handling.

## ElevenLabs ConvAI Widget Compatibility

✅ **The ElevenLabs ConvAI widget is fully compatible with GitHub Pages**

The widget is integrated as a client-side JavaScript component that:
- Loads from the ElevenLabs CDN (`unpkg.com/@elevenlabs/convai-widget-embed`)
- Makes API calls directly from the browser to ElevenLabs services
- Requires no server-side processing
- Works perfectly with static hosting

## Quick Start

### Test Build Locally

Before pushing, verify your build works:

```bash
./test-build.sh
```

This script will:
- ✓ Check prerequisites (Node.js, npm)
- ✓ Verify directory structure
- ✓ Run build with full diagnostics
- ✓ Validate all critical files
- ✓ Check ElevenLabs widget integration
- ✓ Provide detailed build statistics

## Deployment Configuration

### Automatic Deployment

The site deploys automatically via GitHub Actions when you push to:
- `main` branch
- Any `claude/deploy-github-pages-*` branch

### Enhanced Workflow with Diagnostics

The deployment workflow (`.github/workflows/deploy-gh-pages.yml`) includes comprehensive diagnostics:

**Build Job:**
1. 🔍 **Environment Diagnostics** - Dumps runner info, system details, git state
2. ✅ **Checkout** - Fetches repository code
3. ⚙️ **Setup Node.js** - Installs Node 18 with npm caching
4. ✓ **Verify Checkout** - Validates directory structure and critical files
5. 📦 **Install Dependencies** - Runs npm ci/install with proper error handling
6. 🏗️ **Build with Diagnostics** - Builds project with detailed logging and validation:
   - Creates build logs for troubleshooting
   - Verifies public/ directory creation
   - Checks all critical files (index.html, .nojekyll, CNAME, images)
   - Counts files and validates minimum threshold
7. 📤 **Upload Build Logs** - (on failure) Saves logs as artifacts for debugging
8. 📦 **Upload Pages Artifact** - Packages public/ for deployment
9. ✓ **Verify Upload** - Confirms successful artifact upload

**Deploy Job:**
1. 🚀 **Deploy to GitHub Pages** - Publishes to GitHub Pages
2. 📊 **Output URL** - Shows deployment URL

### Troubleshooting Features

The workflow includes:
- **Comprehensive logging** at each step
- **Automatic artifact upload** on build failure (logs saved for 7 days)
- **File validation** to catch missing assets early
- **Non-blocking diagnostics** that won't fail the build unnecessarily
- **Proper permissions** for GitHub Pages deployment

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
- **Deployment**: GitHub Actions (with comprehensive diagnostics)
- **Build**: npm scripts
- **CI/CD**: Automated testing and validation

## Debugging Failed Deployments

If a deployment fails, follow these steps:

### 1. Check Workflow Logs

```bash
# View logs via GitHub CLI
gh run list --repo DYAI2025/DYAI_Pro_page
gh run view <run-id> --log

# Or download logs
gh run download <run-id> --repo DYAI2025/DYAI_Pro_page
```

### 2. Check Build Artifacts

If the build fails, logs are automatically uploaded:
1. Go to Actions → Failed workflow run
2. Scroll to "Artifacts" section
3. Download "build-logs" artifact
4. Review `build.log` for errors

### 3. Test Locally

Always test locally before pushing:

```bash
./test-build.sh
```

### 4. Common Issues

**Issue**: Job cancelled with no logs
- **Cause**: Concurrent deployment or workflow timeout
- **Fix**: Check concurrency settings, wait for other runs to finish

**Issue**: Missing files in public/
- **Cause**: Build script not copying assets
- **Fix**: Run `./test-build.sh` locally to verify

**Issue**: Deploy step fails
- **Cause**: Missing GitHub Pages permissions
- **Fix**: Repository Settings → Pages → Source: "GitHub Actions"

**Issue**: 404 on deployed site
- **Cause**: Wrong publish directory or missing index.html
- **Fix**: Verify public/index.html exists after build

### 5. Re-run Failed Job

```bash
# Re-run the failed job
gh run rerun <run-id> --repo DYAI2025/DYAI_Pro_page

# Re-run only failed jobs
gh run rerun <run-id> --failed --repo DYAI2025/DYAI_Pro_page
```
