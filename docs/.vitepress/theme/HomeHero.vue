<script setup lang="ts">
import { withBase } from 'vitepress';
</script>

<template>
  <section class="home-hero">
    <div class="container">
      <div class="content">
        <p class="name">Dinero.js</p>
        <h1 class="heading">Create, calculate, and format money safely</h1>
        <p class="tagline">
          An immutable library for expressing monetary values in JavaScript and
          TypeScript.
        </p>
        <div class="actions">
          <a
            class="action brand"
            :href="withBase('/getting-started/quick-start')"
            >Get Started</a
          >
          <a
            class="action ghost"
            href="https://github.com/dinerojs/dinero.js"
            target="_blank"
            rel="noopener noreferrer"
            >View on GitHub</a
          >
        </div>
      </div>
      <div class="code-area">
        <div class="code-block">
          <p class="code-label">Install</p>
          <pre><code><span class="fn">npm</span> install dinero.js@alpha</code></pre>
        </div>
        <div class="code-block">
          <p class="code-label">Usage</p>
          <pre><code><span class="kw">import</span> { dinero, add, toDecimal } <span class="kw">from</span> <span class="str">'dinero.js'</span>;
<span class="kw">import</span> { USD } <span class="kw">from</span> <span class="str">'dinero.js/currencies'</span>;

<span class="kw">const</span> price = <span class="fn">dinero</span>({ amount: <span class="num">1999</span>, currency: USD });
<span class="kw">const</span> tax = <span class="fn">dinero</span>({ amount: <span class="num">160</span>, currency: USD });

<span class="kw">const</span> total = <span class="fn">add</span>(price, tax);

<span class="fn">toDecimal</span>(total); <span class="cmt">// "21.59"</span></code></pre>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  max-width: 1152px;
  margin: 0 auto;
  padding: 80px 24px 56px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

@media (min-width: 960px) {
  .home-hero {
    padding: 62px 32px 72px;
  }

  .container {
    flex-direction: row;
    align-items: center;
    gap: 72px;
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

.name {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin-bottom: 16px;
}

.heading {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: var(--vp-c-text-1);
}

@media (min-width: 640px) {
  .heading {
    font-size: 2.5rem;
  }
}

@media (min-width: 960px) {
  .heading {
    font-size: 3rem;
  }
}

.tagline {
  font-size: 1.375rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin-top: 16px;
  max-width: 480px;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
}

.action {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  border-radius: 6px;
  text-decoration: none;
  transition:
    opacity 160ms ease,
    border-color 160ms ease;
}

.action.brand {
  background-color: var(--vp-c-brand-1);
  color: #fff;
  border: 1px solid var(--vp-c-brand-1);
}

.action.brand:hover {
  opacity: 0.85;
}

.action.ghost {
  background-color: transparent;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-border);
}

.action.ghost:hover {
  border-color: var(--vp-c-text-3);
  color: var(--vp-c-text-1);
}

.code-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.code-block {
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-code-block-bg);
  overflow-x: auto;
}

.code-label {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  padding: 12px 16px 0;
  margin: 0;
}

.code-block pre {
  margin: 0;
  padding: 12px 16px 14px;
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

.code-block .num {
  color: var(--hero-code-num);
}

.code-block .fn {
  color: var(--hero-code-fn);
}

.code-block .cmt {
  color: var(--hero-code-cmt);
  font-style: italic;
}
</style>
