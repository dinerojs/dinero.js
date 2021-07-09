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
      require('./scripts/generate.js');
    }

    return config;
  }
};
