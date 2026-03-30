import httpProxy from "http-proxy";
import http from "http";

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  const host = req.headers.host || "";

  // project1.yourapp.com → project1
  const subdomain = host.split(".")[0];

  // map to port (store this in DB ideally)
  const portMap: Record<string, number> = {
    project1: 3001,
    project2: 3002,
  };

  const port = portMap[subdomain];

  if (!port) {
    res.writeHead(404);
    return res.end("Project not found");
  }

  proxy.web(req, res, {
    target: `http://localhost:${port}`,
  });
});

server.listen(80, () => {
  console.log("🌍 Proxy running on port 80");
});