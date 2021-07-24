import { USD } from '@dinero.js/currencies';
import { CheckIcon } from '@heroicons/react/solid';
import cx from 'classnames';
import { dinero, allocate, subtract, multiply, isZero } from 'dinero.js';
import React, { useState } from 'react';
import ReactSlider from 'react-slider';

import { format } from './utils';

const discountRate = 10;

function App({ items }) {
  const [monthlyBilling, setMonthlyBilling] = useState(true);
  const [seats, setSeats] = useState(1);

  const tiers = items.map((item) => ({
    ...item,
    monthlyPrice: dinero({ amount: item.monthlyPrice, currency: USD }),
  }));

  return (
    <div className="relative bg-white">
      <div className="fixed top-0 left-0 right-0 w-full px-4 py-2 text-sm text-center text-white bg-blue-600 shadow-lg">
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
      <div className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
            Pricing Plans
          </h1>
          <p className="mt-5 text-xl text-gray-500 sm:text-center">
            One tool for your whole team.
          </p>
          <div className="relative self-center mt-6 bg-gray-100 rounded-lg p-0.5 flex space-x-0.5 sm:mt-8">
            <button
              type="button"
              onClick={() => setMonthlyBilling(true)}
              className={cx(
                'relative w-1/2 py-2 text-sm font-medium text-gray-900 border-gray-200 rounded-md whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 sm:w-auto sm:px-8',
                { 'bg-white shadow-sm': monthlyBilling }
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setMonthlyBilling(false)}
              className={cx(
                'relative w-1/2 py-2 text-sm font-medium text-gray-900 border-gray-200 rounded-md whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 sm:w-auto sm:px-8',
                { 'bg-white shadow-sm': !monthlyBilling }
              )}
            >
              Yearly
              <span
                className={cx(
                  'px-2 py-1 ml-2 -mr-5 text-xs text-blue-500 rounded-full',
                  {
                    'bg-blue-50': !monthlyBilling,
                    'bg-blue-100 bg-opacity-80': monthlyBilling,
                  }
                )}
              >
                -{discountRate}%
              </span>
            </button>
          </div>
          <div className="h-16 sm:px-16 lg:px-40 xl:px-24 sm:h-32">
            <ReactSlider
              className="mt-14"
              marks
              min={1}
              max={100}
              defaultValue={seats}
              onChange={(value) => setSeats(value)}
              renderThumb={(props, state) => (
                <div
                  {...props}
                  style={{ ...props.style, zIndex: 20 }}
                  className="relative flex flex-col items-center w-6 h-6 -mt-2 outline-none"
                >
                  <div className="absolute top-0 inline-block px-2 py-1 mb-2 -mt-8 text-xs text-white bg-gray-900 rounded-sm whitespace-nowrap">
                    {state.valueNow} user{state.valueNow > 1 && 's'}
                  </div>
                  <div className="w-6 h-6 bg-blue-800 border-4 border-white rounded-full shadow-lg cursor-pointer" />
                </div>
              )}
              renderTrack={(props, state) => (
                <div
                  {...props}
                  className={cx('h-2 rounded-full cursor-pointer', {
                    'bg-gray-100': state.index === 1,
                    'bg-blue-700 z-10': state.index === 0,
                  })}
                />
              )}
            />
          </div>
        </div>
        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
          {tiers.map((tier) => (
            <Tier
              key={tier.name}
              {...tier}
              monthly={monthlyBilling}
              seats={seats}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Tier({
  name,
  monthlyPrice,
  individual,
  description,
  featuresHeading,
  features,
  monthly,
  seats,
}) {
  const inactive = individual && seats > 1;

  const fullMonthlyPrice = multiply(monthlyPrice, individual ? 1 : seats);
  const fullYearlyPrice = multiply(fullMonthlyPrice, 12);
  const [yearlyDiscount] = allocate(fullYearlyPrice, [
    discountRate,
    100 - discountRate,
  ]);
  const yearlyDiscountedPrice = subtract(fullYearlyPrice, yearlyDiscount);

  const price = monthly ? fullMonthlyPrice : yearlyDiscountedPrice;

  return (
    <div
      className={cx(
        'h-full border divide-y divide-gray-200 rounded-lg shadow-sm transition duration-150',
        { 'grayscale opacity-60': inactive }
      )}
    >
      <div className="p-6">
        <h2 className="text-lg font-medium leading-6 text-gray-900">{name}</h2>
        <p className="mt-4 text-sm text-gray-500">{description}</p>
        <p className="flex mt-8 space-x-1">
          <span className="text-3xl font-extrabold text-gray-900">
            {format(price)}
          </span>{' '}
          <span className="flex flex-col text-xs justify-end font-medium text-gray-400 transform -translate-y-1.5">
            {!isZero(fullYearlyPrice) && !monthly && (
              <span className="leading-none line-through">
                {format(fullYearlyPrice)}
              </span>
            )}
            <span className="leading-none">
              per {monthly ? 'month' : 'year'}
            </span>
          </span>
        </p>
        <a
          href="#"
          className={cx(
            'block w-full py-2 mt-8 text-sm font-semibold text-center text-white bg-blue-800 border border-blue-800 transition duration-150 rounded-md hover:bg-blue-900',
            { 'cursor-not-allowed': inactive }
          )}
        >
          Buy {name}
        </a>
      </div>
      <div className="px-6 pt-6 pb-8">
        <h3 className="text-xs font-medium tracking-wide text-gray-900 uppercase">
          {featuresHeading}
        </h3>
        <ul className="mt-6 space-y-4">
          {features.map((feature) => (
            <li key={feature} className="flex space-x-3">
              <div className="p-1 bg-green-100 rounded-full">
                <CheckIcon
                  className="flex-shrink-0 w-3 h-3 text-green-500"
                  aria-hidden="true"
                />
              </div>
              <span className="text-sm text-gray-500">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
