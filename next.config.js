/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/me",
        destination: "https://api.coinpaprika.com/v1/coins/btc-bitcoin",
      },
      {
        source: "/api/campaigns",
        destination: "https://api.coinpaprika.com/v1/coins/eth-ethereum",
      },
      // {
      //   source: '/api/campaigns/:id',
      //   destination: 'https://api.coinpaprika.com/v1/coins/:id'
      // },
      {
        source: "/api/users",
        destination: "https://api.coinpaprika.com/v1/coins/eth-ethereum",
      },
      // {
      //   source: ' /api/users/:id',
      //   destination: 'https://api.coinpaprika.com/v1/coins/:id'
      // },
      {
        source: "/api/users/:email/exists",
        destination: "https://api.coinpaprika.com/v1/coins/:email",
      },
    ];
  },
};

module.exports = nextConfig;
