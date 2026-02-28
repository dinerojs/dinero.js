import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Dinero.js',
  description:
    'Create, calculate, and format money in JavaScript and TypeScript.',
  lang: 'en',
  cleanUrls: true,
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
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'PSUFDDGC',
        defer: '',
      },
    ],
    [
      'script',
      {
        src: 'https://cdn.jsdelivr.net/npm/dinero.js@alpha/dist/umd/index.production.min.js',
        defer: '',
      },
    ],
    [
      'script',
      {},
      `window.addEventListener('load', function() {
  console.log('%cDinero.js is available globally!\\n\\n%cTry it out:\\n\\nconst { dinero, toDecimal, USD } = window.dinerojs;\\nconst price = dinero({ amount: 1999, currency: USD });\\ntoDecimal(price); // "19.99"', 'font-weight: bold; font-size: 14px;', '');
});`,
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
              text: 'Upgrade guide',
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
              text: 'Precision and large numbers',
              link: '/guides/precision-and-large-numbers',
            },
            {
              text: 'Currency type safety',
              link: '/guides/currency-type-safety',
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
            {
              text: 'Creating from floats',
              link: '/guides/creating-from-floats',
            },
            {
              text: 'Calculating percentages',
              link: '/guides/calculating-percentages',
            },
            {
              text: 'Cryptocurrency support',
              link: '/guides/cryptocurrencies',
            },
          ],
        },
        {
          text: 'API Reference',
          collapsed: false,
          items: [
            { text: 'dinero', link: '/api/dinero' },
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
            {
              text: 'Rounding',
              collapsed: true,
              items: [
                { text: 'down', link: '/api/rounding/down' },
                { text: 'halfUp', link: '/api/rounding/half-up' },
                { text: 'halfDown', link: '/api/rounding/half-down' },
                { text: 'halfEven', link: '/api/rounding/half-even' },
                { text: 'halfOdd', link: '/api/rounding/half-odd' },
                {
                  text: 'halfAwayFromZero',
                  link: '/api/rounding/half-away-from-zero',
                },
                {
                  text: 'halfTowardsZero',
                  link: '/api/rounding/half-towards-zero',
                },
                { text: 'up', link: '/api/rounding/up' },
              ],
            },
          ],
        },
        {
          text: 'FAQ',
          items: [
            {
              text: "Why can't I use currencies with bigint?",
              link: '/faq/why-cant-i-use-currencies-with-bigint',
            },
            {
              text: 'Why no currency symbols?',
              link: '/faq/why-no-currency-formatting',
            },
            {
              text: 'Can I multiply by a decimal?',
              link: '/faq/can-i-multiply-by-a-decimal',
            },
            {
              text: 'Why functions instead of methods?',
              link: '/faq/why-functions-instead-of-methods',
            },
            {
              text: 'How to look up a currency by code',
              link: '/faq/how-to-look-up-a-currency-by-code',
            },
          ],
        },
        {
          text: 'Resources',
          items: [
            { text: 'About', link: '/about' },
            { text: 'Demos', link: '/demos' },
            { text: 'Agent Skills', link: '/agent-skills' },
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
        askAi: {
          assistantId: 'iYbEdJJBSUWU',
          searchParameters: {
            facetFilters: ['tags:v2'],
          },
          sidePanel: {
            panel: {
              variant: 'floating',
              side: 'right',
              width: '360px',
              expandedWidth: '580px',
            },
          },
        },
      },
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2018-present Sarah Dayan',
    },
  },
});
