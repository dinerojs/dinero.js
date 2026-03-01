interface SeatSliderProps {
  seats: number;
  onChange: (seats: number) => void;
}

export function SeatSlider({ seats, onChange }: SeatSliderProps) {
  const percentage = ((seats - 1) / 99) * 100;
  const label = `${seats}\u00a0user${seats > 1 ? 's' : ''}`;

  return (
    <div className="relative mt-14 px-4 sm:px-16 lg:px-40 xl:px-24">
      <div className="relative">
        <div
          className="absolute -top-10 -translate-x-1/2 rounded bg-foreground px-2 py-1 text-xs font-medium text-background"
          style={{ left: `${percentage}%` }}
          aria-hidden="true"
        >
          {label}
        </div>
        <input
          type="range"
          min={1}
          max={100}
          value={seats}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="Number of users"
          aria-valuetext={label}
          className="range-slider w-full touch-manipulation"
          style={{ '--progress': `${percentage}%` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
