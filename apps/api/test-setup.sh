#!/bin/bash

# Test setup script for the training API
# This verifies all files are in place and shows next steps

echo "════════════════════════════════════════════════════════════"
echo "  Training API - Setup Verification"
echo "════════════════════════════════════════════════════════════"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found"
  echo "   Run this script from /apps/api directory"
  exit 1
fi

echo "✅ Directory structure verified"

# Count TypeScript files
TS_COUNT=$(find src -name "*.ts" | wc -l)
echo "✅ Found $TS_COUNT TypeScript source files"

# Check for critical files
CRITICAL_FILES=(
  "src/index.ts"
  "src/routes/users.ts"
  "src/routes/auth.ts"
  "src/routes/files.ts"
  "src/routes/admin.ts"
  "src/db/connection.ts"
  "README.md"
  "SECURITY_AUDIT.md"
)

for file in "${CRITICAL_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file exists"
  else
    echo "❌ Missing: $file"
    exit 1
  fi
done

# Check for security issue markers
ISSUE_COUNT=$(grep -r "ISSUE #" src/ | wc -l)
echo ""
echo "✅ Found $ISSUE_COUNT security issue markers in code"

# Check for TRAINING GUARD
if grep -q "TRAINING GUARD" src/index.ts; then
  echo "✅ Production guard in place"
else
  echo "❌ Missing TRAINING GUARD"
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo "  Setup Complete! Next Steps:"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "1. Install dependencies:"
echo "   pnpm install"
echo ""
echo "2. Seed the database:"
echo "   pnpm db:seed"
echo ""
echo "3. Start development server:"
echo "   pnpm dev"
echo ""
echo "4. Test an exploit:"
echo "   curl \"http://localhost:3001/api/users/1%20OR%201=1\""
echo ""
echo "5. Read the documentation:"
echo "   - README.md (detailed explanations)"
echo "   - SECURITY_AUDIT.md (find & fix checklist)"
echo "   - ISSUES_MAP.md (quick reference)"
echo ""
echo "════════════════════════════════════════════════════════════"
echo "  ⚠️  WARNING: This code has intentional security bugs!"
echo "      DO NOT deploy to production."
echo "════════════════════════════════════════════════════════════"
