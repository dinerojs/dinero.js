import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import NotFound from './NotFound.vue';
import HomeHero from './HomeHero.vue';
import HomeFeatures from './HomeFeatures.vue';
import HomeReact from './HomeReact.vue';
import './style.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'not-found': () => h(NotFound),
      'home-hero-before': () => h(HomeHero),
      'home-features-before': () => h(HomeFeatures),
      'home-features-after': () => h(HomeReact),
    });
  },
} satisfies Theme;
