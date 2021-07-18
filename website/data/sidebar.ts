import { Sitemap, Resource } from '../utils/sitemap';

export const tree = Sitemap.create();

tree.add(Resource.create({ label: 'What is Dinero.js?', path: '/docs' }));

tree.add(Resource.create({ label: 'Getting started', path: '/docs/getting-started' }));
tree.add(Resource.create({ label: 'Quick start', path: '/docs/getting-started/quick-start' }));
tree.add(Resource.create({ label: 'Upgrade guide', path: '/docs/getting-started/upgrade-guide' }));
tree.add(Resource.create({ label: 'Optimizing for production', path: '/docs/getting-started/optimizing-for-production' }));
tree.add(Resource.create({ label: 'Compatibility', path: '/docs/getting-started/compatibility' }));

tree.add(Resource.create({ label: 'Core concepts', path: '/docs/core-concepts' }));
tree.add(Resource.create({ label: 'Amount', path: '/docs/core-concepts/amount' }));
tree.add(Resource.create({ label: 'Currency', path: '/docs/core-concepts/currency' }));
tree.add(Resource.create({ label: 'Scale', path: '/docs/core-concepts/scale' }));
tree.add(Resource.create({ label: 'Mutations', path: '/docs/core-concepts/mutations' }));
tree.add(Resource.create({ label: 'Comparisons', path: '/docs/core-concepts/comparisons' }));
tree.add(Resource.create({ label: 'Formatting', path: '/docs/core-concepts/formatting' }));

tree.add(Resource.create({ label: 'API', path: '/docs/api' }));
tree.add(Resource.create({ label: 'Mutations', path: '/docs/api/mutations' }));
tree.add(Resource.create({ label: 'Add', path: '/docs/api/mutations/add' }));
tree.add(Resource.create({ label: 'Subtract', path: '/docs/api/mutations/subtract' }));
tree.add(Resource.create({ label: 'Multiply', path: '/docs/api/mutations/multiply' }));
tree.add(Resource.create({ label: 'Allocate', path: '/docs/api/mutations/allocate' }));
tree.add(Resource.create({ label: 'Conversions', path: '/docs/api/conversions' }));
tree.add(Resource.create({ label: 'Convert', path: '/docs/api/conversions/convert' }));
tree.add(Resource.create({ label: 'Normalize scale', path: '/docs/api/conversions/normalize-scale' }));
tree.add(Resource.create({ label: 'Transform scale', path: '/docs/api/conversions/transform-scale' }));
tree.add(Resource.create({ label: 'Trim scale', path: '/docs/api/conversions/trim-scale' }));
tree.add(Resource.create({ label: 'Comparisons', path: '/docs/api/comparisons' }));
tree.add(Resource.create({ label: 'Equal', path: '/docs/api/comparisons/equal' }));
tree.add(Resource.create({ label: 'Greater than', path: '/docs/api/comparisons/greater-than' }));
tree.add(Resource.create({ label: 'Greater than or equal', path: '/docs/api/comparisons/greater-than-or-equal' }));
tree.add(Resource.create({ label: 'Less than', path: '/docs/api/comparisons/less-than' }));
tree.add(Resource.create({ label: 'Less than or equal', path: '/docs/api/comparisons/less-than-or-equal' }));
tree.add(Resource.create({ label: 'Minimum', path: '/docs/api/comparisons/minimum' }));
tree.add(Resource.create({ label: 'Maximum', path: '/docs/api/comparisons/maximum' }));
tree.add(Resource.create({ label: 'Is zero', path: '/docs/api/comparisons/is-zero' }));
tree.add(Resource.create({ label: 'Is positive', path: '/docs/api/comparisons/is-positive' }));
tree.add(Resource.create({ label: 'Is negative', path: '/docs/api/comparisons/is-negative' }));
tree.add(Resource.create({ label: 'Have same amount', path: '/docs/api/comparisons/have-same-amount' }));
tree.add(Resource.create({ label: 'Have same currency', path: '/docs/api/comparisons/have-same-currency' }));
tree.add(Resource.create({ label: 'Has sub-units', path: '/docs/api/comparisons/has-sub-units' }));
tree.add(Resource.create({ label: 'Formatting', path: '/docs/api/formatting' }));
tree.add(Resource.create({ label: 'To format', path: '/docs/api/formatting/to-format' }));
tree.add(Resource.create({ label: 'To snapshot', path: '/docs/api/formatting/to-snapshot' }));
tree.add(Resource.create({ label: 'To unit', path: '/docs/api/formatting/to-unit' }));

tree.add(Resource.create({ label: 'Advanced', path: '/docs/advanced' }));
tree.add(Resource.create({ label: 'Using different amount types', path: '/docs/advanced/using-different-amount-types' }));
tree.add(Resource.create({ label: 'Transporting and restoring', path: '/docs/advanced/transporting-and-restoring' }));
tree.add(Resource.create({ label: 'Formatting in a multilingual site', path: '/docs/advanced/formatting-in-a-multilingual-site' }));
tree.add(Resource.create({ label: 'Integrating with payment services', path: '/docs/advanced/integrating-with-payment-services' }));
tree.add(Resource.create({ label: 'Formatting non-decimal currencies', path: '/docs/advanced/formatting-non-decimal-currencies' }));

tree.add(Resource.create({ label: 'FAQ', path: '/docs/faq' }));
tree.add(Resource.create({ label: 'Does Dinero.js support cryptocurrencies?', path: '/docs/faq/does-dinerojs-support-cryptocurrencies' }));
tree.add(Resource.create({ label: 'How do I calculate a percentage?', path: '/docs/faq/how-do-i-calculate-a-percentage' }));
tree.add(Resource.create({ label: 'How can I create Dinero objects from floats?', path: '/docs/faq/how-can-i-create-dinero-objects-from-floats' }));
