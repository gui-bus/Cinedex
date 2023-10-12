/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      {
        source: "/",
        destination: "/discover/now",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
