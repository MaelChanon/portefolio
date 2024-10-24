// next.config.js
/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
    // Alternative plus simple si vous avez confiance en les domaines
    domains: ['localhost'],
  },
  serverRuntimeConfig: {
    graphqlUrl: process.env.GQL_URL || 'http://localhost:4000/graphql',
  },
  // Optionnel : si vous voulez aussi accéder à l'URL côté client
  publicRuntimeConfig: {
    graphqlUrl: process.env.GQL_URL || 'http://localhost:4000/graphql',
  },
  // Autres configurations Next.js si nécessaire
};

module.exports = nextConfig;
