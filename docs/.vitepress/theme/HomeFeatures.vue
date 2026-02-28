<script setup lang="ts">
const features = [
  {
    title: 'Immutable & safe',
    details:
      'All operations return new Dinero objects. Your original values are never mutated.',
  },
  {
    title: 'Precise calculations',
    details:
      'Handles money as integers in minor units to avoid floating-point precision issues.',
  },
  {
    title: 'Multi-currency',
    details:
      'Built-in ISO 4217 currencies with compile-time safety to catch mismatches.',
  },
  {
    title: 'Tree-shakeable',
    details:
      'Import only what you need. Functional API designed for optimal bundle size.',
  },
];
</script>

<template>
  <section class="home-features">
    <div class="grid">
      <div v-for="feature in features" :key="feature.title" class="card">
        <h3 class="title">{{ feature.title }}</h3>
        <p class="details">{{ feature.details }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-features {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

@media (min-width: 960px) {
  .home-features {
    padding: 0 32px 96px;
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  border-top: 1px solid var(--vp-c-border);
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 960px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.card {
  padding: 28px 24px;
}

.title {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.details {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}
</style>
