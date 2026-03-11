
Write-Host "🔧 OIX AUTO-REPAIR STARTING..."

# package.json
if(!(Test-Path package.json)){
Write-Host "Creating package.json"
@"
{
"name":"oix-dashboard",
"private":true,
"scripts":{
"dev":"next dev --turbopack",
"build":"next build",
"start":"next start"
},
"dependencies":{
"next":"16.1.6",
"react":"^19.0.0",
"react-dom":"^19.0.0",
"zustand":"^4.5.2",
"reactflow":"^11.11.4",
"xterm":"^5.3.0"
}
}
"@ | Set-Content package.json
}

# next config
if(!(Test-Path next.config.js)){
Write-Host "Creating next.config.js"
@"
/** @type {import('next').NextConfig} */
const nextConfig = {
experimental:{
serverActions:true
}
}
module.exports = nextConfig
"@ | Set-Content next.config.js
}

# tsconfig
if(!(Test-Path tsconfig.json)){
Write-Host "Creating tsconfig.json"
@"
{
"compilerOptions":{
"target":"es6",
"lib":["dom","dom.iterable","esnext"],
"allowJs":true,
"skipLibCheck":true,
"strict":false,
"forceConsistentCasingInFileNames":true,
"noEmit":true,
"esModuleInterop":true,
"module":"esnext",
"moduleResolution":"bundler",
"resolveJsonModule":true,
"isolatedModules":true,
"jsx":"preserve"
},
"include":["next-env.d.ts","**/*.ts","**/*.tsx"],
"exclude":["node_modules"]
}
"@ | Set-Content tsconfig.json
}

# ensure app folder
if(!(Test-Path app)){
mkdir app
}

# ensure layout
if(!(Test-Path app/layout.tsx)){
@"
import '../styles/globals.css'

export default function RootLayout({children}:any){
return(
<html>
<body>
{children}
</body>
</html>
)
}
"@ | Set-Content app/layout.tsx
}

# ensure homepage
if(!(Test-Path app/page.tsx)){
@"
export default function Page(){
return(
<div style={{padding:40}}>
<h1>OIX AI OS</h1>
<p>System Ready</p>
</div>
)
}
"@ | Set-Content app/page.tsx
}

# styles
if(!(Test-Path styles)){
mkdir styles
}

if(!(Test-Path styles/globals.css)){
@"
body{
margin:0;
background:#070b14;
color:white;
font-family:system-ui;
}
"@ | Set-Content styles/globals.css
}

Write-Host "📦 Installing dependencies..."
npm install

Write-Host "🚀 OIX PROJECT REPAIRED"
Write-Host "Run: npm run dev"

