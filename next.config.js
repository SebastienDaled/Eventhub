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
      'via.placeholder.com',
      'www.youtube.com/watch',
      "images.universe.com",
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
