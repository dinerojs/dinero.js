import type { Dinero } from 'dinero.js';
import { Minus, Plus, Trash2 } from 'lucide-react';

import { multiply, formatMoney } from '@/lib/money';
import type { CurrencyCode } from '@/types';

interface CartLineProps {
  name: string;
  brand: string;
  image: string;
  quantity: number;
  price: Dinero<number>;
  currencyCode: CurrencyCode;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CartLine({
  name,
  brand,
  image,
  quantity,
  price,
  currencyCode,
  onIncrease,
  onDecrease,
  onRemove,
}: CartLineProps) {
  const totalPrice = multiply(price, quantity);
  const canDecrease = quantity > 1;

  return (
    <div className="flex items-center gap-4 rounded-lg px-4 py-4 transition-colors duration-150 hover:bg-muted/50">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-white p-2 xl:h-20 xl:w-20">
          <img
            className="h-12 w-auto object-contain xl:h-16"
            src={image}
            alt=""
            width={64}
            height={64}
            loading="lazy"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="truncate text-sm font-semibold text-foreground">
            {name}
          </h3>
          <p className="text-xs text-text-muted">{brand}</p>
          <button
            onClick={onRemove}
            className="mt-1 inline-flex w-fit items-center gap-1 rounded text-xs text-text-muted transition-colors duration-150 hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Remove ${name} from cart`}
          >
            <Trash2 className="h-3 w-3" aria-hidden="true" />
            Remove
          </button>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          className="touch-manipulation rounded-md border border-border p-1 transition-colors duration-150 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-30"
          disabled={!canDecrease}
          onClick={onDecrease}
          aria-label={`Decrease quantity of ${name}`}
        >
          <Minus
            className="h-3.5 w-3.5 text-text-secondary"
            aria-hidden="true"
          />
        </button>
        <span className="w-8 text-center text-sm tabular-nums text-foreground">
          {quantity}
        </span>
        <button
          className="touch-manipulation rounded-md border border-border p-1 transition-colors duration-150 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
          onClick={onIncrease}
          aria-label={`Increase quantity of ${name}`}
        >
          <Plus
            className="h-3.5 w-3.5 text-text-secondary"
            aria-hidden="true"
          />
        </button>
      </div>
      <span className="w-24 text-right text-sm tabular-nums text-text-secondary">
        {formatMoney(price, currencyCode)}
      </span>
      <span className="w-24 text-right text-sm font-medium tabular-nums text-foreground">
        {formatMoney(totalPrice, currencyCode)}
      </span>
    </div>
  );
}
