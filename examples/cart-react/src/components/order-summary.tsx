import type { Dinero } from 'dinero.js';
import { ShoppingCart } from 'lucide-react';

import { formatMoney } from '@/lib/money';
import type { CurrencyCode, ShippingOption } from '@/types';

interface OrderSummaryProps {
  itemCount: number;
  subtotal: Dinero<number>;
  vatAmount: Dinero<number>;
  vatRate: number;
  shippingAmount: Dinero<number>;
  total: Dinero<number>;
  currencyCode: CurrencyCode;
  shipping: string;
  shippingOptions: Array<ShippingOption & { convertedPrice: Dinero<number> }>;
  hasItems: boolean;
  onShippingChange: (value: string) => void;
}

export function OrderSummary({
  itemCount,
  subtotal,
  vatAmount,
  vatRate,
  shippingAmount,
  total,
  currencyCode,
  shipping,
  shippingOptions,
  hasItems,
  onShippingChange,
}: OrderSummaryProps) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-border pb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Order Summary
          </h2>
          <div className="relative">
            <ShoppingCart
              className="h-5 w-5 text-text-secondary"
              aria-hidden="true"
            />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-1.5 rounded-full bg-primary px-1.5 text-[10px] font-medium text-primary-foreground">
                {itemCount}
              </span>
            )}
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Subtotal</span>
            <span className="text-sm font-medium tabular-nums text-foreground">
              {formatMoney(subtotal, currencyCode)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">
              VAT ({vatRate}%)
            </span>
            <span className="text-sm font-medium tabular-nums text-foreground">
              {formatMoney(vatAmount, currencyCode)}
            </span>
          </div>
          <div>
            <label
              htmlFor="shipping"
              className="mb-2 block text-sm text-text-secondary"
            >
              Shipping
            </label>
            <div className="flex items-center justify-between gap-4">
              <select
                id="shipping"
                name="shipping"
                value={shipping}
                onChange={(event) => onShippingChange(event.target.value)}
                disabled={!hasItems}
                className="block w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-30"
              >
                {shippingOptions.map(({ label, convertedPrice }) => (
                  <option key={label} value={label}>
                    {label} — {formatMoney(convertedPrice, currencyCode)}
                  </option>
                ))}
              </select>
              <span className="shrink-0 text-sm font-medium tabular-nums text-foreground">
                {formatMoney(shippingAmount, currencyCode)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-6">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Total</span>
          <span className="text-base font-semibold tabular-nums text-foreground">
            {formatMoney(total, currencyCode)}
          </span>
        </div>
        <button
          type="button"
          className="w-full touch-manipulation rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
