module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        domains: ['example.com'], 
        port: '',
        pathname: '/**', // Wildcard to match any dynamic value after / in the path
      },
    ],
    domains: ['ibb.co'],
  },
};
