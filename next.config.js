const withPWA = require('next-pwa')({
   dest: "public", 
  cacheOnFrontEndNav: true,
  aggresiveFrontEndNavCachig: true,
  reloadOnOnline:true,
  swcMinify: true,
  disable: false,
  workboxOptions:{
    disableDevLogs: true,
  }
});

module.exports = withPWA({
  images: {
    domains: ['res.cloudinary.com', 'localhost', 'centrocomercialwilde.com'],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/contact', // Ensure this matches the path of your file
      },
    ];
  },
});
