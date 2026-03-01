const DISCOUNT_RATE = 10;

interface PricingToggleProps {
  monthlyBilling: boolean;
  onToggle: (monthly: boolean) => void;
}

export function PricingToggle({
  monthlyBilling,
  onToggle,
}: PricingToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Billing period"
      className="relative mt-6 flex gap-0.5 self-center rounded-lg bg-muted p-0.5 sm:mt-8"
    >
      <button
        type="button"
        role="radio"
        aria-checked={monthlyBilling}
        onClick={() => onToggle(true)}
        className={`relative rounded-md px-8 py-2 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
          monthlyBilling
            ? 'bg-card text-foreground shadow-sm'
            : 'text-text-secondary hover:bg-card/50 hover:text-foreground'
        }`}
      >
        Monthly
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={!monthlyBilling}
        onClick={() => onToggle(false)}
        className={`relative rounded-md px-8 py-2 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
          !monthlyBilling
            ? 'bg-card text-foreground shadow-sm'
            : 'text-text-secondary hover:bg-card/50 hover:text-foreground'
        }`}
      >
        Yearly
        <span
          className={`ml-2 -mr-4 rounded-full px-2 py-0.5 text-xs ${
            !monthlyBilling
              ? 'bg-primary/20 text-primary'
              : 'bg-primary/10 text-primary/70'
          }`}
        >
          -{DISCOUNT_RATE}%
        </span>
      </button>
    </div>
  );
}
