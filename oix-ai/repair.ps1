if(!(Test-Path package.json)){npm init -y}
if(!(Test-Path node_modules)){npm install}

if(!(Test-Path app)){
    New-Item app -ItemType Directory | Out-Null
}

if(!(Test-Path app/layout.js)){
@"
export const metadata = { title: "OIX Control Center" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
"@ | Set-Content app/layout.js
}

if(Test-Path .next){
    Remove-Item .next -Recurse -Force
}

$p = (Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue).OwningProcess
if($p){
    Stop-Process -Id $p -Force
}

npm install

Write-Host "Next.js project repaired successfully 🚀"
