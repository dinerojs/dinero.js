import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Node = {
  label?: string;
  href?: string;
  children?: Node[];
};

type SidebarItemProps = {
  node: Node;
  level: number;
  onClick: () => void;
  isNodeActive: (node: Node) => boolean;
  buttonProps: Pick<
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'aria-expanded' | 'aria-controls' | 'id'
  >;
};

function SidebarItem({ node, level, onClick, isNodeActive, buttonProps }: SidebarItemProps) {
  const { href, label } = node;
  const isActive = isNodeActive(node);
  const isRootLevel = level === 1;

  if (href) {
    return (
      <Link href={`/docs${href}`}>
        <a style={{ color: isActive ? 'blue' : 'inherit' }}>{label}</a>
      </Link>
    );
  }

  if (isRootLevel) {
    return (
      <button onClick={onClick} {...buttonProps}>
        {label}
      </button>
    );
  }

  return (
    <span>
      {label}
    </span>
  );
}

type SidebarNodeWrapper = {
  children: React.ReactNode;
  node: Node;
};

function SidebarNodeWrapper({ children, node }: SidebarNodeWrapper) {
  if (node.label) {
    return <li>{children}</li>;
  }

  return <>{children}</>;
}

type SidebarNodeProps = {
  node: Node;
  level: number;
  isNodeActive: (node: Node) => boolean;
};

function SidebarNode({ node, level, isNodeActive }: SidebarNodeProps) {
  const isFirstLevel = level === 1;
  const [isOpen, setIsOpen] = useState(!isFirstLevel || hasActiveChild(node));

  const id = node.label?.toLowerCase();
  const parentId = node.label ? `heading-${id}` : undefined;
  const childId = node.label ? `navigation-${id}` : undefined;

  function hasActiveChild(node: Node) {
    if (!node.children) {
      return false;
    }

    const hasActiveChildRecursively = node.children.some((node) => isNodeActive(node) || hasActiveChild(node));

    return hasActiveChildRecursively;
  }

  return (
    <SidebarNodeWrapper node={node}>
      <>
        {node.label && (
          <SidebarItem
            onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
            node={node}
            level={level}
            isNodeActive={isNodeActive}
            buttonProps={{
              'aria-controls': childId,
              id: parentId,
              'aria-expanded': isOpen,
            }}
          />
        )}
        {node.children?.length && (
          <ul
            role="region"
            id={childId}
            aria-labelledby={parentId}
            style={{ display: isOpen ? 'block' : 'none', marginLeft: isFirstLevel ? '10px': 0 }}
          >
            {node.children.map((child, index) => (
              <SidebarNode key={index} node={child} level={level + 1} isNodeActive={isNodeActive} />
            ))}
          </ul>
        )}
      </>
    </SidebarNodeWrapper>
  );
}

type BaseProps = {
  children: React.ReactNode;
};

const sidebar = {
  children: [
    {
      label: 'Getting started',
      children: [
        {
          label: 'What is Dinero.js?',
          href: '/getting-started/what-is-dinero-js',
        },
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
      href: '/faq',
    },
  ],
};

export function Base({ children }: BaseProps) {
  const { asPath } = useRouter();
  const [, setIsSidebarOpen] = useState(false);

  function isNodeActive({ href }: Node) {
    const [path] = asPath.split('#');

    return href === path;
  }

  return (
    <div>
      <header>
        <div>
          <Link href="/">Dinero.js</Link>
          <div>
            <select>
              <option value="v2">
                v2.0.0
              </option>
              <option value="v1">
                v1.8.1
              </option>
            </select>
          </div>
        </div>
      </header>
      <main>
        <div>
          <nav>
            <div>
              <div>
                <SidebarNode node={sidebar} level={0} isNodeActive={isNodeActive} />
              </div>
            </div>
            <div>
              <a
                href="https://github.com/dinerojs/dinero.js"
                target="_blank"
                rel="noreferrer noopener"
              >
                <span>GitHub</span>
              </a>
            </div>
          </nav>
          {/* The <div> element captures `click` and `keyup` events to simulate clicks outside the sidebar on small screens */}
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            onClick={() => setIsSidebarOpen(false)}
            onKeyUp={() => setIsSidebarOpen(false)}
          >
            {children}
          </div>
        </div>
      </main>
      <button
        onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
      >
        <span>Menu</span>
      </button>
    </div>
  );
}
