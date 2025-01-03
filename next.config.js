/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.cache = {
        type: 'filesystem',
        allowCollectingMemory: true,
        buildDependencies: {
          config: [__filename],
        },
        name: `${process.env.NODE_ENV}-cache`,
        version: `${process.env.NODE_ENV}-1`
      }
    }
    return config
  }
}

module.exports = nextConfig
