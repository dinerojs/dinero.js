import { useState } from 'react';
import { Plus } from 'lucide-react';

import type { Person } from '@/types';

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
        placeholder="Enter name…"
        aria-label="Person name"
        className="flex-1 rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-text-muted transition-[border-color,box-shadow] duration-150 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
      />
      <button
        type="submit"
        disabled={!name.trim()}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add
        </span>
      </button>
    </form>
  );
}
