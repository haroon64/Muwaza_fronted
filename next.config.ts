/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3300",
        pathname: "/rails/active_storage/**",
      },
    ],
  },
};

module.exports = nextConfig;
