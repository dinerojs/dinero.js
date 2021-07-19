module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/docs/advanced/:slug*',
        destination: '/docs/guides/:slug*',
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
