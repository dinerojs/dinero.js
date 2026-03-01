<script setup lang="ts">
import type { Dinero } from 'dinero.js';
import { ShoppingCart } from 'lucide-vue-next';

import { formatMoney } from '@/lib/money';
import type { CurrencyCode, ShippingOption } from '@/types';

defineProps<{
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
}>();

const emit = defineEmits<{
  'update:shipping': [value: string];
}>();
</script>

<template>
  <div class="flex h-full flex-col justify-between">
    <div>
      <div
        class="flex items-center justify-between border-b border-border pb-6"
      >
        <h2 class="text-lg font-semibold text-foreground">Order Summary</h2>
        <div class="relative">
          <ShoppingCart
            class="h-5 w-5 text-text-secondary"
            aria-hidden="true"
          />
          <span
            v-if="itemCount > 0"
            class="absolute -right-2 -top-1.5 rounded-full bg-primary px-1.5 text-[10px] font-medium text-primary-foreground"
          >
            {{ itemCount }}
          </span>
        </div>
      </div>
      <div class="mt-6 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm text-text-secondary">Subtotal</span>
          <span class="text-sm font-medium tabular-nums text-foreground">
            {{ formatMoney(subtotal, currencyCode) }}
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-text-secondary">
            VAT ({{ vatRate }}%)
          </span>
          <span class="text-sm font-medium tabular-nums text-foreground">
            {{ formatMoney(vatAmount, currencyCode) }}
          </span>
        </div>
        <div>
          <label for="shipping" class="mb-2 block text-sm text-text-secondary">
            Shipping
          </label>
          <div class="flex items-center justify-between gap-4">
            <select
              id="shipping"
              name="shipping"
              :value="shipping"
              @change="
                emit(
                  'update:shipping',
                  ($event.target as HTMLSelectElement).value
                )
              "
              :disabled="!hasItems"
              class="block w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-30"
            >
              <option
                v-for="option in shippingOptions"
                :key="option.label"
                :value="option.label"
              >
                {{ option.label }} —
                {{ formatMoney(option.convertedPrice, currencyCode) }}
              </option>
            </select>
            <span
              class="shrink-0 text-sm font-medium tabular-nums text-foreground"
            >
              {{ formatMoney(shippingAmount, currencyCode) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8 border-t border-border pt-6">
      <div class="mb-5 flex items-center justify-between">
        <span class="text-sm font-semibold text-foreground">Total</span>
        <span class="text-base font-semibold tabular-nums text-foreground">
          {{ formatMoney(total, currencyCode) }}
        </span>
      </div>
      <button
        type="button"
        class="w-full touch-manipulation rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        Checkout
      </button>
    </div>
  </div>
</template>
