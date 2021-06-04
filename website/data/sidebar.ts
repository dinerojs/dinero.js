export const sidebar = {
  children: [
    {
      label: 'Getting started',
      children: [
        {
          label: 'Quick start',
          href: '/getting-started/quick-start',
        },
        {
          label: 'Upgrade guide',
          href: '/getting-started/upgrade-guide',
        },
        {
          label: 'Optimizing for production',
          href: '/getting-started/optimizing-for-production',
        },
        {
          label: 'Compatibility',
          href: '/getting-started/compatibility',
        },
      ],
    },
    {
      label: 'Core concepts',
      children: [
        {
          label: 'Amount',
          href: '/core-concepts/amount',
        },
        {
          label: 'Currency',
          href: '/core-concepts/currency',
        },
        {
          label: 'Scale',
          href: '/core-concepts/scale',
        },
        {
          label: 'Mutations',
          href: '/core-concepts/mutations',
        },
        {
          label: 'Comparisons',
          href: '/core-concepts/comparisons',
        },
        {
          label: 'Formatting',
          href: '/core-concepts/formatting',
        },
      ],
    },
    {
      label: 'Advanced',
      children: [
        {
          label: 'Using different amount types',
          href: '/advanced/using-different-amount-types',
        },
        {
          label: 'Transporting and restoring',
          href: '/advanced/transporting-and-restoring',
        },
        {
          label: 'Formatting non-decimal currencies',
          href: '/advanced/formatting-non-decimal-currencies',
        },
      ],
    },
    {
      label: 'API Reference',
      children: [
        {
          label: 'Mutations',
          children: [
            {
              label: 'Add',
              href: '/api/mutations/add',
            },
            {
              label: 'Subtract',
              href: '/api/mutations/subtract',
            },
            {
              label: 'Multiply',
              href: '/api/mutations/multiply',
            },
            {
              label: 'Allocate',
              href: '/api/mutations/allocate',
            },
          ],
        },
        {
          label: 'Conversions',
          children: [
            {
              label: 'Convert',
              href: '/api/conversions/convert',
            },
            {
              label: 'Normalize scale',
              href: '/api/conversions/normalize-scale',
            },
            {
              label: 'Transform scale',
              href: '/api/conversions/transform-scale',
            },
            {
              label: 'Trim scale',
              href: '/api/conversions/trim-scale',
            },
          ],
        },
        {
          label: 'Comparisons',
          children: [
            {
              label: 'Equal',
              href: '/api/comparisons/equal',
            },
            {
              label: 'Greater than',
              href: '/api/comparisons/greater-than',
            },
            {
              label: 'Greater than or equal',
              href: '/api/comparisons/greater-than-or-equal',
            },
            {
              label: 'Less than',
              href: '/api/comparisons/less-than',
            },
            {
              label: 'Less than or equal',
              href: '/api/comparisons/less-than-or-equal',
            },
            {
              label: 'Minimum',
              href: '/api/comparisons/minimum',
            },
            {
              label: 'Maximum',
              href: '/api/comparisons/maximum',
            },
            {
              label: 'Is zero',
              href: '/api/comparisons/is-zero',
            },
            {
              label: 'Is positive',
              href: '/api/comparisons/is-positive',
            },
            {
              label: 'Is negative',
              href: '/api/comparisons/is-negative',
            },
            {
              label: 'Have same amount',
              href: '/api/comparisons/have-same-amount',
            },
            {
              label: 'Have same currency',
              href: '/api/comparisons/have-same-currency',
            },
            {
              label: 'Has sub-units',
              href: '/api/comparisons/has-sub-units',
            },
          ],
        },
        {
          label: 'Formatting',
          children: [
            {
              label: 'To format',
              href: '/api/formatting/to-format',
            },
            {
              label: 'To snapshot',
              href: '/api/formatting/to-snapshot',
            },
            {
              label: 'To unit',
              href: '/api/formatting/to-unit',
            },
            {
              label: 'To rounded unit',
              href: '/api/formatting/to-rounded-unit',
            },
          ],
        },
      ],
    },
    {
      label: 'FAQ',
      children: [
        {
          label: 'Does Dinero.js support cryptocurrencies?',
          href: '/faq/does-dinerojs-support-cryptocurrencies',
        },
        {
          label: 'How do I calculate a percentage?',
          href: '/faq/how-do-i-calculate-a-percentage',
        },
        {
          label: 'How can I create Dinero objects from floats?',
          href: '/faq/how-can-i-create-dinero-objects-from-floats',
        },
      ]
    },
  ],
};
