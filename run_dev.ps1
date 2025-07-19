# Configuration
$repoUrl = "https://github.com/shreshta-smg/website.git"
$destDir = "website"

Write-Host "Starting Git clone for $repoUrl..."

# Clone the repository
git clone $repoUrl $destDir

# Check if clone was successful (ErrorLevel 0 means success)
if ($LASTEXITCODE -eq 0) {
    Write-Host "Clone successful. Navigating to $destDir and running npm run dev..."
    # Navigate to the cloned directory
    Set-Location $destDir
    
    # Run npm run dev
    npm run dev
} else {
    Write-Error "Git clone failed. Exiting."
    exit 1
}