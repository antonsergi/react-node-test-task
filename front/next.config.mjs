/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://back:3040/api/:path*',
      }
    ]
  }
};

export default nextConfig;
