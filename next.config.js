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