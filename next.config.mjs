const nextConfig = {
    reactStrictMode: true,
    trailingSlash: false,
    basePath: "",
    redirects: async () => [
        {
            source: "/",
            destination: "/",
            permanent: false,
        }
    ]
}

export default nextConfig;
