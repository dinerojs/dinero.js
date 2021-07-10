module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs',
        permanent: true,
      },
    ];
  },
  webpack(config, { isServer }) {
    if (isServer) {
      require('./scripts/generate-sitemap.js');
    }

    return config;
  }
};
