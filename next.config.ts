import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  viewTransition: true,
  cacheComponents: true,
};

export default withNextIntl(nextConfig);
