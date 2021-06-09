import { Sitemap, Resource } from '../utils/sitemap';

export const tree = Sitemap.create();

tree.add(Resource.create({ label: 'Getting started', path: '/getting-started' }));
tree.add(Resource.create({ label: 'Quick start', path: '/getting-started/quick-start' }));
tree.add(Resource.create({ label: 'Upgrade guide', path: '/getting-started/upgrade-guide' }));
tree.add(Resource.create({ label: 'Optimizing for production', path: '/getting-started/optimizing-for-production' }));
tree.add(Resource.create({ label: 'Compatibility', path: '/getting-started/compatibility' }));

tree.add(Resource.create({ label: 'Core concepts', path: '/core-concepts' }));
tree.add(Resource.create({ label: 'Amount', path: '/core-concepts/amount' }));
tree.add(Resource.create({ label: 'Currency', path: '/core-concepts/currency' }));
tree.add(Resource.create({ label: 'Scale', path: '/core-concepts/scale' }));
tree.add(Resource.create({ label: 'Mutations', path: '/core-concepts/mutations' }));
tree.add(Resource.create({ label: 'Comparisons', path: '/core-concepts/comparisons' }));
tree.add(Resource.create({ label: 'Formatting', path: '/core-concepts/formatting' }));

tree.add(Resource.create({ label: 'Advanced', path: '/advanced' }));
tree.add(Resource.create({ label: 'Using different amount types', path: '/advanced/using-different-amount-types' }));
tree.add(Resource.create({ label: 'Transporting and restoring', path: '/advanced/transporting-and-restoring' }));
tree.add(Resource.create({ label: 'Formatting non-decimal currencies', path: '/advanced/formatting-non-decimal-currencies' }));

tree.add(Resource.create({ label: 'API Reference', path: '/api' }));
tree.add(Resource.create({ label: 'Mutations', path: '/api/mutations' }));
tree.add(Resource.create({ label: 'Add', path: '/api/mutations/add' }));
tree.add(Resource.create({ label: 'Subtract', path: '/api/mutations/subtract' }));
tree.add(Resource.create({ label: 'Multiply', path: '/api/mutations/multiply' }));
tree.add(Resource.create({ label: 'Allocate', path: '/api/mutations/allocate' }));
tree.add(Resource.create({ label: 'Conversions', path: '/api/conversions' }));
tree.add(Resource.create({ label: 'Convert', path: '/api/conversions/convert' }));
tree.add(Resource.create({ label: 'Normalize scale', path: '/api/conversions/normalize-scale' }));
tree.add(Resource.create({ label: 'Transform scale', path: '/api/conversions/transform-scale' }));
tree.add(Resource.create({ label: 'Trim scale', path: '/api/conversions/trim-scale' }));
tree.add(Resource.create({ label: 'Comparisons', path: '/api/comparisons' }));
tree.add(Resource.create({ label: 'Equal', path: '/api/comparisons/equal' }));
tree.add(Resource.create({ label: 'Greater than', path: '/api/comparisons/greater-than' }));
tree.add(Resource.create({ label: 'Greater than or equal', path: '/api/comparisons/greater-than-or-equal' }));
tree.add(Resource.create({ label: 'Less than', path: '/api/comparisons/less-than' }));
tree.add(Resource.create({ label: 'Less than or equal', path: '/api/comparisons/less-than-or-equal' }));
tree.add(Resource.create({ label: 'Minimum', path: '/api/comparisons/minimum' }));
tree.add(Resource.create({ label: 'Maximum', path: '/api/comparisons/maximum' }));
tree.add(Resource.create({ label: 'Is zero', path: '/api/comparisons/is-zero' }));
tree.add(Resource.create({ label: 'Is positive', path: '/api/comparisons/is-positive' }));
tree.add(Resource.create({ label: 'Is negative', path: '/api/comparisons/is-negative' }));
tree.add(Resource.create({ label: 'Have same amount', path: '/api/comparisons/have-same-amount' }));
tree.add(Resource.create({ label: 'Have same currency', path: '/api/comparisons/have-same-currency' }));
tree.add(Resource.create({ label: 'Has sub-units', path: '/api/comparisons/has-sub-units' }));
tree.add(Resource.create({ label: 'Formatting', path: '/api/formatting' }));
tree.add(Resource.create({ label: 'To format', path: '/api/formatting/to-format' }));
tree.add(Resource.create({ label: 'To snapshot', path: '/api/formatting/to-snapshot' }));
tree.add(Resource.create({ label: 'To unit', path: '/api/formatting/to-unit' }));
tree.add(Resource.create({ label: 'To rounded unit', path: '/api/formatting/to-rounded-unit' }));

tree.add(Resource.create({ label: 'FAQ', path: '/faq' }));
tree.add(Resource.create({ label: 'Does Dinero.js support cryptocurrencies?', path: '/faq/does-dinerojs-support-cryptocurrencies' }));
tree.add(Resource.create({ label: 'How do I calculate a percentage?', path: '/faq/how-do-i-calculate-a-percentage' }));
tree.add(Resource.create({ label: 'How can I create Dinero objects from floats?', path: '/faq/how-can-i-create-dinero-objects-from-floats' }));

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
