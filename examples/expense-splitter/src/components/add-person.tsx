import { useState } from 'react';

import type { Person } from '../types';

interface AddPersonProps {
  onAdd(person: Person): void;
}

export function AddPerson({ onAdd }: AddPersonProps) {
  const [name, setName] = useState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (!name.trim()) {
          return;
        }

        onAdd({ id: crypto.randomUUID(), name: name.trim() });
        setName('');
      }}
      className="flex gap-3"
    >
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter name"
        className="input-modern flex-1"
      />
      <button
        type="submit"
        disabled={!name.trim()}
        className="btn-primary whitespace-nowrap"
      >
        <span className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add
        </span>
      </button>
    </form>
  );
}
