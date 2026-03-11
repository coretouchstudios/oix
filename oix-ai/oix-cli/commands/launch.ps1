Write-Host "Launching FULL OIX SYSTEM"

Start-Job { powershell -ExecutionPolicy Bypass -File oix.ps1 backend }

Start-Sleep 3

Start-Job { powershell -ExecutionPolicy Bypass -File oix.ps1 frontend }

Write-Host "OIX SYSTEM RUNNING"
Write-Host "Frontend: http://localhost:3000"
Write-Host "Backend: running"
