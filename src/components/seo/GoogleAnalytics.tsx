'use client';

import { GoogleAnalytics as GA } from '@next/third-parties/google';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-44S086500V';

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return <GA gaId={GA_MEASUREMENT_ID} />;
}