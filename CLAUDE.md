# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website deployment project for DYAI (Dynamic AI), structured as a containerized web application deployed via Fly.io. The project contains a complete website with HTML, CSS, and JavaScript files, along with deployment configuration.

## Project Structure

```
/
├── DYAI_Pro_page/          # Main website project directory
│   ├── *.html              # Website pages (index, contact, services, etc.)
│   ├── *.css               # Stylesheets
│   ├── *.js                # JavaScript functionality
│   ├── Dockerfile          # Caddy-based container configuration
│   ├── Caddyfile          # Caddy web server configuration
│   ├── fly.toml           # Fly.io deployment configuration
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

# Local Docker testing
docker build -t dyai-site .
docker run --rm -p 8080:8080 dyai-site
# Access at http://localhost:8080

# Alternative with Caddy directly
caddy run --config Caddyfile
```

### Deployment Commands
```bash
# Fly.io authentication (one-time)
fly auth login

# Deploy to Fly.io
fly deploy

# Check deployment status
fly status

# View logs
fly logs
```

## Architecture

### Web Server Stack
- **Frontend**: Static HTML/CSS/JavaScript website
- **Web Server**: Caddy 2 (Alpine-based container)
- **Deployment**: Fly.io platform
- **Container**: Multi-stage Docker build with Caddy

### Key Configuration Files
- `Dockerfile`: Caddy-based container using Alpine Linux
- `Caddyfile`: Web server configuration (serves on port 8080)
- `fly.toml`: Fly.io deployment configuration (Frankfurt region)
- `.mcp.json`: MCP server configurations for AI coordination

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

- **Region**: Frankfurt (fra) - optimized for European users
- **Container**: Shared CPU, auto-scaling (0 min machines)
- **Port**: Internal 8080, external HTTPS forced
- **Static Files**: Served directly by Caddy with SPA fallback to index.html

## Important Notes

- The Dockerfile references a `QJOBc9N/` directory that appears to be missing - website files are currently in the root of DYAI_Pro_page
- The project is configured for German/European deployment (Frankfurt region)
- Contact information and legal pages contain specific details for Benjamin Poersch
- All CSS and JavaScript is self-contained (no external CDN dependencies visible)

## SPARC Methodology Integration

This project includes a comprehensive SPARC (Specification, Pseudocode, Architecture, Refinement, Completion) development environment with 54+ specialized agents available for coordinated development workflows. Refer to `DYAI_Pro_page/CLAUDE.md` for detailed SPARC methodology and agent coordination instructions.