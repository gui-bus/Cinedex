/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      {
        source: "/",
        destination: "/discover/tv",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
