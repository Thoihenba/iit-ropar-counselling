# PowerShell helper to serve the current folder on localhost:8000
if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "Starting Python HTTP server on http://localhost:8000"
    python -m http.server 8000
} elseif (Get-Command py -ErrorAction SilentlyContinue) {
    Write-Host "Starting Python (py) HTTP server on http://localhost:8000"
    py -m http.server 8000
} else {
    Write-Host "Python not found — falling back to npx http-server on http://localhost:8000"
    npx http-server -p 8000
}
