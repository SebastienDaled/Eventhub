/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  images: {
    domains: [
      process.env.NEXT_IMAGE_DOMAIN,
      'placehold.co',
      's1.ticketm.net',
      'media.ticketmaster.eu',
      'maps.ticketmaster.com',
      
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
