/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "strapi.api.ledonjondehoudan.fr",
      },
      {
        protocol: "https",
        hostname: "strapi.api2.ledonjondehoudan.fr",
      },
    ],
  },
};

export default nextConfig;
