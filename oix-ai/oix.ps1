param([string]$cmd)

switch ($cmd) {

"launch" {
    Write-Host "Launching OIX Platform..."
    ./oix-cli/commands/launch.ps1
}

"build" {
    ./oix-cli/commands/build.ps1
}

"frontend" {
    ./oix-cli/commands/frontend.ps1
}

"backend" {
    ./oix-cli/commands/backend.ps1
}

"default" {
    Write-Host "OIX Command System"
    Write-Host "Commands:"
    Write-Host "oix launch"
    Write-Host "oix build"
    Write-Host "oix frontend"
    Write-Host "oix backend"
}

}
