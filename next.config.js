/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        path: '/',
    },
    exportPathMap: async (defaultPathMap, { dev, dir, outDir, distDir, buildId }) => {
        return {
            '/': { page: '/' },
        }
    }
}

module.exports = nextConfig