#!/bin/bash
# Test script to verify GitHub Pages build locally
# Run this before pushing to catch issues early

set -e  # Exit on error

echo "==== DYAI Pro Page - Local Build Test ===="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "==== Checking Prerequisites ===="
command -v node >/dev/null 2>&1 || { echo -e "${RED}✗ Node.js not installed${NC}"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo -e "${RED}✗ npm not installed${NC}"; exit 1; }
echo -e "${GREEN}✓ Node.js $(node --version)${NC}"
echo -e "${GREEN}✓ npm $(npm --version)${NC}"
echo ""

# Check directory structure
echo "==== Verifying Directory Structure ===="
test -f package.json && echo -e "${GREEN}✓ package.json exists${NC}" || { echo -e "${RED}✗ package.json missing${NC}"; exit 1; }
test -f CNAME && echo -e "${GREEN}✓ CNAME exists${NC}" || echo -e "${YELLOW}⚠ CNAME missing${NC}"
test -d DYAI_Pro_page && echo -e "${GREEN}✓ DYAI_Pro_page directory exists${NC}" || { echo -e "${RED}✗ DYAI_Pro_page directory missing${NC}"; exit 1; }
test -d DYAI_Pro_page/instafile_images && echo -e "${GREEN}✓ instafile_images exists${NC}" || echo -e "${YELLOW}⚠ instafile_images missing${NC}"
echo ""

# Clean previous build
echo "==== Cleaning Previous Build ===="
rm -rf public
echo -e "${GREEN}✓ Cleaned public/ directory${NC}"
echo ""

# Install dependencies
echo "==== Installing Dependencies ===="
if [ -f package-lock.json ]; then
    npm ci --no-audit --no-fund
else
    npm install --no-audit --no-fund
fi
echo ""

# Run build
echo "==== Running Build ===="
npm run build
echo ""

# Verify build output
echo "==== Verifying Build Output ===="
if [ ! -d public ]; then
    echo -e "${RED}✗ CRITICAL: public directory was not created!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ public directory created${NC}"
echo ""

echo "==== Checking Critical Files ===="
test -f public/index.html && echo -e "${GREEN}✓ index.html${NC}" || { echo -e "${RED}✗ index.html missing${NC}"; exit 1; }
test -f public/style.css && echo -e "${GREEN}✓ style.css${NC}" || echo -e "${YELLOW}⚠ style.css missing${NC}"
test -f public/app.js && echo -e "${GREEN}✓ app.js${NC}" || echo -e "${YELLOW}⚠ app.js missing${NC}"
test -f public/.nojekyll && echo -e "${GREEN}✓ .nojekyll${NC}" || echo -e "${YELLOW}⚠ .nojekyll missing${NC}"
test -f public/CNAME && echo -e "${GREEN}✓ CNAME${NC}" || echo -e "${YELLOW}⚠ CNAME missing${NC}"
test -d public/instafile_images && echo -e "${GREEN}✓ instafile_images${NC}" || echo -e "${YELLOW}⚠ instafile_images missing${NC}"
echo ""

# Check ElevenLabs widget integration
echo "==== Checking ElevenLabs Integration ===="
if grep -q "elevenlabs-convai" public/index.html; then
    echo -e "${GREEN}✓ ElevenLabs ConvAI widget found in index.html${NC}"
else
    echo -e "${YELLOW}⚠ ElevenLabs ConvAI widget not found in index.html${NC}"
fi
echo ""

# File count
FILE_COUNT=$(find public -type f | wc -l)
echo "==== Build Statistics ===="
echo "Total files: $FILE_COUNT"
echo ""

if [ $FILE_COUNT -lt 10 ]; then
    echo -e "${YELLOW}⚠ WARNING: Only $FILE_COUNT files found - expected more${NC}"
    echo ""
fi

# List all files
echo "==== All Files in public/ ===="
ls -lh public/
echo ""

# Size analysis
TOTAL_SIZE=$(du -sh public | cut -f1)
echo "Total size: $TOTAL_SIZE"
echo ""

# Test local server
echo "==== Local Server Test ===="
echo -e "${GREEN}Build successful! You can now test locally with:${NC}"
echo ""
echo "  npm start"
echo ""
echo "Then open: http://localhost:8080"
echo ""
echo -e "${GREEN}==== BUILD VERIFICATION COMPLETE ====${NC}"
