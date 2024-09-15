const withPWA = require('next-pwa')({
  dest: "public",
  disable: process.env.NODE_ENV === 'development'
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
        destination: '/api/:path*',
      },
    ];
  },
  webpack: (config) => {
    // Add support for `.mjs` files
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      },
    });
  
    // Add Babel loader for handling modern JavaScript syntax
    config.module.rules.push({
      test: /\.(js|mjs)$/,
      include: /node_modules/,
      exclude: /(react-icons|heic2any)/,  // Excluye módulos grandes
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
          cacheDirectory: true,
        },
      },
    });
  
    return config;
  },
});
