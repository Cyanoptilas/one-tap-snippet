/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { esmExternals: true },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "images.unsplash.com",
      process.env.R2_BUCKET_NAME +
        "." +
        process.env.R2_ACCOUNT_ID +
        ".r2.cloudflarestorage.com",
    ],
  },
};

module.exports = nextConfig;
