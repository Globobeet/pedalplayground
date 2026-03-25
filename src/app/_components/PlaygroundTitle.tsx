'use client';

import { faCheck, faPen, faXmark } from '@fa/classic/solid';
import { useRef, useState } from 'react';

import { ButtonIcon } from '@/components/button-icon';
import { usePlaygroundStore } from '@/store/playground';

const PLACEHOLDER = 'Untitled Playground';

export default function PlaygroundTitle() {
  const name = usePlaygroundStore((s) => s.playground.name);
  const updateName = usePlaygroundStore((s) => s.updateName);

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const displayName = name || PLACEHOLDER;

  const startEditing = () => {
    setDraft(name);
    setIsEditing(true);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const submit = () => {
    updateName(draft.trim());
    setIsEditing(false);
  };

  const cancel = () => {
    setDraft(name);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit();
    } else if (e.key === 'Escape') {
      cancel();
    }
  };

  const handleBlur = () => {
    if (draft === name) {
      cancel();
      return;
    }
    submit();
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-1">
        {isEditing ? (
          <>
            <input
              ref={inputRef}
              value={draft}
              maxLength={50}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder={PLACEHOLDER}
              className="text-secondary min-w-0 flex-1 bg-transparent text-lg font-semibold outline-none"
            />
            <ButtonIcon
              icon={faXmark}
              size="sm"
              variant="icon"
              iconClassName="text-gray-500 hover:text-gray-500/80"
              onMouseDown={(e) => e.preventDefault()}
              onClick={cancel}
            />
            {/* <ButtonIcon
              icon={faCheck}
              size="sm"
              variant="icon"
              iconClassName="text-green-500 hover:text-green-500/80"
              onMouseDown={(e) => e.preventDefault()}
              onClick={submit}
            /> */}
          </>
        ) : (
          <button onClick={startEditing} className="flex min-w-0 cursor-pointer items-center gap-1">
            <span className="text-secondary truncate text-lg font-semibold">{displayName}</span>
            <ButtonIcon icon={faPen} size="sm" variant="icon" tabIndex={-1} />
          </button>
        )}
      </div>
      <span className="text-primary text-sm font-semibold">Sign in to save</span>
    </div>
  );
}
