/** @type {import('next').NextConfig} */
// const nextConfig = {}

module.exports = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
