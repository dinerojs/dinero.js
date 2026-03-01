---
title: Demos
description: Check out Dinero.js in action in working demos.
---

<style>
.demo-entry {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
  margin-top: 16px;
}

.demo-entry .demo-text p {
  margin: 0 0 12px;
}

.demo-entry .demo-image a {
  display: block;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-border);
  transition: border-color 160ms ease;
}

.demo-entry .demo-image a:hover {
  border-color: var(--vp-c-brand-1);
}

.demo-entry .demo-image img {
  display: block;
  width: 100%;
  margin: 0;
}

@media (max-width: 640px) {
  .demo-entry {
    grid-template-columns: 1fr;
  }
}
</style>

# Demos

If you learn better by seeing code in action, or want to start from an existing project, check out the Dinero.js demos.

## Shopping cart with React

<div class="demo-entry">
  <div class="demo-text">
    <p>A <a href="https://reactjs.org/">React</a>-powered shopping cart that calculates line totals with <code>multiply</code>, aggregates a subtotal with <code>add</code>, extracts VAT with <code>allocate</code>, and lets you switch between USD and EUR with <code>convert</code>.</p>
    <p><a href="https://dinerojs.com/examples/cart-react/">View demo</a></p>
  </div>
  <div class="demo-image">
    <a href="https://dinerojs.com/examples/cart-react/">
      <img src="/images/examples/cart-react.png" alt="Shopping cart with React">
    </a>
  </div>
</div>

## Shopping cart with Vue.js

<div class="demo-entry">
  <div class="demo-text">
    <p>The same shopping cart, built with <a href="https://vuejs.org/">Vue.js</a>. Uses computed properties to recalculate line totals, tax, and currency conversions reactively as you update quantities or switch currencies.</p>
    <p><a href="https://dinerojs.com/examples/cart-vue/">View demo</a></p>
  </div>
  <div class="demo-image">
    <a href="https://dinerojs.com/examples/cart-vue/">
      <img src="/images/examples/cart-vue.png" alt="Shopping cart with Vue.js">
    </a>
  </div>
</div>

## Pricing page with React

<div class="demo-entry">
  <div class="demo-text">
    <p>A <a href="https://reactjs.org/">React</a>-powered SaaS pricing page with per-seat pricing. Uses <code>multiply</code> for seat-based totals, <code>allocate</code> to calculate annual discounts, and <code>hasSubUnits</code> to hide unnecessary decimals.</p>
    <p><a href="https://dinerojs.com/examples/pricing-react/">View demo</a></p>
  </div>
  <div class="demo-image">
    <a href="https://dinerojs.com/examples/pricing-react/">
      <img src="/images/examples/pricing-react.png" alt="Pricing page with React">
    </a>
  </div>
</div>

## Expense splitter

<div class="demo-entry">
  <div class="demo-text">
    <p>An expense splitter. Uses <code>allocate</code> for fair bill splitting, <code>add</code> and <code>subtract</code> for balance tracking, and <code>toDecimal</code> for locale-aware formatting. Supports equal and percentage-based splits with optimal debt settlement.</p>
    <p><a href="https://dinerojs.com/examples/expense-splitter/">View demo</a></p>
  </div>
  <div class="demo-image">
    <a href="https://dinerojs.com/examples/expense-splitter/">
      <img src="/images/examples/expense-splitter.png" alt="Expense splitter">
    </a>
  </div>
</div>

## Invoice builder

<div class="demo-entry">
  <div class="demo-text">
    <p>An invoice builder with live preview. Uses <code>multiply</code> for line totals, <code>add</code> for subtotals, <code>allocate</code> for discounts and tax, and <code>toDecimal</code> for locale-aware currency formatting across multiple currencies.</p>
    <p><a href="https://dinerojs.com/examples/invoice-builder/">View demo</a></p>
  </div>
  <div class="demo-image">
    <a href="https://dinerojs.com/examples/invoice-builder/">
      <img src="/images/examples/invoice-builder.png" alt="Invoice builder">
    </a>
  </div>
</div>

## Portfolio tracker

<div class="demo-entry">
  <div class="demo-text">
    <p>A multi-currency portfolio tracker. Uses <code>multiply</code> with scaled amounts for holding values, <code>convert</code> for cross-currency aggregation, <code>add</code> for portfolio totals, and <code>toDecimal</code> for locale-aware formatting across multiple currencies.</p>
    <p><a href="https://dinerojs.com/examples/portfolio-tracker/">View demo</a></p>
  </div>
  <div class="demo-image">
    <a href="https://dinerojs.com/examples/portfolio-tracker/">
      <img src="/images/examples/portfolio-tracker.png" alt="Portfolio tracker">
    </a>
  </div>
</div>
