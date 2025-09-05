'use client';

import { faGripLines } from '@fa/classic/solid';
import { useTheme } from 'next-themes';

import { ButtonIcon } from '@/components/button-icon';

export default function Header() {
  const { setTheme, theme } = useTheme();

  return (
    <header className="bg-background border-border shadow-shadow z-[1] flex h-[54px] items-center justify-between border-b px-4">
      <h1 className="text-[22px] max-sm:text-base">
        <span className="font-bold">PEDAL</span>
        <span className="font-medium">PLAYGROUND</span>
      </h1>
      <div className="flex items-center gap-4">
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>toggle theme</button>
        <ButtonIcon icon={faGripLines} variant="secondary" size="sm" iconClassName="px-1.5" />
      </div>
    </header>
  );
}
