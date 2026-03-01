<script setup lang="ts">
import type { Dinero } from 'dinero.js';
import { Minus, Plus, Trash2 } from 'lucide-vue-next';
import { computed } from 'vue';

import { multiply, formatMoney } from '@/lib/money';
import type { CurrencyCode } from '@/types';

const props = defineProps<{
  name: string;
  brand: string;
  image: string;
  quantity: number;
  price: Dinero<number>;
  currencyCode: CurrencyCode;
}>();

const emit = defineEmits<{
  increase: [];
  decrease: [];
  remove: [];
}>();

const totalPrice = computed(() => multiply(props.price, props.quantity));
const canDecrease = computed(() => props.quantity > 1);
</script>

<template>
  <div
    class="flex flex-col gap-3 rounded-lg px-4 py-4 transition-colors duration-150 hover:bg-muted/50 sm:flex-row sm:items-center sm:gap-4"
  >
    <div class="flex min-w-0 flex-1 items-center gap-4">
      <div
        class="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-white p-2 xl:h-20 xl:w-20"
      >
        <img
          class="h-12 w-auto object-contain xl:h-16"
          :src="image"
          alt=""
          :width="64"
          :height="64"
          loading="lazy"
        />
      </div>
      <div class="flex min-w-0 flex-col gap-1">
        <h3 class="truncate text-sm font-semibold text-foreground">
          {{ name }}
        </h3>
        <p class="text-xs text-text-muted">{{ brand }}</p>
        <button
          @click="emit('remove')"
          class="mt-1 inline-flex w-fit items-center gap-1 rounded text-xs text-text-muted transition-colors duration-150 hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring"
          :aria-label="`Remove ${name} from cart`"
        >
          <Trash2 class="h-3 w-3" aria-hidden="true" />
          Remove
        </button>
      </div>
    </div>
    <div
      class="flex items-center justify-between gap-4 pl-20 sm:justify-end sm:pl-0"
    >
      <div class="flex items-center gap-1.5">
        <button
          class="touch-manipulation rounded-md border border-border p-1 transition-colors duration-150 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-30"
          :disabled="!canDecrease"
          @click="emit('decrease')"
          :aria-label="`Decrease quantity of ${name}`"
        >
          <Minus class="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
        </button>
        <span class="w-8 text-center text-sm tabular-nums text-foreground">
          {{ quantity }}
        </span>
        <button
          class="touch-manipulation rounded-md border border-border p-1 transition-colors duration-150 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
          @click="emit('increase')"
          :aria-label="`Increase quantity of ${name}`"
        >
          <Plus class="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
        </button>
      </div>
      <span class="text-right text-sm tabular-nums text-text-secondary sm:w-24">
        {{ formatMoney(price, currencyCode) }}
      </span>
      <span
        class="text-right text-sm font-medium tabular-nums text-foreground sm:w-24"
      >
        {{ formatMoney(totalPrice, currencyCode) }}
      </span>
    </div>
  </div>
</template>
