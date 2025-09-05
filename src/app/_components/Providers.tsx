'use client';

import { ClerkProvider } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import { type PropsWithChildren } from 'react';

const NextThemesProvider = dynamic(() => import('next-themes').then((e) => e.ThemeProvider), {
  ssr: false,
});

export default function Providers({ children }: PropsWithChildren) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ClerkProvider>{children}</ClerkProvider>
    </NextThemesProvider>
  );
}
