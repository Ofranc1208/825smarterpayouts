# SmarterPayouts Dynamic Sitemap Verification Script
# PowerShell Version - Compatible with Windows
# Purpose: Execute live command scan to validate sitemap structure and counts

Write-Host "🚀 Starting SmarterPayouts Sitemap Verification..." -ForegroundColor Green

# Initialize output file
$outputFile = "sitemap-verification.txt"
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Clear existing file and add header
@"
📄 SmarterPayouts Live Sitemap Verification Scan
Generated: $timestamp
Project Root: $(Get-Location)

================================================================================
"@ | Out-File -FilePath $outputFile -Encoding UTF8

Write-Host "✓ Initialized output file: $outputFile" -ForegroundColor Cyan

# ============================================================================
# STEP 1: APP Directory Structure
# ============================================================================
Write-Host "`n📁 Scanning APP directory..." -ForegroundColor Yellow

Add-Content -Path $outputFile -Value @"

================================================================================
🗂 APP DIRECTORY STRUCTURE
================================================================================

"@

# Get app directory tree
$appTree = tree app /f /a
Add-Content -Path $outputFile -Value $appTree

Write-Host "✓ APP directory scanned" -ForegroundColor Green

# ============================================================================
# STEP 2: SRC Directory Structure
# ============================================================================
Write-Host "`n📁 Scanning SRC directory..." -ForegroundColor Yellow

Add-Content -Path $outputFile -Value @"

================================================================================
🧩 SRC DIRECTORY STRUCTURE
================================================================================

"@

$srcTree = tree src /f /a
Add-Content -Path $outputFile -Value $srcTree

Write-Host "✓ SRC directory scanned" -ForegroundColor Green

# ============================================================================
# STEP 3: PUBLIC Directory Structure
# ============================================================================
Write-Host "`n📁 Scanning PUBLIC directory..." -ForegroundColor Yellow

Add-Content -Path $outputFile -Value @"

================================================================================
📦 PUBLIC DIRECTORY STRUCTURE
================================================================================

"@

$publicTree = tree public /f /a
Add-Content -Path $outputFile -Value $publicTree

Write-Host "✓ PUBLIC directory scanned" -ForegroundColor Green

# ============================================================================
# STEP 4: File Counts
# ============================================================================
Write-Host "`n📊 Counting files..." -ForegroundColor Yellow

Add-Content -Path $outputFile -Value @"

================================================================================
📊 FILE COUNTS & STATISTICS
================================================================================

"@

# Count pages
$pageCount = (Get-ChildItem -Path app -Recurse -Filter "page.tsx" -File -ErrorAction SilentlyContinue).Count
Add-Content -Path $outputFile -Value "📄 Pages (page.tsx): $pageCount"

# Count layouts
$layoutCount = (Get-ChildItem -Path app -Recurse -Filter "layout.tsx" -File -ErrorAction SilentlyContinue).Count
Add-Content -Path $outputFile -Value "📐 Layouts (layout.tsx): $layoutCount"

# Count API routes
$apiCount = (Get-ChildItem -Path app -Recurse -Filter "route.ts" -File -ErrorAction SilentlyContinue).Count
Add-Content -Path $outputFile -Value "🔌 API Routes (route.ts): $apiCount"

# Count TypeScript/JavaScript files (excluding node_modules)
$tsxCount = (Get-ChildItem -Path . -Recurse -Include "*.tsx" -File -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notmatch "node_modules" }).Count
$tsCount = (Get-ChildItem -Path . -Recurse -Include "*.ts" -File -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notmatch "node_modules" }).Count
$jsxCount = (Get-ChildItem -Path . -Recurse -Include "*.jsx" -File -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notmatch "node_modules" }).Count
$jsCount = (Get-ChildItem -Path . -Recurse -Include "*.js" -File -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notmatch "node_modules" }).Count

Add-Content -Path $outputFile -Value "`n📝 Code Files (excluding node_modules):"
Add-Content -Path $outputFile -Value "  - TypeScript React (.tsx): $tsxCount"
Add-Content -Path $outputFile -Value "  - TypeScript (.ts): $tsCount"
Add-Content -Path $outputFile -Value "  - JavaScript React (.jsx): $jsxCount"
Add-Content -Path $outputFile -Value "  - JavaScript (.js): $jsCount"
Add-Content -Path $outputFile -Value "  - Total: $($tsxCount + $tsCount + $jsxCount + $jsCount)"

# Count CSS files
$cssCount = (Get-ChildItem -Path . -Recurse -Include "*.css" -File -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notmatch "node_modules" }).Count
Add-Content -Path $outputFile -Value "`n🎨 Stylesheets (.css): $cssCount"

# Count markdown files
$mdCount = (Get-ChildItem -Path . -Recurse -Include "*.md" -File -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notmatch "node_modules" }).Count
Add-Content -Path $outputFile -Value "📖 Documentation (.md): $mdCount"

Write-Host "✓ File counts completed" -ForegroundColor Green

# ============================================================================
# STEP 5: Calculator Modules
# ============================================================================
Write-Host "`n🧮 Identifying Calculator modules..." -ForegroundColor Yellow

Add-Content -Path $outputFile -Value @"

================================================================================
🧮 CALCULATOR SYSTEM MODULES
================================================================================

"@

$calculatorFiles = Get-ChildItem -Path src,app -Recurse -File -ErrorAction SilentlyContinue | 
    Where-Object { $_.FullName -notmatch "node_modules" } |
    Select-String -Pattern "calculator|calculate" -List |
    Select-Object -ExpandProperty Path |
    Sort-Object -Unique

Add-Content -Path $outputFile -Value "Files containing 'calculator' or 'calculate':"
Add-Content -Path $outputFile -Value "Total: $($calculatorFiles.Count) files`n"
$calculatorFiles | ForEach-Object { Add-Content -Path $outputFile -Value "  - $_" }

Write-Host "✓ Calculator modules identified: $($calculatorFiles.Count) files" -ForegroundColor Green

# ============================================================================
# STEP 6: Mint AI Modules
# ============================================================================
Write-Host "`n🤖 Identifying Mint AI modules..." -ForegroundColor Yellow

Add-Content -Path $outputFile -Value @"

================================================================================
🤖 MINT AI SYSTEM MODULES
================================================================================

"@

$mintFiles = Get-ChildItem -Path src,app -Recurse -File -ErrorAction SilentlyContinue | 
    Where-Object { $_.FullName -notmatch "node_modules" } |
    Select-String -Pattern "MintAI|Mint.*AI|AssistantContext|mint.*ai" -List |
    Select-Object -ExpandProperty Path |
    Sort-Object -Unique

Add-Content -Path $outputFile -Value "Files containing 'MintAI', 'AssistantContext', or related terms:"
Add-Content -Path $outputFile -Value "Total: $($mintFiles.Count) files`n"
$mintFiles | ForEach-Object { Add-Content -Path $outputFile -Value "  - $_" }

Write-Host "✓ Mint AI modules identified: $($mintFiles.Count) files" -ForegroundColor Green

# ============================================================================
# STEP 7: State Laws Modules
# ============================================================================
Write-Host "`n🏛 Identifying State Laws modules..." -ForegroundColor Yellow

Add-Content -Path $outputFile -Value @"

================================================================================
🏛 STATE LAWS SYSTEM MODULES
================================================================================

"@

$stateLawFiles = Get-ChildItem -Path src,app -Recurse -File -ErrorAction SilentlyContinue | 
    Where-Object { $_.FullName -notmatch "node_modules" } |
    Select-String -Pattern "state-laws|StateLaw" -List |
    Select-Object -ExpandProperty Path |
    Sort-Object -Unique

Add-Content -Path $outputFile -Value "Files containing 'state-laws' or 'StateLaw':"
Add-Content -Path $outputFile -Value "Total: $($stateLawFiles.Count) files`n"
$stateLawFiles | ForEach-Object { Add-Content -Path $outputFile -Value "  - $_" }

Write-Host "✓ State Laws modules identified: $($stateLawFiles.Count) files" -ForegroundColor Green

# ============================================================================
# STEP 8: Internal Link Map
# ============================================================================
Write-Host "`n🔗 Mapping internal links..." -ForegroundColor Yellow

Add-Content -Path $outputFile -Value @"

================================================================================
🔗 INTERNAL LINK MAP
================================================================================

"@

# Find Link components
$linkFiles = Get-ChildItem -Path src,app -Recurse -File -ErrorAction SilentlyContinue | 
    Where-Object { $_.FullName -notmatch "node_modules" } |
    Select-String -Pattern "<Link|router\.push|useRouter" -List |
    Select-Object -ExpandProperty Path |
    Sort-Object -Unique

Add-Content -Path $outputFile -Value "Files using Next.js Link or router navigation:"
Add-Content -Path $outputFile -Value "Total: $($linkFiles.Count) files`n"
$linkFiles | ForEach-Object { Add-Content -Path $outputFile -Value "  - $_" }

Write-Host "✓ Internal links mapped: $($linkFiles.Count) files" -ForegroundColor Green

# ============================================================================
# STEP 9: Component Analysis
# ============================================================================
Write-Host "`n🧩 Analyzing component structure..." -ForegroundColor Yellow

Add-Content -Path $outputFile -Value @"

================================================================================
🧩 COMPONENT STRUCTURE ANALYSIS
================================================================================

"@

# Count components by directory
$srcComponents = (Get-ChildItem -Path "src/components" -Recurse -File -ErrorAction SilentlyContinue).Count
$appComponents = (Get-ChildItem -Path "app/components" -Recurse -File -ErrorAction SilentlyContinue).Count

Add-Content -Path $outputFile -Value "Component Distribution:"
Add-Content -Path $outputFile -Value "  - src/components/: $srcComponents files"
Add-Content -Path $outputFile -Value "  - app/components/: $appComponents files"
Add-Content -Path $outputFile -Value "  - Total: $($srcComponents + $appComponents) files"

Write-Host "✓ Component analysis completed" -ForegroundColor Green

# ============================================================================
# STEP 10: API Endpoints Detail
# ============================================================================
Write-Host "`n🔌 Analyzing API endpoints..." -ForegroundColor Yellow

Add-Content -Path $outputFile -Value @"

================================================================================
🔌 API ENDPOINTS DETAIL
================================================================================

"@

$apiFiles = Get-ChildItem -Path "app/api" -Recurse -Filter "route.ts" -File -ErrorAction SilentlyContinue
Add-Content -Path $outputFile -Value "API Endpoints Found: $($apiFiles.Count)`n"
$apiFiles | ForEach-Object { 
    $relativePath = $_.FullName -replace [regex]::Escape($PWD.Path), ""
    Add-Content -Path $outputFile -Value "  - $relativePath"
}

Write-Host "✓ API endpoints analyzed: $($apiFiles.Count) endpoints" -ForegroundColor Green

# ============================================================================
# STEP 11: Summary Statistics
# ============================================================================
Write-Host "`n📈 Generating summary statistics..." -ForegroundColor Yellow

Add-Content -Path $outputFile -Value @"

================================================================================
✅ SITEMAP VERIFICATION SUMMARY
================================================================================

Project Statistics:
- Total Pages: $pageCount
- Total Layouts: $layoutCount
- Total API Endpoints: $apiCount
- Total Code Files: $($tsxCount + $tsCount + $jsxCount + $jsCount)
- Total CSS Files: $cssCount
- Total Documentation Files: $mdCount

System Modules:
- Calculator System Files: $($calculatorFiles.Count)
- Mint AI System Files: $($mintFiles.Count)
- State Laws System Files: $($stateLawFiles.Count)
- Navigation/Routing Files: $($linkFiles.Count)

Component Distribution:
- src/components/: $srcComponents files
- app/components/: $appComponents files

Scan Completed: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Output File: $outputFile

================================================================================
"@

Write-Host "`n✅ Sitemap verification completed successfully!" -ForegroundColor Green
Write-Host "📄 Results saved to: $outputFile" -ForegroundColor Cyan
Write-Host "`nSummary:" -ForegroundColor Yellow
Write-Host "  - Pages: $pageCount" -ForegroundColor White
Write-Host "  - API Endpoints: $apiCount" -ForegroundColor White
Write-Host "  - Code Files: $($tsxCount + $tsCount + $jsxCount + $jsCount)" -ForegroundColor White
Write-Host "  - Calculator Files: $($calculatorFiles.Count)" -ForegroundColor White
Write-Host "  - Mint AI Files: $($mintFiles.Count)" -ForegroundColor White
Write-Host "  - State Laws Files: $($stateLawFiles.Count)" -ForegroundColor White

# Open the output file
Write-Host "`n🔍 Opening results file..." -ForegroundColor Cyan
Start-Process notepad.exe $outputFile

