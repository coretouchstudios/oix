export const runtime = "nodejs";

export async function POST(req: Request) {
  const { files } = await req.json();

  // Convert files → HTML app
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
  const htmlFile =
    files.find((f) => f.name.includes("index.html"))?.content ||
    defaultHTML(files);

  return htmlFile;
}

/* =========================
   DEFAULT HTML (AUTO BUILD)
========================= */
function defaultHTML(files: any[]) {
  const js =
    files
      .filter((f) => f.name.endsWith(".js"))
      .map((f) => f.content)
      .join("\n") || "";

  const css =
    files
      .filter((f) => f.name.endsWith(".css"))
      .map((f) => f.content)
      .join("\n") || "";

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>${css}</style>
</head>
<body>
<div id="app"></div>

<script>
${js}
</script>
</body>
</html>
  `;
}