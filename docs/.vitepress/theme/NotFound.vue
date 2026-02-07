<script setup>
import { useRouter } from 'vitepress';

const router = useRouter();

function goHome() {
  router.go('/');
}
</script>

<template>
  <div class="not-found">
    <img class="mascot" src="/logo.svg" alt="Dinero.js" />
    <div class="code">404</div>
    <h1 class="title">Page not found</h1>
    <p class="message">This page doesn't exist or may have moved.</p>
    <button class="action" @click="goHome">Take me home</button>
  </div>
</template>

<style scoped>
.not-found {
  padding: 64px 24px 96px;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mascot {
  width: 180px;
  height: auto;
  margin-bottom: 32px;
  opacity: 0.4;
  filter: grayscale(50%);
}

.code {
  font-size: 4rem;
  font-weight: 700;
  color: var(--vp-c-text-3);
  line-height: 1;
  margin-bottom: 16px;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.message {
  color: var(--vp-c-text-2);
  margin-bottom: 32px;
}

.action {
  display: inline-block;
  padding: 12px 24px;
  background-color: var(--vp-c-brand-1);
  color: white;
  font-weight: 500;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: opacity 160ms ease;
}

.action:hover {
  opacity: 0.85;
}
</style>
