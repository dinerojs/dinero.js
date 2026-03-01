import { Users, X } from 'lucide-react';

import type { Person } from '@/types';

interface PersonListProps {
  people: Person[];
  onRemove(id: string): void;
}

export function PersonList({ people, onRemove }: PersonListProps) {
  if (people.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
          <Users className="h-8 w-8 text-text-muted" />
        </div>
        <p className="text-sm text-text-muted">
          Add people to split expenses with
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {people.map((person) => (
        <div
          key={person.id}
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-text-secondary"
        >
          <span className="font-medium">{person.name}</span>
          <button
            onClick={() => onRemove(person.id)}
            className="rounded-full opacity-60 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-visible:opacity-100"
            aria-label={`Remove ${person.name}`}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
