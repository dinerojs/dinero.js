<script setup lang="ts">
import { withBase } from 'vitepress';
</script>

<template>
  <section class="home-react">
    <div class="container">
      <div class="content">
        <p class="label">React</p>
        <h2 class="heading">Headless money inputs for React</h2>
        <p class="details">
          ATM-style currency inputs that handle formatting, keystrokes, and
          paste. Works with any form library—no adapters needed.
        </p>
        <a class="link" :href="withBase('/react/getting-started')">
          Get started with @dinerojs/react &rarr;
        </a>
      </div>
      <div class="code-area">
        <div class="code-block">
          <pre><code><span class="kw">import</span> { useCurrencyInput } <span class="kw">from</span> <span class="str">'@dinerojs/react'</span>;
<span class="kw">import</span> { USD } <span class="kw">from</span> <span class="str">'dinero.js/currencies'</span>;

<span class="kw">const</span> { inputProps } = <span class="fn">useCurrencyInput</span>({
  currency: USD,
  locale: <span class="str">'en-US'</span>,
});

<span class="kw">return</span> &lt;<span class="fn">input</span> {<span class="kw">...</span>inputProps} /&gt;;</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-react {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

@media (min-width: 960px) {
  .home-react {
    padding: 0 32px 96px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px 24px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
}

@media (min-width: 960px) {
  .container {
    flex-direction: row;
    align-items: center;
    gap: 48px;
    padding: 40px 32px;
  }

  .content {
    flex: 1;
    min-width: 0;
  }

  .code-area {
    flex: 1;
    min-width: 0;
  }
}

.label {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin-bottom: 8px;
}

.heading {
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: var(--vp-c-text-1);
}

.details {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  margin-top: 8px;
}

.link {
  display: inline-block;
  margin-top: 16px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: opacity 160ms ease;
}

.link:hover {
  opacity: 0.8;
}

.code-block {
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-code-block-bg);
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  padding: 16px;
}

.code-block code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  line-height: 1.7;
  color: var(--hero-code-text);
}

.code-block .kw {
  color: var(--hero-code-kw);
}

.code-block .str {
  color: var(--hero-code-str);
}

.code-block .fn {
  color: var(--hero-code-fn);
}
</style>
