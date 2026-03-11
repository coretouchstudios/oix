export function generateBackend(startup) {

  return {
    runtime: "Node.js",
    api: [
      "/users",
      "/auth",
      "/products"
    ],
    database: "PostgreSQL"
  }

}
