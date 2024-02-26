/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
    domains: ['placehold.co'],
    domains: ['eventhubdrupal.ddev.site']
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
