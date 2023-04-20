const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/dashboards/crypto',
        destination: '/dashboards/crypto',
        permanent: true
      }
    ];
  }
};

module.exports = withImages(redirects);
