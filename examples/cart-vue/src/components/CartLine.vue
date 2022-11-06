<template>
  <div class="flex items-center px-6 py-5 hover:bg-gray-100">
    <div class="flex w-2/5">
      <div
        class="flex items-center flex-none w-20 p-2 bg-white rounded xl:w-24"
      >
        <img
          class="object-contain h-12 mx-auto xl:h-16"
          :src="item.image"
          alt=""
        />
      </div>
      <div class="flex flex-col items-start justify-between flex-grow ml-4">
        <div>
          <h2 class="mb-1 text-sm font-bold">{{ item.name }}</h2>
          <h3 class="text-sm mb-1.5">{{ item.brand }}</h3>
        </div>
        <button
          @click="onRemove(item)"
          class="text-xs font-semibold text-left text-gray-500 transition-colors ease-in-out hover:text-red-500"
        >
          Remove
        </button>
      </div>
    </div>
    <div class="flex justify-end w-1/5">
      <button
        :class="[
          'border rounded px-1',
          canDecrease
            ? 'border-gray-200 hover:bg-gray-200'
            : 'border-gray-500 cursor-not-allowed opacity-10',
        ]"
        :disabled="!canDecrease"
        @click="onDecrease(item)"
        aria-label="Decrease amount"
      >
        <svg
          class="w-4 text-gray-600 fill-current"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 12H4"
          />
        </svg>
      </button>
      <div class="w-8 mx-2 text-center">{{ item.amount }}</div>
      <button
        class="px-1 border border-gray-200 rounded hover:bg-gray-200"
        @click="onIncrease(item)"
        aria-label="Increase amount"
      >
        <svg
          class="w-4 text-gray-600 fill-current"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
    <span class="w-1/5 text-sm font-semibold text-right">
      {{ format(item.price) }}
    </span>
    <span class="w-1/5 text-sm font-semibold text-right">
      {{ format(totalPrice) }}
    </span>
  </div>
</template>

<script>
import { multiply } from 'dinero.js';

import { format } from '../utils';

export default {
  props: {
    item: Object,
    onDecrease: Function,
    onIncrease: Function,
    onRemove: Function,
  },
  data() {
    return {
      format,
    };
  },
  computed: {
    totalPrice() {
      return multiply(this.item.price, this.item.amount);
    },
    canDecrease() {
      return this.item.amount > 1;
    },
  },
};
</script>
