/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ibb.com',
            port: '',
            pathname: '/**', // Wildcard to match any dynamic value after / in the path
          },
        ],
        domains: ['ibb.co'],
      },
};

export default nextConfig;
