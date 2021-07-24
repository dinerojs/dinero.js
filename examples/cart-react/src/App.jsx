/* eslint-disable functional/no-expression-statement */
import { EUR, USD } from '@dinero.js/currencies';
import cx from 'classnames';
import { dinero, add, allocate, multiply } from 'dinero.js';
import React, { useState } from 'react';

import { format, createConverter } from './utils';

const currencies = { EUR, USD };
const vatRate = 20;

function App({
  initialItems,
  shippingOptions,
  currencyOptions,
  defaultCurrencyCode,
  defaultShippingOption,
}) {
  const [items, setItems] = useState(initialItems);
  const [shipping, setShipping] = useState(defaultShippingOption);
  const [currencyCode, setCurrencyCode] = useState(defaultCurrencyCode);

  const hasItems = items.length !== 0;
  const defaultCurrency = currencies[defaultCurrencyCode];
  const currency = currencies[currencyCode];

  const convert = createConverter(currency);

  const zero = dinero({ amount: 0, currency });
  const convertedItems = items.map((item) => ({
    ...item,
    price: convert(
      dinero({ amount: item.price, currency: defaultCurrency }),
      currency
    ),
  }));
  const convertedShippingOptions = shippingOptions.map((option) => ({
    ...option,
    price: convert(
      dinero({ amount: option.price, currency: defaultCurrency }),
      currency
    ),
  }));
  const shippingOption = convertedShippingOptions.find(
    ({ label }) => label === shipping
  );

  const { count, subtotal } = convertedItems.reduce(
    (acc, item) => {
      return {
        count: acc.count + item.amount,
        subtotal: add(acc.subtotal, multiply(item.price, item.amount)),
      };
    },
    { count: 0, subtotal: zero }
  );
  const shippingAmount = hasItems ? shippingOption.price : zero;
  const [vatAmount] = allocate(subtotal, [vatRate, 100 - vatRate]);
  const total = [subtotal, vatAmount, shippingAmount].reduce(add);

  function setItemByName(name, newValue) {
    const index = items.findIndex((item) => item.name === name);

    if (index !== undefined) {
      const newItems = [...items];
      newItems.splice(index, 1, newValue);

      setItems(newItems.filter(Boolean));
    }
  }

  return (
    <main className="relative">
      <div className="fixed top-0 left-0 right-0 z-30 w-full px-4 py-2 text-sm text-center text-white bg-blue-600 shadow-lg">
        Built with{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://v2.dinerojs.com/"
          className="font-semibold hover:underline"
        >
          Dinero.js
        </a>{' '}
        and{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://reactjs.org/"
          className="font-semibold hover:underline"
        >
          React
        </a>
      </div>
      <div className="container flex flex-col items-center justify-center min-h-screen mx-auto">
        <div className="flex flex-col w-full my-10 overflow-hidden rounded-lg shadow-lg md:flex-row">
          <div className="w-full px-10 py-10 bg-white md:w-4/6">
            <div className="flex items-center justify-between pb-8 border-b">
              <h1 className="text-2xl font-semibold capitalize">
                Shopping cart
              </h1>
              <div className="flex items-center">
                <label
                  htmlFor="language"
                  className="mr-3 text-sm whitespace-nowrap"
                >
                  Select a currency
                </label>
                <select
                  id="currency"
                  value={currencyCode}
                  onChange={(event) => setCurrencyCode(event.target.value)}
                  className="block w-full py-1 pl-1 text-sm border-gray-300 rounded-md shadow-sm pr-7 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  {currencyOptions.map((option) => (
                    <option key={option.currency} value={option.currency}>
                      {option.currency} ({option.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {items.length > 0 && (
              <div className="-mx-6">
                <div className="flex px-6 mt-10 mb-5">
                  <span className="w-2/5 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                    Product
                  </span>
                  <span className="w-1/5 text-xs font-semibold tracking-wide text-right text-gray-500 uppercase">
                    Quantity
                  </span>
                  <span className="w-1/5 text-xs font-semibold tracking-wide text-right text-gray-500 uppercase">
                    Price
                  </span>
                  <span className="w-1/5 text-xs font-semibold tracking-wide text-right text-gray-500 uppercase">
                    Total
                  </span>
                </div>
                {convertedItems.map((item, index) => (
                  <CartLine
                    key={item.name}
                    item={item}
                    onIncrease={() => {
                      setItemByName(item.name, {
                        ...items[index],
                        amount: item.amount + 1,
                      });
                    }}
                    onDecrease={() => {
                      if (item.amount > 1) {
                        setItemByName(item.name, {
                          ...items[index],
                          amount: item.amount - 1,
                        });
                      }
                    }}
                    onRemove={() => {
                      setItemByName(item.name, null);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between w-full px-8 py-10 bg-gray-100 md:w-2/6">
            <div>
              <div className="flex items-center justify-between pb-8 border-b">
                <h1 className="text-2xl font-semibold capitalize">
                  Order summary
                </h1>
                <div className="relative mx-2">
                  <svg
                    className="w-5 text-gray-800 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="absolute top-0 right-0 -mt-1.5 -mr-2 bg-blue-200 text-blue-700 font-normal rounded-full px-1 text-xs">
                    {items.length > 0 && count}
                  </span>
                </div>
              </div>
              <div className="flex justify-between mt-10 mb-5">
                <span className="text-sm font-medium uppercase">Subtotal</span>
                <span className="text-sm font-semibold">
                  {format(subtotal)}
                </span>
              </div>
              <div className="flex justify-between mt-4 mb-5">
                <span className="text-sm font-medium uppercase">
                  VAT ({vatRate}%)
                </span>
                <span className="text-sm font-semibold">
                  {format(vatAmount)}
                </span>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="shipping"
                  className="inline-block mb-3 text-sm font-medium uppercase"
                >
                  Shipping
                </label>
                <div className={cx({ 'cursor-not-allowed': !hasItems })}>
                  <select
                    id="shipping"
                    value={shipping}
                    onChange={(event) => setShipping(event.target.value)}
                    className={cx(
                      'block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50',
                      { 'opacity-30 pointer-events-none': !hasItems }
                    )}
                  >
                    {convertedShippingOptions.map(({ label, price }) => {
                      return (
                        <option key={label} value={label}>
                          {label} — {format(price)}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t">
              <div className="flex justify-between my-5 text-sm font-medium uppercase">
                <span>Total</span>
                <span>{format(total)}</span>
              </div>
              <button className="w-full py-3 text-sm font-semibold text-white uppercase transition-colors ease-in-out bg-blue-600 rounded hover:bg-blue-700">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function CartLine({ item, onDecrease, onIncrease, onRemove }) {
  const totalPrice = multiply(item.price, item.amount);
  const canDecrease = item.amount > 1;

  return (
    <div className="flex items-center px-6 py-5 hover:bg-gray-100">
      <div className="flex w-2/5">
        <div className="flex items-center flex-none w-20 p-2 bg-white rounded xl:w-24">
          <img
            className="object-contain h-12 mx-auto xl:h-16"
            src={item.image}
            // Adjacent text already describes the image
            // so alternative text would be redundant.
            alt=""
          />
        </div>
        <div className="flex flex-col items-start justify-between flex-grow ml-4">
          <div>
            <h2 className="mb-1 text-sm font-bold">{item.name}</h2>
            <h3 className="text-sm mb-1.5">{item.brand}</h3>
          </div>
          <button
            onClick={() => onRemove(item)}
            className="text-xs font-semibold text-left text-gray-500 transition-colors ease-in-out hover:text-red-500"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="flex justify-end w-1/5">
        <button
          className={cx('border rounded px-1', {
            'border-gray-500 cursor-not-allowed opacity-10': !canDecrease,
            'border-gray-200 hover:bg-gray-200': canDecrease,
          })}
          disabled={!canDecrease}
          onClick={() => onDecrease(item)}
          aria-label="Decrease amount"
        >
          <svg
            className="w-4 text-gray-600 fill-current"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>
        <div className="w-8 mx-2 text-center">{item.amount}</div>
        <button
          className="px-1 border border-gray-200 rounded hover:bg-gray-200"
          onClick={() => onIncrease(item)}
          aria-label="Increase amount"
        >
          <svg
            className="w-4 text-gray-600 fill-current"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
      <span className="w-1/5 text-sm font-semibold text-right">
        {format(item.price)}
      </span>
      <span className="w-1/5 text-sm font-semibold text-right">
        {format(totalPrice)}
      </span>
    </div>
  );
}

export default App;
