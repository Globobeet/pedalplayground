import type { Metadata } from 'next';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@xyflow/react/dist/style.css';

import { inter } from '@/styles/fonts';
import '@/styles/globals.css';

import Providers from './_components/Providers';

config.autoAddCss = false;

export const metadata: Metadata = {
  title: {
    template: '%s | Pedal Playground',
    default: 'Pedal Playground',
  },
  description:
    'PedalPlayground.com is an interactive planning tool for planning your guitar effects pedalboard.',
  keywords: [
    'pedalboard',
    'effects',
    'fx',
    'guitar',
    'stompboxes',
    'planner',
    'pedalboard planner',
    'pedalboard builder',
  ],
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: 'favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: 'favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: 'apple-touch-icon.png',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.className} lang="en">
      <body className="antialiased">
        <Providers>
          <main className="flex min-h-screen flex-col items-stretch">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

export const dynamic = 'auto';
export const revalidate = 600; // 10 minutes
