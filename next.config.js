// next.config.js
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    api: {
      externalResolver: true,
    },
  },
  async rewrites() {
    return [
      {
        source: '/api/contact/:path*',
        destination: '/api/contact/:path*',
      },
      {
        source: '/api/create/:path*',
        destination: '/api/create/:path*',
      },
    ];
  },
};
