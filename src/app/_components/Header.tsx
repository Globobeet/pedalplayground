import { faGripLines } from '@fortawesome/free-solid-svg-icons';

import { ButtonIcon } from '@/components/button-icon';

export default function Header() {
  return (
    <header className="flex h-[54px] items-center justify-between border-b border-gray-300 bg-white px-4 shadow-xs">
      <h1 className="text-dark text-[22px]">
        <span className="font-bold">PEDAL</span>
        <span className="font-medium">PLAYGROUND</span>
      </h1>
      <ButtonIcon icon={faGripLines} variant="secondary" size="sm" iconClassName="px-1.5" />
    </header>
  );
}
