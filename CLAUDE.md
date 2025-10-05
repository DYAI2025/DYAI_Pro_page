# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website deployment project for DYAI (Dynamic AI), deployed as a static site on Render.com. The project contains a complete website with HTML, CSS, and JavaScript files, along with Render deployment configuration.

## Project Structure

```
/
├── DYAI_Pro_page/          # Main website project directory
│   ├── *.html              # Website pages (index, contact, services, etc.)
│   ├── *.css               # Stylesheets
│   ├── *.js                # JavaScript functionality
│   ├── render.yaml        # Render.com deployment configuration
│   ├── Dockerfile         # Legacy Caddy container (for local testing)
│   ├── Caddyfile         # Legacy Caddy configuration (for local testing)
│   ├── fly.toml          # Legacy Fly.io configuration (not used)
│   ├── package.json       # Node.js project metadata
│   ├── .mcp.json          # MCP server configuration
│   ├── .claude/           # Claude-specific agent configurations
│   ├── .hive-mind/        # Hive-mind coordination system
│   ├── memory/            # Persistent memory storage
│   └── coordination/      # Swarm coordination files
```

## Development Commands

### Local Development
```bash
# Navigate to project directory
cd DYAI_Pro_page

# Build for production (creates public/ directory)
npm run build

# Local testing with Python
npm start
# Access at http://localhost:8080

# Alternative: Local Docker testing (legacy)
docker build -t dyai-site .
docker run --rm -p 8080:8080 dyai-site
```

### Deployment Commands (Render.com)
```bash
# Render deployment is automatic via GitHub integration
# Just push to main branch and Render will:
# 1. Run: npm run build
# 2. Serve static files from public/ directory

# Manual build testing
npm run build
# Check public/ directory contains all files

# Connect repository to Render:
# 1. Go to render.com dashboard
# 2. New -> Static Site
# 3. Connect GitHub repository
# 4. Build command: npm run build
# 5. Publish directory: public
```

## Architecture

### Web Server Stack
- **Frontend**: Static HTML/CSS/JavaScript website
- **Deployment**: Render.com static site hosting
- **Build Process**: npm run build → copies files to public/ directory
- **Local Development**: Python HTTP server on port 8080

### Key Configuration Files
- `render.yaml`: Render.com deployment configuration (static site)
- `package.json`: Build scripts and metadata
- `.mcp.json`: MCP server configurations for AI coordination
- `Dockerfile`: Legacy container config (for local testing only)
- `fly.toml`: Legacy Fly.io config (not used)

### Website Features
- Responsive design with modern CSS animations
- Dark mode toggle functionality
- Dynamic navigation updates
- AI agent integration capabilities
- Contact forms and service pages

## MCP Integration

The project includes comprehensive MCP (Model Context Protocol) server configuration:

- **claude-flow@alpha**: Core SPARC methodology and agent coordination
- **ruv-swarm**: Enhanced swarm coordination capabilities
- **flow-nexus**: Cloud-based orchestration features (70+ tools)
- **agentic-payments**: Payment processing integration

## File Organization Rules

When working with this project:
- Keep website files in `DYAI_Pro_page/` directory
- Static assets should remain at the root level of DYAI_Pro_page
- Configuration files stay in their designated locations
- Agent configurations go in `.claude/` subdirectory
- Memory and coordination files use their respective subdirectories

## Deployment Architecture

- **Platform**: Render.com static site hosting
- **Build Process**: Automatic on git push to main branch
- **Build Command**: `npm run build` (copies files to public/)
- **Publish Directory**: `public/`
- **Routing**: SPA fallback to index.html for all routes
- **HTTPS**: Automatic SSL certificate management

## Important Notes

- The Dockerfile references a `QJOBc9N/` directory that appears to be missing - website files are currently in the root of DYAI_Pro_page
- The project is configured for German/European deployment (Frankfurt region)
- Contact information and legal pages contain specific details for Benjamin Poersch
- All CSS and JavaScript is self-contained (no external CDN dependencies visible)

## SPARC Methodology Integration

This project includes a comprehensive SPARC (Specification, Pseudocode, Architecture, Refinement, Completion) development environment with 54+ specialized agents available for coordinated development workflows. Refer to `DYAI_Pro_page/CLAUDE.md` for detailed SPARC methodology and agent coordination instructions.