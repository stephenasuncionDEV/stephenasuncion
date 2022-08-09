/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
        SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN
    },
    images: {
        path: '/',
    },
    exportPathMap: async (defaultPathMap, { dev, dir, outDir, distDir, buildId }) => {
        return {
            '/': { page: '/' },
        }
    },
    async headers() { // From @FDisk https://stackoverflow.com/questions/62077589/setting-cache-control-header-for-static-file-serving-on-nextjs-default-server
        return [
            {
                source: '/:all*(svg|jpg|png)',
                locale: false,
                headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=9999999999, must-revalidate',
                }
                ],
            },
        ]
    },
}

module.exports = nextConfig