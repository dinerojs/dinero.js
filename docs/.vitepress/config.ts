import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Dinero.js',
  description:
    'Create, calculate, and format money in JavaScript and TypeScript.',
  lang: 'en',
  sitemap: {
    hostname: 'https://v2.dinerojs.com/',
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://UV1B3CJN3X-dsn.algolia.net',
        crossorigin: '',
      },
    ],
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Dinero.js' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Create, calculate, and format money in JavaScript and TypeScript.',
      },
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://v2.dinerojs.com/open-graph.jpg',
      },
    ],
    ['meta', { property: 'og:url', content: 'https://v2.dinerojs.com' }],
    // Twitter
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Dinero.js' }],
    [
      'meta',
      {
        name: 'twitter:description',
        content:
          'Create, calculate, and format money in JavaScript and TypeScript.',
      },
    ],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://v2.dinerojs.com/open-graph.jpg',
      },
    ],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Docs', link: '/getting-started/quick-start' },
      { text: 'API', link: '/api/mutations/add' },
      {
        text: 'v2.0.0-alpha',
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/dinerojs/dinero.js/releases',
          },
          {
            text: 'v1 docs',
            link: 'https://v1.dinerojs.com/',
          },
        ],
      },
    ],
    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Quick start', link: '/getting-started/quick-start' },
            {
              text: 'Upgrade from v1',
              link: '/getting-started/upgrade-guide',
            },
            {
              text: 'Optimizing for production',
              link: '/getting-started/optimizing-for-production',
            },
            { text: 'Compatibility', link: '/getting-started/compatibility' },
          ],
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Amount', link: '/core-concepts/amount' },
            { text: 'Currency', link: '/core-concepts/currency' },
            { text: 'Scale', link: '/core-concepts/scale' },
            { text: 'Mutations', link: '/core-concepts/mutations' },
            { text: 'Comparisons', link: '/core-concepts/comparisons' },
            { text: 'Formatting', link: '/core-concepts/formatting' },
          ],
        },
        {
          text: 'Guides',
          items: [
            {
              text: 'Different amount types',
              link: '/guides/using-different-amount-types',
            },
            {
              text: 'Serialization',
              link: '/guides/transporting-and-restoring',
            },
            {
              text: 'Database storage',
              link: '/guides/storing-in-a-database',
            },
            {
              text: 'Multilingual support',
              link: '/guides/formatting-in-a-multilingual-site',
            },
            {
              text: 'Payment services',
              link: '/guides/integrating-with-payment-services',
            },
            {
              text: 'Non-decimal currencies',
              link: '/guides/formatting-non-decimal-currencies',
            },
          ],
        },
        {
          text: 'API Reference',
          collapsed: false,
          items: [
            {
              text: 'Mutations',
              collapsed: true,
              items: [
                { text: 'add', link: '/api/mutations/add' },
                { text: 'subtract', link: '/api/mutations/subtract' },
                { text: 'multiply', link: '/api/mutations/multiply' },
                { text: 'allocate', link: '/api/mutations/allocate' },
              ],
            },
            {
              text: 'Conversions',
              collapsed: true,
              items: [
                { text: 'convert', link: '/api/conversions/convert' },
                {
                  text: 'normalizeScale',
                  link: '/api/conversions/normalize-scale',
                },
                {
                  text: 'transformScale',
                  link: '/api/conversions/transform-scale',
                },
                { text: 'trimScale', link: '/api/conversions/trim-scale' },
              ],
            },
            {
              text: 'Comparisons',
              collapsed: true,
              items: [
                { text: 'equal', link: '/api/comparisons/equal' },
                { text: 'compare', link: '/api/comparisons/compare' },
                { text: 'greaterThan', link: '/api/comparisons/greater-than' },
                {
                  text: 'greaterThanOrEqual',
                  link: '/api/comparisons/greater-than-or-equal',
                },
                { text: 'lessThan', link: '/api/comparisons/less-than' },
                {
                  text: 'lessThanOrEqual',
                  link: '/api/comparisons/less-than-or-equal',
                },
                { text: 'minimum', link: '/api/comparisons/minimum' },
                { text: 'maximum', link: '/api/comparisons/maximum' },
                { text: 'isZero', link: '/api/comparisons/is-zero' },
                { text: 'isPositive', link: '/api/comparisons/is-positive' },
                { text: 'isNegative', link: '/api/comparisons/is-negative' },
                {
                  text: 'haveSameAmount',
                  link: '/api/comparisons/have-same-amount',
                },
                {
                  text: 'haveSameCurrency',
                  link: '/api/comparisons/have-same-currency',
                },
                { text: 'hasSubUnits', link: '/api/comparisons/has-sub-units' },
              ],
            },
            {
              text: 'Formatting',
              collapsed: true,
              items: [
                { text: 'toSnapshot', link: '/api/formatting/to-snapshot' },
                { text: 'toUnits', link: '/api/formatting/to-units' },
                { text: 'toDecimal', link: '/api/formatting/to-decimal' },
              ],
            },
          ],
        },
        {
          text: 'FAQ',
          items: [
            {
              text: 'Creating from floats',
              link: '/faq/how-can-i-create-dinero-objects-from-floats',
            },
            {
              text: 'Cryptocurrency support',
              link: '/faq/does-dinerojs-support-cryptocurrencies',
            },
            {
              text: 'Calculating percentages',
              link: '/faq/how-do-i-calculate-a-percentage',
            },
          ],
        },
        {
          text: 'Resources',
          items: [
            { text: 'About', link: '/about' },
            { text: 'Sandboxes', link: '/sandboxes' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/dinerojs/dinero.js' },
    ],
    editLink: {
      pattern: 'https://github.com/dinerojs/dinero.js/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    search: {
      provider: 'algolia',
      options: {
        appId: 'UV1B3CJN3X',
        apiKey: 'fd50d842eb6683b120b6920b223d41f7',
        indexName: 'dinerojs',
        searchParameters: {
          facetFilters: ['tags:v2'],
        },
      },
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2018-present Sarah Dayan',
    },
  },
});
