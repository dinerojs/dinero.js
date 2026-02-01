import type { Person } from '../types';

interface PersonListProps {
  people: Person[];
  onRemove(id: string): void;
}

export function PersonList({ people, onRemove }: PersonListProps) {
  if (people.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.03] mb-4">
          <svg
            className="w-8 h-8 text-slate-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <p className="text-slate-500">Add people to split expenses with</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {people.map((person) => (
        <div
          key={person.id}
          className="group pill pill-emerald animate-fade-in"
        >
          <span className="font-medium">{person.name}</span>
          <button
            onClick={() => onRemove(person.id)}
            className="opacity-60 hover:opacity-100 transition-opacity"
            aria-label={`Remove ${person.name}`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
