export const runtime = "nodejs";

export async function POST(req: Request) {
  const { files } = await req.json();

  const html = buildHTML(files);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}

/* =========================
   BUILD HTML FROM FILES
========================= */
function buildHTML(files: any[]) {
  const index =
    files.find((f) =>
      f.name.toLowerCase().includes("index.html")
    )?.content || null;

  if (index) {
    return injectAssets(index, files);
  }

  return defaultHTML(files);
}

/* =========================
   INJECT JS + CSS INTO HTML
========================= */
function injectAssets(html: string, files: any[]) {
  const css = files
    .filter((f) => f.name.endsWith(".css"))
    .map((f) => `<style>${f.content}</style>`)
    .join("\n");

  const js = files
    .filter((f) => f.name.endsWith(".js"))
    .map((f) => `<script>${f.content}</script>`)
    .join("\n");

  return `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        margin: 0;
        background: #0b0b0f;
        color: white;
        font-family: sans-serif;
      }
    </style>
    ${css}
  </head>
  <body>
    ${html}
    ${js}
  </body>
</html>
`;
}

/* =========================
   DEFAULT HTML (AUTO BUILD)
========================= */
function defaultHTML(files: any[]) {
  const css = files
    .filter((f) => f.name.endsWith(".css"))
    .map((f) => `<style>${f.content}</style>`)
    .join("\n");

  const js = files
    .filter((f) => f.name.endsWith(".js"))
    .map((f) => `<script>${f.content}</script>`)
    .join("\n");

  return `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        margin: 0;
        background: #0b0b0f;
        color: white;
        font-family: sans-serif;
      }
    </style>
    ${css}
  </head>
  <body>
    <div style="padding:20px;">
      🚀 Preview Running
    </div>
    ${js}
  </body>
</html>
`;
}


