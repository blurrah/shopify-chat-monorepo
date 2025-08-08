import type { NextConfig } from "next";
import { withRemoteComponents } from 'remote-components/next/config';
import { withMicrofrontends } from '@vercel/microfrontends/next/config';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
          },
        ],
      },
    ];
  },
};

export default withRemoteComponents(withMicrofrontends(nextConfig));
