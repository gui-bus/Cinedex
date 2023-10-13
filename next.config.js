/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      {
        source: "/",
        destination: "/discover/now_playing",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
