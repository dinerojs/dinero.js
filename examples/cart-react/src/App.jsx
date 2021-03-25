import React, { useState } from 'react';
import cx from 'classnames';
import { add, multiply } from 'dinero.js';

import { dineroUSD, format } from './utils';

const shippingOptions = {
  standard: {
    label: 'Standard',
    price: dineroUSD(1000),
  },
  tracked: {
    label: 'Tracked',
    price: dineroUSD(1500),
  },
  expedite: {
    label: 'Expedite',
    price: dineroUSD(2000),
  },
};

const freeShippingMonthlyPrice = dineroUSD(999);
const freeShippingAnnualPrice = multiply(freeShippingMonthlyPrice, 12);

function App({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [shipping, setShipping] = useState('standard');
  const [freeShipping, setFreeShipping] = useState(false);

  const { count, subtotal } = items.reduce(
    ({ count, subtotal }, { amount, price }) => ({
      count: count + amount,
      subtotal: add(subtotal, multiply(price, amount)),
    }),
    { count: 0, subtotal: dineroUSD(0) }
  );
  const shippingAmount = freeShipping
    ? freeShippingAnnualPrice
    : shippingOptions[shipping].price;
  const total = add(subtotal, shippingAmount);

  function setItemByName(name, newValue) {
    const index = items.findIndex((item) => item.name === name);

    if (index !== undefined) {
      const newItems = [...items];
      newItems.splice(index, 1, newValue);

      setItems(newItems.filter(Boolean));
    }
  }

  return (
    <div className="container flex items-center min-h-screen mx-auto">
      <div className="flex flex-col w-full my-10 overflow-hidden rounded-lg shadow-lg md:flex-row">
        <div className="w-full px-10 py-10 bg-white md:w-4/6">
          <div className="flex items-center justify-between pb-8 border-b">
            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
            <div className="relative">
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
              <span className="absolute top-0 right-0 -mt-1.5 -mr-2 bg-blue-200 text-blue-500 font-medium rounded-full px-1 text-xs">
                {items.length > 0 && count}
              </span>
            </div>
          </div>
          {items.length > 0 && (
            <>
              <div className="flex mt-10 mb-5">
                <h3 className="w-2/5 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Product
                </h3>
                <h3 className="w-1/5 text-xs font-semibold tracking-wide text-center text-gray-400 uppercase">
                  Quantity
                </h3>
                <h3 className="w-1/5 text-xs font-semibold tracking-wide text-center text-gray-400 uppercase">
                  Price
                </h3>
                <h3 className="w-1/5 text-xs font-semibold tracking-wide text-center text-gray-400 uppercase">
                  Total
                </h3>
              </div>
              {items.map((item) => (
                <CartLine
                  key={item.name}
                  item={item}
                  onIncrease={(item) => {
                    setItemByName(item.name, {
                      ...item,
                      amount: item.amount + 1,
                    });
                  }}
                  onDecrease={(item) => {
                    if (item.amount > 1) {
                      setItemByName(item.name, {
                        ...item,
                        amount: item.amount - 1,
                      });
                    }
                  }}
                  onRemove={(item) => {
                    setItemByName(item.name, null);
                  }}
                />
              ))}
            </>
          )}
        </div>
        <div className="flex flex-col justify-between w-full px-8 py-10 bg-gray-100 md:w-2/6">
          <div>
            <h1 className="pb-8 text-2xl font-semibold border-b">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="text-sm font-semibold uppercase">Subtotal</span>
              <span className="text-sm font-semibold">{format(subtotal)}</span>
            </div>
            <div className="mb-4">
              <label className="inline-block mb-3 text-sm font-medium uppercase">
                Shipping
              </label>
              <div className={cx({ 'cursor-not-allowed': freeShipping || items.length === 0 })}>
                <select
                  value={shipping}
                  onChange={(event) => setShipping(event.target.value)}
                  className={cx(
                    'block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50',
                    { 'opacity-30 pointer-events-none': freeShipping || items.length === 0 }
                  )}
                >
                  {Object.keys(shippingOptions).map((key) => {
                    const { label, price } = shippingOptions[key];

                    return (
                      <option key={key} value={key}>
                        {label} — {format(price)}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div>
              <label className="inline-flex items-center text-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="text-blue-600 border-gray-300 rounded shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  checked={freeShipping}
                  onChange={() => setFreeShipping((isChecked) => !isChecked)}
                />
                <span className="ml-2">
                  Free shipping — {format(freeShippingMonthlyPrice)}/month (billed annually)
                </span>
              </label>
            </div>
          </div>
          <div className="mt-8 border-t">
            <div className="flex justify-between py-6 text-sm font-semibold uppercase">
              <span>Total</span>
              <span>{format(total)}</span>
            </div>
            <button className="w-full py-3 text-sm font-semibold text-white uppercase transition-colors ease-in-out bg-blue-500 rounded hover:bg-blue-600">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartLine({ item, onDecrease, onIncrease, onRemove }) {
  const totalPrice = multiply(item.price, item.amount);

  return (
    <div className="flex items-center px-6 py-5 -mx-10 hover:bg-gray-100">
      <div className="flex w-2/5">
        <div className="flex items-center flex-none w-20 p-2 bg-white rounded xl:w-24">
          <img
            className="object-contain h-12 mx-auto xl:h-16"
            src={item.image}
            alt={item.name}
          />
        </div>
        <div className="flex flex-col items-start justify-between flex-grow ml-4">
          <div>
            <h4 className="mb-1 text-sm font-bold">{item.name}</h4>
            <h5 className="text-sm mb-1.5">{item.brand}</h5>
          </div>
          <button
            onClick={() => onRemove(item)}
            className="text-xs font-semibold text-left text-gray-500 transition-colors ease-in-out hover:text-red-500"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <button
          className={cx({ 'opacity-10 cursor-not-allowed': item.amount === 1 })}
          disabled={item.amount === 1}
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
        <button onClick={() => onIncrease(item)} aria-label="Increase amount">
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
      <span className="w-1/5 text-sm font-semibold text-center">
        {format(item.price)}
      </span>
      <span className="w-1/5 text-sm font-semibold text-center">
        {format(totalPrice)}
      </span>
    </div>
  );
}

export default App;
