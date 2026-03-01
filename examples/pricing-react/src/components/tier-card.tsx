import type { Dinero } from 'dinero.js';
import { Check } from 'lucide-react';

import { multiply, allocate, subtract, isZero, formatMoney } from '@/lib/money';

const DISCOUNT_RATE = 10;

interface TierCardProps {
  name: string;
  description: string;
  featuresHeading: string;
  features: string[];
  price: Dinero<number>;
  monthlyBilling: boolean;
  isActive: boolean;
}

export function TierCard({
  name,
  description,
  featuresHeading,
  features,
  price,
  monthlyBilling,
  isActive,
}: TierCardProps) {
  return (
    <div
      className={`flex h-full flex-col rounded-lg border border-border bg-card transition-opacity duration-150 ${
        isActive ? '' : 'opacity-40'
      }`}
    >
      <div className="flex flex-col p-6">
        <h2 className="text-lg font-semibold text-foreground">{name}</h2>
        <p className="mt-2 text-sm text-text-secondary">{description}</p>
        <p className="mt-8 flex items-baseline gap-1">
          {monthlyBilling ? (
            <MonthlyPrice price={price} />
          ) : (
            <YearlyPrice price={price} />
          )}
        </p>
        <button
          type="button"
          disabled={!isActive}
          className="mt-8 block w-full rounded-md border border-primary bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buy {name}
        </button>
      </div>
      <div className="border-t border-border px-6 pt-6 pb-8 flex-1">
        <h3 className="text-xs font-medium tracking-wide text-foreground uppercase">
          {featuresHeading}
        </h3>
        <ul className="mt-6 space-y-4">
          {features.map((feature) => (
            <li key={feature} className="flex min-w-0 items-center gap-3">
              <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-positive/10">
                <Check className="size-3 text-positive" aria-hidden="true" />
              </div>
              <span className="text-sm text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MonthlyPrice({ price }: { price: Dinero<number> }) {
  return (
    <>
      <span className="text-3xl font-bold tabular-nums text-foreground">
        {formatMoney(price)}
      </span>
      <span className="flex flex-col text-xs font-medium text-text-muted">
        <span>per month</span>
      </span>
    </>
  );
}

function YearlyPrice({ price }: { price: Dinero<number> }) {
  const fullPrice = multiply(price, 12);
  const [discount] = allocate(fullPrice, [DISCOUNT_RATE, 100 - DISCOUNT_RATE]);
  const discountedPrice = subtract(fullPrice, discount);

  return (
    <>
      <span className="text-3xl font-bold tabular-nums text-foreground">
        {formatMoney(discountedPrice)}
      </span>
      <span className="flex flex-col text-xs font-medium text-text-muted">
        {!isZero(fullPrice) && (
          <span className="tabular-nums line-through">
            {formatMoney(fullPrice)}
          </span>
        )}
        <span>per year</span>
      </span>
    </>
  );
}
