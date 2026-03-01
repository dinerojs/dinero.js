import { useState } from 'react';

import { CartLine } from '@/components/cart-line';
import { OrderSummary } from '@/components/order-summary';
import { items as initialItems, shipping as shippingOptions } from '@/data';
import {
  add,
  multiply,
  allocate,
  fromMinorUnits,
  convertCurrency,
  zero,
} from '@/lib/money';
import type { CurrencyCode, CartItem } from '@/types';

const CURRENCY_OPTIONS: Array<{ code: CurrencyCode; symbol: string }> = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
];

const VAT_RATE = 20;

const LOGO = (
  <svg
    viewBox="0 0 361.4 213.6"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-auto"
    aria-hidden="true"
  >
    <path
      fill="#4466ff"
      d="M361.4 147.8h-41.1v-8.2c0-2.8-.1-5.5-.3-8.2h41.4V115h-43.5c-3.4-16.7-10.2-32.1-19.6-45.6 8.7-21 7.3-45.3-4.2-65.3-1.5-2.5-4.2-4.1-7.2-4.1-20 0-39 8.2-52.7 22.1-11.7-3.7-24.2-5.7-37.1-5.7h-32.8c-12.9 0-25.4 2-37.1 5.7C113.5 8.2 94.5 0 74.5 0c-2.9 0-5.6 1.6-7.1 4.1-11.5 20-12.9 44.3-4.2 65.3C53.8 82.9 47 98.3 43.6 115H0v16.4h41.4c-.2 2.7-.3 5.5-.3 8.2v8.2H0v16.4h41.1v49.3h279.3v-49.3h41.1v-16.4h-.1z"
    />
    <path
      fill="#fff"
      d="M197.1 32.9h-32.8c-58.9 0-106.8 47.9-106.8 106.8v57.5h246.3v-57.5c.1-58.9-47.8-106.8-106.7-106.8z"
    />
    <path
      fill="#4466ff"
      d="M96.7 115c-3.3 0-5.3-3.7-3.4-6.4 3.2-4.6 9.5-10 21.7-10 17 0 26.2 9.8 30.3 15.9 1.1 1.6-.3 3.6-2.2 3.2-4.8-1.2-13.6-2.6-28.1-2.6H96.7v-.1z"
    />
    <path
      fill="#f7a"
      d="M180.7 123.7c11 0 16.4 0 16.4 5.5 0 4-8.7 8-13.5 9.9-1.9.8-4 .8-5.9 0-4.7-1.9-13.5-5.9-13.5-9.8.1-5.6 5.6-5.6 16.5-5.6z"
    />
    <path
      fill="#4466ff"
      d="M118.7 148.3c-.7-1.3 1-2.7 2.1-1.7 5 4.5 13.6 9.4 27.1 9.4 16.4 0 24.6-8.2 32.9-8.2 8.2 0 16.4 8.2 32.9 8.2 13.5 0 22.1-5 27.1-9.4 1.1-1 2.8.3 2.1 1.7-4.5 8.5-13.5 20.1-29.2 20.1-16.4 0-24.6-8.2-32.8-8.2-8.2 0-16.4 8.2-32.8 8.2-15.9 0-24.9-11.6-29.4-20.1z"
    />
    <circle cx="82.1" cy="147.8" r="16.4" fill="#bcf" />
    <path
      fill="#bcf"
      d="M197.1 32.9h-32.8c-1 0-1.9.1-2.8.1-2.9 16.1 9.6 35.3 29.9 29.2 10.7-3.2 27.8-7.1 36.7 2.5 7.8 8.5 1.5 22.7 6.8 33 11.4 21.8 42.9 24.2 66.8 20.2-10.1-48.5-53.2-85-104.6-85z"
    />
    <path
      fill="#4466ff"
      d="M264.7 115c3.3 0 5.3-3.7 3.4-6.4-3.2-4.6-9.5-10-21.7-10-17 0-26.2 9.8-30.3 15.9-1 1.6.3 3.6 2.2 3.2 4.8-1.2 13.6-2.6 28.1-2.6h18.3v-.1z"
    />
    <circle cx="279.3" cy="147.8" r="16.4" fill="#bcf" />
  </svg>
);

export default function App() {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [shipping, setShipping] = useState(shippingOptions[0].label);
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('USD');

  const hasItems = items.length > 0;

  const convertedItems = items.map((item) => ({
    ...item,
    dineroPrice: convertCurrency(
      fromMinorUnits(item.price, 'USD'),
      currencyCode
    ),
  }));

  const convertedShippingOptions = shippingOptions.map((option) => ({
    ...option,
    convertedPrice: convertCurrency(
      fromMinorUnits(option.price, 'USD'),
      currencyCode
    ),
  }));

  const shippingOption = convertedShippingOptions.find(
    ({ label }) => label === shipping
  )!;

  const { count, subtotal } = convertedItems.reduce(
    (acc, item) => ({
      count: acc.count + item.quantity,
      subtotal: add(acc.subtotal, multiply(item.dineroPrice, item.quantity)),
    }),
    { count: 0, subtotal: zero(currencyCode) }
  );

  const shippingAmount = hasItems
    ? shippingOption.convertedPrice
    : zero(currencyCode);
  const [vatAmount] = allocate(subtotal, [VAT_RATE, 100 - VAT_RATE]);
  const total = [subtotal, vatAmount, shippingAmount].reduce(add);

  function updateItem(
    name: string,
    updater: (item: CartItem) => CartItem | null
  ) {
    setItems((prev) => {
      const index = prev.findIndex((item) => item.name === name);

      if (index === -1) return prev;

      const result = updater(prev[index]);

      if (result === null) {
        return prev.filter((_, i) => i !== index);
      }

      return prev.map((item, i) => (i === index ? result : item));
    });
  }

  return (
    <main className="flex h-screen flex-col">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {LOGO}
          <h1 className="truncate text-sm font-semibold text-foreground">
            Shopping Cart
          </h1>
          <span className="hidden whitespace-nowrap rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary sm:inline">
            Built with Dinero.js
          </span>
        </div>
        <a
          href="https://github.com/dinerojs/dinero.js/tree/main/examples/cart-react"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-sm text-xs text-text-muted transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          GitHub
          <span className="hidden sm:inline"> source</span>
        </a>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="flex flex-1 flex-col border-b border-border lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <span className="text-xs font-medium text-text-muted">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
            <div className="flex items-center gap-2">
              <label htmlFor="currency" className="text-xs text-text-muted">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={currencyCode}
                onChange={(event) =>
                  setCurrencyCode(event.target.value as CurrencyCode)
                }
                className="rounded-lg border border-border bg-muted px-3 py-1.5 text-sm text-foreground transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring"
              >
                {CURRENCY_OPTIONS.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.code} ({option.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            {hasItems ? (
              <div>
                <div className="mb-2 hidden items-center px-4 sm:flex">
                  <span className="min-w-0 flex-1 text-xs font-medium tracking-wide text-text-muted">
                    Product
                  </span>
                  <span className="w-[7.5rem] text-right text-xs font-medium tracking-wide text-text-muted">
                    Quantity
                  </span>
                  <span className="w-24 text-right text-xs font-medium tracking-wide text-text-muted">
                    Price
                  </span>
                  <span className="w-24 text-right text-xs font-medium tracking-wide text-text-muted">
                    Total
                  </span>
                </div>
                <div className="space-y-1">
                  {convertedItems.map((item) => (
                    <CartLine
                      key={item.name}
                      name={item.name}
                      brand={item.brand}
                      image={item.image}
                      quantity={item.quantity}
                      price={item.dineroPrice}
                      currencyCode={currencyCode}
                      onIncrease={() =>
                        updateItem(item.name, (prev) => ({
                          ...prev,
                          quantity: prev.quantity + 1,
                        }))
                      }
                      onDecrease={() =>
                        updateItem(item.name, (prev) =>
                          prev.quantity > 1
                            ? { ...prev, quantity: prev.quantity - 1 }
                            : prev
                        )
                      }
                      onRemove={() => updateItem(item.name, () => null)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-text-muted">Your cart is empty.</p>
              </div>
            )}
          </div>
        </div>
        <aside className="w-full shrink-0 bg-card p-6 lg:w-96">
          <OrderSummary
            itemCount={count}
            subtotal={subtotal}
            vatAmount={vatAmount}
            vatRate={VAT_RATE}
            shippingAmount={shippingAmount}
            total={total}
            currencyCode={currencyCode}
            shipping={shipping}
            shippingOptions={convertedShippingOptions}
            hasItems={hasItems}
            onShippingChange={setShipping}
          />
        </aside>
      </div>
    </main>
  );
}
