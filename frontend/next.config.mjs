/** @type {import('next').NextConfig} */
const nextConfig = {
    // Tylko dla production build używamy static export
    ...(process.env.NODE_ENV === 'production' && process.env.BUILD_STATIC === 'true' ? {
        output: 'export',
        trailingSlash: true,
    } : {}),
    images: {
        unoptimized: true
    }
};

export default nextConfig;
