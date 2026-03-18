'use client';

import { faCaretDown } from '@fa/classic/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { rankItem } from '@tanstack/match-sorter-utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { cx } from '@/utils';

import Dropdown from '../dropdown/Dropdown';

export type ComboOption<V = string> = {
  id: string;
  value: V;
  label: string;
};

export type ComboGroup<V = string> = {
  groupLabel: string;
  options: ComboOption<V>[];
};

export type ComboboxData<V = string> = ComboOption<V> | ComboGroup<V>;

export interface ComboboxProps<V = string> {
  options: ComboboxData<V>[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  placeholder?: string;
  className?: string;
}

const isGroup = <V,>(item: ComboboxData<V>): item is ComboGroup<V> =>
  (item as ComboGroup<V>).options !== undefined;

type Row<V = string> =
  | { type: 'group'; key: string; label: string }
  | { type: 'option'; key: string; option: ComboOption<V> }
  | { type: 'separator'; key: string };

const rowsFromData = <V,>(data: ComboboxData<V>[]): Row<V>[] => {
  const rows: Row<V>[] = [];
  data.forEach((item, i) => {
    if (isGroup(item)) {
      rows.push({ type: 'group', key: `g-${i}`, label: item.groupLabel });
      item.options.forEach((o) => rows.push({ type: 'option', key: o.id, option: o }));
      rows.push({ type: 'separator', key: `s-${i}` });
    } else {
      rows.push({ type: 'option', key: item.id, option: item });
    }
  });
  return rows;
};

export function Combobox<V = string>({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = 'Select…',
  className,
}: ComboboxProps<V>) {
  const isControlled = value !== undefined;
  const [internalId, setInternalId] = useState<string | undefined>(defaultValue);
  const selectedId = isControlled ? value : internalId;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const allOptions = useMemo(() => options.flatMap((d) => (isGroup(d) ? d.options : d)), [options]);

  const selectedOption = allOptions.find((o) => o.id === selectedId);

  const filtered = useMemo<ComboboxData<V>[]>(() => {
    const q = query.trim();

    if (!q) return options;

    const result: ComboboxData<V>[] = [];

    for (const item of options) {
      if (isGroup(item)) {
        const groupRank = rankItem(item.groupLabel, q);
        if (groupRank.passed) {
          result.push(item);
        } else {
          const matched = item.options
            .map((o) => {
              const r = rankItem(o.label, q);
              return r.passed ? { opt: o, rank: r.rankedValue } : null;
            })
            .filter(Boolean) as Array<{ opt: ComboOption<V>; rank: number }>;

          if (matched.length) {
            matched.sort((a, b) => a.rank - b.rank);
            result.push({
              groupLabel: item.groupLabel,
              options: matched.map((m) => m.opt),
            });
          }
        }
      } else {
        const r = rankItem(item.label, q);
        if (r.passed) {
          result.push(item);
        }
      }
    }

    return result;
  }, [query, options]);

  const rows = useMemo(() => rowsFromData(filtered), [filtered]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: (idx) => {
      const r = rows[idx];
      return r.type === 'group' ? 28 : r.type === 'separator' ? 8 : 32;
    },
    measureElement: (el) => el.getBoundingClientRect().height,
    overscan: 6,
  });

  useLayoutEffect(() => {
    if (open) {
      requestAnimationFrame(() => rowVirtualizer.measure());
    }
  }, [open, rowVirtualizer]);

  const onSelect = (id: string) => {
    if (!isControlled) {
      setInternalId(id);
    }
    onChange?.(id);
    setOpen(false);
    setQuery('');
  };

  return (
    <div className={cx('relative w-full', className)}>
      <Dropdown open={open} onOpenChange={setOpen} align="center">
        <Dropdown.Trigger>
          <button
            type="button"
            className="bg-foreground flex w-full items-center justify-between gap-2 rounded border border-gray-700 px-3 py-2 text-sm hover:border-gray-600"
          >
            <span className={cx({ 'text-gray-400': !selectedOption })}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <FontAwesomeIcon
              icon={faCaretDown}
              className={cx('h-3 w-3 transition-transform duration-200', { 'rotate-180': open })}
            />
          </button>
        </Dropdown.Trigger>

        <Dropdown.Menu
          className="w-[var(--radix-dropdown-menu-trigger-width)]"
          onPointerMoveCapture={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="pb-2">
            <input
              autoFocus
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="bg-foreground w-full rounded border border-gray-700 px-2 py-1 text-sm"
            />
          </div>

          <Dropdown.Separator />

          {rows.length ? (
            <div ref={scrollRef} className="max-h-64 overflow-y-auto">
              <div
                style={{
                  height: rowVirtualizer.getTotalSize(),
                  position: 'relative',
                }}
              >
                {rowVirtualizer.getVirtualItems().map((vr) => {
                  const row = rows[vr.index];
                  const style: React.CSSProperties = {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${vr.start}px)`,
                  };

                  if (row.type === 'group') {
                    return (
                      <div
                        key={row.key}
                        className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase"
                        style={style}
                      >
                        {row.label}
                      </div>
                    );
                  }

                  if (row.type === 'separator') {
                    return <Dropdown.Separator key={row.key} style={style} />;
                  }

                  return (
                    <Dropdown.MenuItem
                      key={row.option.id}
                      closeOnSelect={false}
                      className={cx({ 'bg-foreground': row.option.id === selectedId })}
                      onClick={() => onSelect(row.option.id)}
                      onFocus={(e) => {
                        e.preventDefault();
                        inputRef.current?.focus();
                      }}
                      style={style}
                    >
                      {row.option.label}
                    </Dropdown.MenuItem>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-400">No results</div>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
