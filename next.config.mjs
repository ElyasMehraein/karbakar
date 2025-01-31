const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'trustseal.enamad.ir',
            },
        ],
    },
}
export default nextConfig;
