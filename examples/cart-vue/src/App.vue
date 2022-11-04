<template>
  <main class="relative">
    <div
      class="fixed top-0 left-0 right-0 z-30 w-full px-4 py-2 text-sm text-center text-white bg-green-600 shadow-lg"
    >
      Built with
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://v2.dinerojs.com/"
        class="font-semibold hover:underline"
      >
        Dinero.js
      </a>
      and
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://vuejs.org/"
        class="font-semibold hover:underline"
      >
        Vue.js
      </a>
    </div>
    <div
      class="container flex flex-col items-center justify-center min-h-screen mx-auto"
    >
      <div
        class="flex flex-col w-full my-10 overflow-hidden rounded-lg shadow-lg md:flex-row"
      >
        <div class="w-full px-10 py-10 bg-white md:w-4/6">
          <div class="flex items-center justify-between pb-8 border-b">
            <h1 class="text-2xl font-semibold capitalize">Shopping cart</h1>
            <div class="flex items-center">
              <label htmlFor="language" class="mr-3 text-sm whitespace-nowrap">
                Select a currency
              </label>
              <select
                id="currency"
                :value="currencyCode"
                @change="(event) => (currencyCode = event.target.value)"
                class="block w-full py-1 pl-1 text-sm border-gray-300 rounded-md shadow-sm pr-7 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              >
                <option
                  v-for="option in currencyOptions"
                  :key="option.currency"
                  :value="option.currency"
                >
                  {{ option.currency }} ({{ option.symbol }})
                </option>
              </select>
            </div>
          </div>
          <div v-if="items.length > 0" class="-mx-6">
            <div class="flex px-6 mt-10 mb-5">
              <span
                className="w-2/5 text-xs font-semibold tracking-wide text-gray-500 uppercase"
              >
                Product
              </span>
              <span
                className="w-1/5 text-xs font-semibold tracking-wide text-right text-gray-500 uppercase"
              >
                Quantity
              </span>
              <span
                className="w-1/5 text-xs font-semibold tracking-wide text-right text-gray-500 uppercase"
              >
                Price
              </span>
              <span
                className="w-1/5 text-xs font-semibold tracking-wide text-right text-gray-500 uppercase"
              >
                Total
              </span>
            </div>
            <CartLine
              v-for="(item, index) in convertedItems"
              :key="item.name"
              :item="item"
              :on-increase="
                (item) => {
                  setItemByName(item.name, {
                    ...items[index],
                    amount: item.amount + 1,
                  });
                }
              "
              :on-decrease="
                (item) => {
                  if (item.amount > 1) {
                    setItemByName(item.name, {
                      ...items[index],
                      amount: item.amount - 1,
                    });
                  }
                }
              "
              :on-remove="
                (item) => {
                  setItemByName(item.name, null);
                }
              "
            />
          </div>
        </div>
        <div
          class="flex flex-col justify-between w-full px-8 py-10 bg-gray-100 md:w-2/6"
        >
          <div>
            <div class="flex items-center justify-between pb-8 border-b">
              <h1 class="text-2xl font-semibold capitalize">Order summary</h1>
              <div class="relative mx-2">
                <svg
                  class="w-5 text-gray-800 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span
                  v-if="items.length > 0"
                  class="absolute top-0 right-0 -mt-1.5 -mr-2 bg-green-200 text-green-700 font-normal rounded-full px-1 text-xs"
                >
                  {{ calculatedItems.count }}
                </span>
              </div>
            </div>
            <div class="flex justify-between mt-10 mb-5">
              <span class="text-sm font-medium uppercase"> Subtotal </span>
              <span class="text-sm font-semibold">{{
                format(calculatedItems.subtotal)
              }}</span>
            </div>
            <div class="flex justify-between mt-4 mb-5">
              <span class="text-sm font-medium uppercase">
                VAT ({{ vatRate }}%)
              </span>
              <span class="text-sm font-semibold">{{ format(vatAmount) }}</span>
            </div>
            <div class="mb-4">
              <label
                htmlFor="shipping"
                class="inline-block mb-3 text-sm font-medium uppercase"
              >
                Shipping
              </label>
              <div :class="{ 'cursor-not-allowed': !hasItems }">
                <select
                  id="shipping"
                  :value="shipping"
                  @change="(event) => (shipping = event.target.value)"
                  :class="[
                    'block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50',
                    { 'opacity-30 pointer-events-none': !hasItems },
                  ]"
                >
                  <option
                    v-for="{ label, price } in convertedShippingOptions"
                    :key="label"
                    :value="label"
                  >
                    {{ label }} — {{ format(price) }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="mt-8 border-t">
            <div
              class="flex justify-between my-5 text-sm font-medium uppercase"
            >
              <span>Total</span>
              <span>{{ format(total) }}</span>
            </div>
            <button
              class="w-full py-3 text-sm font-semibold text-white uppercase transition-colors ease-in-out bg-green-600 rounded hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { dinero, add, allocate, multiply } from 'dinero.js';
import { EUR, USD } from '@dinero.js/currencies';

import CartLine from './components/CartLine.vue';

import { format, createConverter } from './utils';

const currencies = { EUR, USD };
const vatRate = 20;

export default {
  components: {
    CartLine,
  },
  props: {
    initialItems: Array,
    currencyOptions: Array,
    shippingOptions: Array,
    defaultCurrencyCode: String,
    defaultShippingOption: String,
  },
  data() {
    return {
      currencyCode: this.defaultCurrencyCode,
      items: this.initialItems,
      shipping: this.defaultShippingOption,
      vatRate,
    };
  },
  methods: {
    format,
    setItemByName(name, newValue) {
      const index = this.items.findIndex((item) => item.name === name);

      if (index !== undefined) {
        const newItems = [...this.items];
        newItems.splice(index, 1, newValue);

        this.items = newItems.filter(Boolean);
      }
    },
  },
  computed: {
    hasItems() {
      return this.items.length !== 0;
    },
    currency() {
      return currencies[this.currencyCode];
    },
    convert() {
      return createConverter(this.currency);
    },
    convertedItems() {
      return this.items.map((item) => ({
        ...item,
        price: this.convert(
          dinero({
            amount: item.price,
            currency: currencies[this.defaultCurrencyCode],
          }),
          this.currency
        ),
      }));
    },
    convertedShippingOptions() {
      return this.shippingOptions.map((option) => ({
        ...option,
        price: this.convert(
          dinero({
            amount: option.price,
            currency: currencies[this.defaultCurrencyCode],
          }),
          this.currency
        ),
      }));
    },
    calculatedItems() {
      const zero = dinero({ amount: 0, currency: this.currency });

      return this.convertedItems.reduce(
        (acc, item) => {
          const count = acc.count + item.amount;
          const subtotal = add(acc.subtotal, multiply(item.price, item.amount));

          return { count, subtotal };
        },
        { count: 0, subtotal: zero }
      );
    },
    vatAmount() {
      const [vatAmount] = allocate(this.calculatedItems.subtotal, [
        vatRate,
        100 - vatRate,
      ]);

      return vatAmount;
    },
    total() {
      const zero = dinero({ amount: 0, currency: this.currency });
      const shippingOption = this.convertedShippingOptions.find(
        ({ label }) => label === this.shipping
      );
      const shippingAmount = this.hasItems ? shippingOption.price : zero;

      return [
        this.calculatedItems.subtotal,
        this.vatAmount,
        shippingAmount,
      ].reduce(add);
    },
  },
};
</script>
