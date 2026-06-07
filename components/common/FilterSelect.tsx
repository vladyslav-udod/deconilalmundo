"use client";

import { useEffect, useId, useRef, useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  ariaLabel: string;
  className?: string;
}

export function FilterSelect({
  value,
  options,
  onChange,
  ariaLabel,
  className,
}: FilterSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listboxId = useId();

  const selected = options.find((o) => o.value === value) ?? options[0];

  // Close on outside pointerdown / Escape — fully under our control, so
  // opening one dropdown while another is open just swaps them cleanly.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Focus the list + sync the highlighted option when opening.
  useEffect(() => {
    if (!open) return;
    const i = options.findIndex((o) => o.value === value);
    setActiveIndex(i < 0 ? 0 : i);
    listRef.current?.focus();
  }, [open, value, options]);

  const choose = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onListKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(options[activeIndex].value);
        break;
      case "Escape":
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div
      className={`fs${open ? " open" : ""} ${className ?? ""}`}
      ref={rootRef}
    >
      <button
        type="button"
        className="fs-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
      >
        <span>{selected?.label}</span>
        <svg className="fs-caret" viewBox="0 0 12 8" aria-hidden="true">
          <path
            d="M1 1l5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          className="fs-list"
          role="listbox"
          tabIndex={-1}
          aria-label={ariaLabel}
          onKeyDown={onListKeyDown}
        >
          {options.map((o, i) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`fs-option${i === activeIndex ? " active" : ""}${
                o.value === value ? " selected" : ""
              }`}
              onClick={() => choose(o.value)}
              onMouseEnter={() => setActiveIndex(i)}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
