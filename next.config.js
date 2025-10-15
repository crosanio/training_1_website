/** @type {import('next').NextConfig} */
const nextConfig = {
    // CSS Modules are enabled by default in Next.js
    // This configuration ensures optimal setup
    experimental: {
        // Enable latest features
    },
    // Enable source maps in development
    productionBrowserSourceMaps: false,
}

module.exports = nextConfig
