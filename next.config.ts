import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Bypass-Tunnel-Reminder',
            value: 'true',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
