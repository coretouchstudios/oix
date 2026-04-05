const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/sandbox/:path*",
        destination: "/api/sandbox?path=:path*",
      },
    ];
  },
};

export default nextConfig;