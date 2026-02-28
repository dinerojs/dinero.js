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
    <p><a href="https://v2.dinerojs.com/examples/cart-react/">View demo</a></p>
  </div>
  <div class="demo-image">
    <a href="https://v2.dinerojs.com/examples/cart-react/">
      <img src="/images/examples/cart-react.png" alt="Shopping cart with React">
    </a>
  </div>
</div>

## Shopping cart with Vue.js

<div class="demo-entry">
  <div class="demo-text">
    <p>The same shopping cart, built with <a href="https://vuejs.org/">Vue.js</a>. Uses computed properties to recalculate line totals, tax, and currency conversions reactively as you update quantities or switch currencies.</p>
    <p><a href="https://v2.dinerojs.com/examples/cart-vue/">View demo</a></p>
  </div>
  <div class="demo-image">
    <a href="https://v2.dinerojs.com/examples/cart-vue/">
      <img src="/images/examples/cart-vue.png" alt="Shopping cart with Vue.js">
    </a>
  </div>
</div>

## Pricing page with React

<div class="demo-entry">
  <div class="demo-text">
    <p>A <a href="https://reactjs.org/">React</a>-powered SaaS pricing page with per-seat pricing. Uses <code>multiply</code> for seat-based totals, <code>allocate</code> to calculate annual discounts, and <code>hasSubUnits</code> to hide unnecessary decimals.</p>
    <p><a href="https://v2.dinerojs.com/examples/pricing-react/">View demo</a></p>
  </div>
  <div class="demo-image">
    <a href="https://v2.dinerojs.com/examples/pricing-react/">
      <img src="/images/examples/pricing-react.png" alt="Pricing page with React">
    </a>
  </div>
</div>

## Expense splitter

This demo showcases Dinero.js in action in a [React](https://reactjs.org/)-powered expense splitter. It demonstrates fair bill splitting with `allocate()`, balance tracking, and optimal debt settlement.

[View demo](https://v2.dinerojs.com/examples/expense-splitter/)
